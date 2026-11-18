import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { createProfileSnapshot } from './linkedin-profile.mjs';

if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const token = process.env.APIFY_TOKEN;
const argument = process.argv[2];
const scrape = argument === '--scrape';
const actorId = 'yZnhB5JewWf9xSmoM';
if (!token || (!scrape && !/^[a-zA-Z0-9]{17}$/.test(argument ?? ''))) {
  console.error('Configura APIFY_TOKEN. Usa npm run profiles:refresh para extraer o npm run profiles:sync -- ID_DE_EJECUCION para importar.');
  process.exit(1);
}

async function request(path, options = {}) {
  const response = await fetch(`https://api.apify.com/v2${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(45000),
  });
  if (!response.ok) throw new Error(`Apify respondió HTTP ${response.status}.`);
  return response.json();
}

try {
  const members = JSON.parse(await readFile(new URL('./linkedin-members.json', import.meta.url), 'utf8'));
  let run;
  if (scrape) {
    ({ data: run } = await request(`/acts/${actorId}/runs?waitForFinish=30&timeout=240&maxTotalChargeUsd=0.10`, {
      method: 'POST',
      body: JSON.stringify({ urls: Object.values(members).map(url => ({ url })), findContacts: false, scrapeCompany: false }),
    }));
    console.log(`Extracción iniciada: ${run.id}`);
    const deadline = Date.now() + 300000;
    while (['READY', 'RUNNING', 'TIMING-OUT', 'ABORTING'].includes(run.status) && Date.now() < deadline) {
      await delay(1000);
      ({ data: run } = await request(`/actor-runs/${run.id}?waitForFinish=30`));
    }
  } else {
    ({ data: run } = await request(`/actor-runs/${argument}`));
  }
  if (run.actId !== actorId || run.status !== 'SUCCEEDED') {
    throw new Error(`La extracción no terminó correctamente (${run.status}) o pertenece a otro actor.`);
  }
  const rows = await request(`/datasets/${run.defaultDatasetId}/items?clean=true&format=json`);
  const snapshot = createProfileSnapshot(rows, members, run.finishedAt);
  await writeFile(new URL('../src/features/creditos/linkedin-profiles.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Actualizados ${Object.keys(snapshot.profiles).length} perfiles desde la ejecución ${run.id}.`);
} catch (error) {
  console.error(String(error.message).replaceAll(token, '[redacted]'));
  process.exitCode = 1;
}
