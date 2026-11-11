import type { Course, Phrase } from '../languages/types';
import { allPhrases } from './exercises';
import { handbookPhrases } from './handbookItems';
import { normalize, looseKey, levenshtein } from './text';
import { hasGurmukhi, romanToGurmukhi, toRoman } from './script';

export type Direction = 'en-pa' | 'pa-en';

export interface Translation {
  source: 'lessons' | 'online';
  text: string; // English or romanized Punjabi
  script?: string; // Gurmukhi if Punjabi
  phrase?: Phrase;
}

/** Look for matches in the course itself. Works offline and is the most reliable. */
export function searchLessons(query: string, dir: Direction, course: Course): Phrase[] {
  const q = normalize(query);
  if (!q) return [];
  const qLoose = looseKey(query);
  const seen = new Set<string>();
  const pool = [...allPhrases(course), ...handbookPhrases(course)].filter((p) => !seen.has(p.text) && seen.add(p.text));
  const scored = pool.map((p) => {
    const fields = dir === 'en-pa' ? [p.en, ...(p.enAlt ?? [])].map(normalize) : [p.text, ...(p.alt ?? [])].map(looseKey);
    const target = dir === 'en-pa' ? q : qLoose;
    let score = Infinity;
    for (const f of fields) {
      if (f === target) score = Math.min(score, 0);
      else if (f.includes(target) || target.includes(f)) score = Math.min(score, 1 + Math.abs(f.length - target.length) / 10);
      else {
        const d = levenshtein(f, target);
        if (d <= Math.max(2, target.length / 5)) score = Math.min(score, 2 + d);
      }
    }
    if (dir === 'pa-en' && p.script && hasGurmukhi(query) && p.script.replace(/[?!.,]/g, '').trim() === query.replace(/[?!.,]/g, '').trim()) score = 0;
    return { p, score };
  });
  return scored.filter((s) => s.score < Infinity).sort((a, b) => a.score - b.score).slice(0, 3).map((s) => s.p);
}

/** Online translation through Google Translate's public endpoint. Needs internet. */
export async function translateOnline(query: string, dir: Direction): Promise<Translation | null> {
  const [sl, tl] = dir === 'en-pa' ? ['en', 'pa'] : ['pa', 'en'];
  // Romanized Punjabi is converted to Gurmukhi first: the translator understands that far better.
  const q = dir === 'pa-en' && !hasGurmukhi(query) ? romanToGurmukhi(query) : query;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translation service returned ${res.status}`);
  const data = await res.json();
  const out = (data?.[0] ?? []).map((seg: unknown[]) => seg?.[0] ?? '').join('').trim();
  if (!out) return null;
  if (dir === 'en-pa') return { source: 'online', text: toRoman(out), script: out };
  return { source: 'online', text: out };
}
