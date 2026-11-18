import assert from 'node:assert/strict';
import test from 'node:test';
import { createProfileSnapshot, normalizeProfile } from './linkedin-profile.mjs';

const url = 'https://www.linkedin.com/in/test-member/';
const asOf = new Date('2026-11-18T12:00:00Z');

test('takes the newest active role from grouped positions even when jobTitle is blank', () => {
  const profile = normalizeProfile({ inputUrl: url, jobTitle: '', positions: [{
    company: { name: 'Example' }, positions: [
      { title: 'Backend Developer', timePeriod: { startDate: { year: 2025, month: 11 }, endDate: null } },
      { title: 'GenAI', timePeriod: { startDate: { year: 2026, month: 5 }, endDate: null } },
    ],
  }] }, url, asOf);
  assert.equal(profile.title, 'GenAI');
  assert.equal(profile.company, 'Example');
});

test('does not present a past or future job as current employment', () => {
  const profile = normalizeProfile({ inputUrl: url, jobTitle: 'Old role', companyName: 'Old company',
    headline: '3D Artist', positions: [
      { title: 'Old role', company: { name: 'Old company' }, timePeriod: { startDate: { year: 2024 }, endDate: { year: 2024, month: 4 } } },
      { title: 'Future role', company: { name: 'Next company' }, timePeriod: { startDate: { year: 2027 }, endDate: null } },
    ],
  }, url, asOf);
  assert.equal(profile.headline, '3D Artist');
  assert.equal(profile.title, undefined);
  assert.equal(profile.company, undefined);
});

test('uses the professional headline when there is no dated work experience', () => {
  const profile = normalizeProfile({ inputUrl: url, headline: '3D Artist', jobTitle: 'Unverified job', companyName: 'Unverified company', positions: [] }, url, asOf);
  assert.equal(profile.headline, '3D Artist');
  assert.equal(profile.title, undefined);
});

test('prefers an active position over a more recent ended position and generic headline', () => {
  const profile = normalizeProfile({ inputUrl: url, headline: 'Software Developer', positions: [
    { title: 'Former consultant', company: { name: 'Old company' }, timePeriod: { startDate: { year: 2026 }, endDate: { year: 2026, month: 10 } } },
    { title: 'Engineer', company: { name: 'Current company' }, timePeriod: { startDate: { year: 2025 }, endDate: null } },
  ] }, url, asOf);
  assert.equal(profile.title, 'Engineer');
  assert.equal(profile.company, 'Current company');
});

test('rejects missing professional information, errors, and results for another person', () => {
  assert.equal(normalizeProfile({ inputUrl: url, positions: [], headline: '' }, url, asOf), null);
  assert.equal(normalizeProfile({ inputUrl: url, error: 'unavailable', headline: 'Developer' }, url, asOf), null);
  assert.equal(normalizeProfile({ inputUrl: 'https://www.linkedin.com/in/someone-else/', headline: 'Developer' }, url, asOf), null);
});

test('does not replace the published snapshot with partial or failed results', () => {
  const members = { one: url, two: 'https://www.linkedin.com/in/second-member/' };
  const rows = [{ inputUrl: url, headline: 'Engineer' }];
  assert.throws(() => createProfileSnapshot(rows, members, asOf.toISOString()), /two/);
  assert.throws(() => createProfileSnapshot([...rows, { inputUrl: members.two, status: 'error' }], members, asOf.toISOString()), /two/);
});

test('omits a card with no professional information and keeps only display fields', () => {
  const members = { one: url, two: 'https://www.linkedin.com/in/second-member/' };
  const snapshot = createProfileSnapshot([
    { inputUrl: url, headline: 'Engineer', email: 'private@example.com', birthDate: 'private', skills: ['Java'] },
    { inputUrl: members.two, positions: [], headline: '' },
  ], members, asOf.toISOString());
  assert.deepEqual(snapshot.profiles, { one: { url, headline: 'Engineer' } });
});
