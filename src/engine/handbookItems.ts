import type { Course, Phrase } from '../languages/types';
import type { HbRow } from '../languages/handbook-types';

/** "Tu kiven ain? / Ki haal aa?" -> ["Tu kiven ain?", "Ki haal aa?"] */
export const variants = (pa: string) => pa.split(' / ').map((x) => x.trim()).filter(Boolean);

/** Turn a handbook row into a phrase so it can be searched, heard and practised. */
export function rowToPhrase(r: HbRow, id: string): Phrase {
  const [first, ...rest] = variants(r.pa);
  return { id, text: first, en: r.en, alt: rest, hi: r.hi };
}

/** All usable handbook rows (skips fill-in-the-blank patterns). */
export function handbookPhrases(course: Course, sectionIds?: string[]): Phrase[] {
  const out: Phrase[] = [];
  for (const s of course.handbook ?? []) {
    if (sectionIds && !sectionIds.includes(s.id)) continue;
    s.tables?.forEach((t, ti) =>
      t.rows.forEach((r, ri) => {
        if (!r.pa.includes('...')) out.push(rowToPhrase(r, `hb-${s.id}-${ti}-${ri}`));
      })
    );
    s.practice?.forEach((p, i) => out.push({ id: `hb-${s.id}-p${i}`, text: p.pa, en: p.en }));
  }
  return out;
}

/** Sentence-like items are best for speaking drills. */
export const isSentence = (p: Phrase) => p.text.trim().split(/\s+/).length >= 2;
