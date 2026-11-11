import type { Course, Lesson, Phrase } from '../languages/types';
import { normalize, sample, shuffle, tiles } from './text';

export type Exercise =
  | { kind: 'intro'; phrase: Phrase }
  | { kind: 'choose-en'; phrase: Phrase; options: string[] } // see Punjabi, pick English
  | { kind: 'choose-pa'; phrase: Phrase; options: string[] } // see English, pick Punjabi
  | { kind: 'listen'; phrase: Phrase; options: string[] } // hear Punjabi, pick English
  | { kind: 'build'; phrase: Phrase; bank: string[] } // build the Punjabi sentence from tiles
  | { kind: 'type-pa'; phrase: Phrase } // type the Punjabi
  | { kind: 'type-en'; phrase: Phrase } // type the English
  | { kind: 'hindi'; phrase: Phrase; options: string[] } // see the Hindi sentence, pick the Punjabi
  | { kind: 'speak'; phrase: Phrase } // say it out loud
  | { kind: 'match'; pairs: Phrase[] };

export function allPhrases(course: Course): Phrase[] {
  return course.units.flatMap((u) => u.lessons.flatMap((l) => l.phrases));
}

function distractors(target: Phrase, pool: Phrase[], n: number): Phrase[] {
  // Skip phrases whose meaning overlaps the target's (e.g. two ways to say "How are you?").
  const meanings = (p: Phrase) => new Set([p.en, ...(p.enAlt ?? [])].map((m) => normalize(m.replace(/\(.*?\)/g, ''))));
  const tm = meanings(target);
  const others = pool.filter((p) => p.id !== target.id && p.text !== target.text && ![...meanings(p)].some((m) => tm.has(m)));
  return sample(others, n);
}

function choiceExercise(kind: 'choose-en' | 'choose-pa' | 'listen' | 'hindi', phrase: Phrase, pool: Phrase[]): Exercise {
  const d = distractors(phrase, pool, 3);
  const field = kind === 'choose-pa' || kind === 'hindi' ? 'text' : 'en';
  return { kind, phrase, options: shuffle([phrase, ...d].map((p) => p[field])) };
}

function buildExercise(phrase: Phrase, pool: Phrase[]): Exercise {
  const words = tiles(phrase.text);
  const lower = new Set(words.map((w) => w.toLowerCase()));
  const extra = shuffle(pool.flatMap((p) => tiles(p.text))).filter((w) => !lower.has(w.toLowerCase()));
  const uniqueExtra = [...new Map(extra.map((w) => [w.toLowerCase(), w])).values()].slice(0, Math.max(2, 6 - words.length));
  return { kind: 'build', phrase, bank: shuffle([...words, ...uniqueExtra]) };
}

/** A lesson: introduce each new phrase, then mix of exercises that get harder. */
export function buildLesson(lesson: Lesson, course: Course, opts: { canListen: boolean; canSpeak?: boolean }): Exercise[] {
  const pool = allPhrases(course);
  const ps = lesson.phrases;
  const out: Exercise[] = [];

  // Introduce phrases two at a time, each followed by a quick check.
  for (let i = 0; i < ps.length; i += 2) {
    const chunk = ps.slice(i, i + 2);
    for (const p of chunk) out.push({ kind: 'intro', phrase: p });
    for (const p of shuffle(chunk)) out.push(choiceExercise('choose-en', p, pool));
  }
  out.push({ kind: 'match', pairs: ps.slice(0, 4) });

  const later: Exercise[] = [];
  for (const p of ps) {
    later.push(choiceExercise('choose-pa', p, pool));
    later.push(tiles(p.text).length > 1 ? buildExercise(p, pool) : { kind: 'type-pa', phrase: p });
  }
  if (opts.canListen) for (const p of sample(ps, 2)) later.push(choiceExercise('listen', p, pool));
  for (const p of sample(ps, 2)) later.push({ kind: 'type-pa', phrase: p });
  later.push({ kind: 'type-en', phrase: ps[Math.floor(Math.random() * ps.length)] });
  if (opts.canSpeak) for (const p of sample(ps, 2)) later.push({ kind: 'speak', phrase: p });
  // One Hindi-bridge question per lesson at most, and only on about two lessons out of three.
  const withHindi = ps.filter((p) => p.hiWords?.length);
  if (withHindi.length && Math.random() < 0.67) later.push(choiceExercise('hindi', sample(withHindi, 1)[0], pool));

  return [...out, ...shuffle(later)];
}

/** Review session drawn from phrases you've already met, weakest first. */
export function buildReview(phrases: Phrase[], course: Course, weakness: (p: Phrase) => number, opts: { canListen: boolean; canSpeak?: boolean }): Exercise[] {
  const pool = allPhrases(course);
  const picked = [...phrases].sort((a, b) => weakness(b) - weakness(a) + (Math.random() - 0.5)).slice(0, 8);
  const ex: Exercise[] = [];
  for (const p of picked) {
    type K = 'choose-pa' | 'build' | 'type-pa' | 'type-en' | 'choose-en' | 'listen';
    const kinds: K[] = ['choose-pa', 'build', 'type-pa', 'type-en', 'choose-en', ...(opts.canListen ? (['listen'] as K[]) : [])];
    const k = kinds[Math.floor(Math.random() * kinds.length)];
    if (k === 'build') ex.push(tiles(p.text).length > 1 ? buildExercise(p, pool) : { kind: 'type-pa', phrase: p });
    else if (k === 'type-pa' || k === 'type-en') ex.push({ kind: k, phrase: p });
    else ex.push(choiceExercise(k, p, pool));
  }
  if (opts.canSpeak) for (const p of sample(picked, 2)) ex.push({ kind: 'speak', phrase: p });
  const withHindi = picked.filter((p) => p.hiWords?.length);
  if (withHindi.length && Math.random() < 0.5) ex.splice(2, 0, choiceExercise('hindi', sample(withHindi, 1)[0], pool));
  if (picked.length >= 4) ex.splice(4, 0, { kind: 'match', pairs: sample(picked, 4) });
  return ex;
}
