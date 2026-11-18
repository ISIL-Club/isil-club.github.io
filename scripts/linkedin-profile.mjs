const englishTitles = {
  'Programador full stack': 'Full Stack Developer',
  'Practicante en Desarrollo de Software': 'Software Development Intern',
  'Personal de producción': 'Production Staff',
};
const englishHeadlines = {
  'Modelador 3D | Game Delevopment | Trainne': '3D Modeler | Game Development | Trainee',
  'Analista de TI en Universidad Politécnica del Perú': 'IT Analyst at Universidad Politécnica del Perú',
};

export function profileHandle(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['linkedin.com', 'www.linkedin.com'].includes(url.hostname)) return null;
    return url.pathname.match(/^\/in\/([^/]+)\/?$/)?.[1].toLowerCase() ?? null;
  } catch { return null; }
}

export function normalizeProfile(row, url, asOf = new Date()) {
  if (!profileHandle(url) || profileHandle(row.inputUrl) !== profileHandle(url) || row.error || ['error', 'not_found'].includes(row.status)) return null;
  const asOfMonth = asOf.getUTCFullYear() * 12 + asOf.getUTCMonth();
  const positions = (row.positions ?? []).flatMap(group => (group.positions ?? [group]).map(position => ({
    title: position.title?.trim(),
    company: (position.company?.name ?? group.company?.name)?.trim(),
    period: position.timePeriod ?? group.timePeriod,
  })));
  const eligible = positions.filter(position => {
    const start = position.period?.startDate;
    return position.title && position.company && start?.year
      && start.year * 12 + (start.month ?? 1) - 1 <= asOfMonth;
  }).sort((a, b) => {
    const first = a.period.startDate;
    const second = b.period.startDate;
    return (second.year * 12 + (second.month ?? 1)) - (first.year * 12 + (first.month ?? 1));
  });
  const current = eligible.find(position => position.period.endDate === null);
  // The provider's jobTitle can refer to an ended job; use dated active positions instead.
  if (current) return {
    url, title: current.title, company: current.company,
    ...(englishTitles[current.title] ? { displayTitle: englishTitles[current.title] } : {}),
  };
  const headline = row.headline?.trim();
  if (!headline) return null;
  return { url, headline, ...(englishHeadlines[headline] ? { displayHeadline: englishHeadlines[headline] } : {}) };
}

export function createProfileSnapshot(rows, members, fetchedAt) {
  const asOf = new Date(fetchedAt);
  if (!Array.isArray(rows) || !Number.isFinite(asOf.getTime())) throw new Error('Los resultados de Apify no son válidos.');
  const profiles = {};
  for (const [key, url] of Object.entries(members)) {
    if (!profileHandle(url)) throw new Error(`El enlace de ${key} no es válido.`);
    const row = rows.find(item => profileHandle(item.inputUrl) === profileHandle(url));
    if (!row || row.error || ['error', 'not_found'].includes(row.status)) {
      throw new Error(`No se pudo actualizar ${key}; se conservan los perfiles publicados.`);
    }
    const profile = normalizeProfile(row, url, asOf);
    if (profile) profiles[key] = profile;
  }
  if (!Object.keys(profiles).length) throw new Error('No hay información profesional válida para importar.');
  return { source: 'apify/supreme_coder/linkedin-profile-scraper', fetchedAt, profiles };
}
