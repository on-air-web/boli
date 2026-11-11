/** Normalize romanized text so spelling variations still count as correct. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Looser key for romanized Punjabi: ignores doubled letters, w/v, ee/i, oo/u, h after consonants at end etc. */
export function looseKey(s: string): string {
  return normalize(s)
    .replace(/w/g, 'v')
    .replace(/z/g, 'j')
    .replace(/ph/g, 'f')
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/(.)\1+/g, '$1')
    .replace(/([aeiou])n\b/g, '$1') // nasal endings: tusin/tusi, nahin/nahi
    .replace(/\s/g, '');
}

export function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

export type Verdict = 'correct' | 'typo' | 'wrong';

/** Compare a typed answer against all accepted answers. */
export function checkTyped(input: string, accepted: string[], loose = true): Verdict {
  const key = loose ? looseKey : (x: string) => normalize(x).replace(/\s/g, '');
  const k = key(input);
  if (!k) return 'wrong';
  let best = Infinity;
  for (const a of accepted) {
    const ak = key(a);
    if (ak === k) return 'correct';
    best = Math.min(best, levenshtein(ak, k));
  }
  const allowance = Math.max(1, Math.floor(k.length / 8));
  return best <= allowance ? 'typo' : 'wrong';
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Split a sentence into word tiles, keeping punctuation off the tiles. */
export function tiles(s: string): string[] {
  return s.replace(/[?!.,]/g, '').split(/\s+/).filter(Boolean);
}
