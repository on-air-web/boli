import type { Course, Phrase } from '../languages/types';
import { allPhrases } from './exercises';
import { normalize } from './text';

// Hindi <-> target-language comparisons. Each word pair is taught once, on the first phrase where it
// appears, and the wording rotates so the comparisons don't feel repetitive.

export type HindiNote =
  | { kind: 'pairs'; pairs: [string, string][]; lead: string; hi: string; pattern?: string }
  | { kind: 'same'; hi: string; line: string };

const LEADS = [
  'Hindi ➜ Punjabi',
  'If you know Hindi, just swap:',
  'Where Hindi says one thing, Punjabi says another:',
  'Your Hindi helps here:',
  'Spot the difference from Hindi:',
];
const SAME = ['Exactly the same in Hindi!', 'Good news: Hindi says this the same way.', 'No change from Hindi here.'];

const cache = new Map<string, Map<string, [string, string][]>>();

/** For each phrase, the word pairs that appear in it for the first time in the course. */
function firstPairs(course: Course) {
  let m = cache.get(course.languageId);
  if (m) return m;
  m = new Map();
  const seen = new Set<string>();
  for (const p of allPhrases(course)) {
    const fresh = (p.hiWords ?? []).filter(([pa]) => !seen.has(pa.toLowerCase()));
    fresh.forEach(([pa]) => seen.add(pa.toLowerCase()));
    m.set(p.id, fresh);
  }
  cache.set(course.languageId, m);
  return m;
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export function hindiNote(p: Phrase, course: Course): HindiNote | null {
  if (!p.hi) return null;
  const pairs = firstPairs(course).get(p.id) ?? [];
  const h = hash(p.id);
  if (pairs.length) {
    const pattern = course.hiPatterns?.find((pt) => pairs.some(([pa]) => pa.toLowerCase() === pt.when))?.text;
    return { kind: 'pairs', pairs, lead: LEADS[h % LEADS.length], hi: p.hi, pattern };
  }
  // Mention "same as Hindi" only now and then, so it stays a nice surprise.
  if (normalize(p.hi) === normalize(p.text) && h % 2 === 0) return { kind: 'same', hi: p.hi, line: SAME[h % SAME.length] };
  return null;
}

/** All unique Hindi/target word pairs in the course, for the cheat sheet. */
export function allPairs(course: Course): [string, string][] {
  return [...firstPairs(course).values()].flat();
}
