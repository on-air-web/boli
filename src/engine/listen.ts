// Speech recognition (the browser's built-in, free) + forgiving pronunciation scoring.
// Recognition returns Gurmukhi (pa-IN), Devanagari (hi-IN) or Latin (en-IN). We turn everything into
// romanized text and compare sounds, not spelling, so "kiwen"/"kiven" or English loanwords still match.

import { kit, recognitionLang } from './lang';
import { levenshtein } from './text';
import { actions } from './progress';
import { stopSpeaking } from './speech';

type SR = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

const Ctor: (new () => SR) | undefined =
  typeof window !== 'undefined' ? ((window as unknown as Record<string, unknown>).SpeechRecognition ?? (window as unknown as Record<string, unknown>).webkitSpeechRecognition) as (new () => SR) | undefined : undefined;

export const recognitionSupported = () => !!Ctor;

export interface Heard {
  alternatives: string[]; // romanized
  raw: string[];
}

let active: SR | null = null;

/** Listen once. Resolves with what was heard (romanized). */
export function listenOnce(onInterim?: (text: string) => void, langOverride?: string): Promise<Heard> {
  return new Promise((resolve, reject) => {
    if (!Ctor) return reject(new Error('unsupported'));
    active?.abort();
    // iPhone: audio that just played (the phrase read aloud) leaves Safari in "playback only" mode, so the next
    // recognition hears silence. Stop any speech and switch the audio session to recording while we listen.
    stopSpeaking();
    setAudioSession('play-and-record');
    const r = new Ctor();
    active = r;
    r.lang = langOverride ?? recognitionLang();
    const toRoman = kit().romanize;
    r.interimResults = true;
    r.maxAlternatives = 5;
    r.continuous = false;
    let finalAlts: string[] = [];
    let lastInterim = '';
    r.onresult = (e) => {
      const res = e.results[e.results.length - 1];
      const alts = Array.from({ length: res.length }, (_, i) => res[i].transcript);
      if (res.isFinal) finalAlts = alts;
      else {
        lastInterim = alts[0] ?? '';
        onInterim?.(toRoman(lastInterim));
      }
    };
    let retried = false;
    r.onerror = (e) => {
      active = null;
      setAudioSession('auto');
      retried = true;
      if (e.error === 'no-speech' || e.error === 'aborted') resolve({ alternatives: [], raw: [] });
      // Device can't do this language? Hindi recognition hears Punjabi/Marathi/Bengali sounds well enough.
      // iPhone reports an unsupported language as "service-not-allowed" (not "language-not-supported"),
      // even when the microphone is allowed, so treat both the same and remember Hindi for next time.
      else if ((e.error === 'language-not-supported' || e.error === 'service-not-allowed') && r.lang !== 'hi-IN') {
        actions.updateSettings({ recognitionLang: 'hi-IN' });
        listenOnce(onInterim, 'hi-IN').then(resolve, reject);
      }
      else reject(new Error(e.error));
    };
    r.onend = () => {
      active = null;
      setAudioSession('auto');
      if (retried) return;
      const raw = finalAlts.length ? finalAlts : lastInterim ? [lastInterim] : [];
      resolve({ raw, alternatives: raw.map(toRoman) });
    };
    try {
      r.start();
    } catch (err) {
      reject(err as Error);
    }
  });
}

/** Safari 16.4+ (iPhone) lets a page choose its audio session; other browsers ignore this. */
function setAudioSession(type: 'play-and-record' | 'auto') {
  const session = (navigator as unknown as { audioSession?: { type: string } }).audioSession;
  if (!session) return;
  try {
    session.type = type;
  } catch {
    /* not supported */
  }
}

export function stopListening() {
  active?.stop();
}

// ---------------- scoring ----------------

/** Collapse a romanized word to how it sounds. */
export function soundKey(w: string, lang = 'pa'): string {
  let k = w
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]/g, '');
  k = k
    .replace(/chh/g, 'c')
    .replace(/ch/g, 'c')
    .replace(/sh/g, 's')
    .replace(/ph/g, 'f')
    .replace(/([kgjtdpb])h/g, '$1')
    .replace(/w/g, 'v')
    .replace(/z/g, 'j')
    .replace(/q/g, 'k')
    .replace(/x/g, 'ks')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/ee|ii|ea/g, 'i')
    .replace(/oo|ou/g, 'u')
    .replace(/aa/g, 'a')
    .replace(/ai|ay|ey/g, 'e')
    .replace(/au|aw/g, 'o')
    .replace(/y/g, 'i')
    .replace(/(.)\1+/g, '$1')
    .replace(/([aeiou])n$/g, '$1') // final nasal
    .replace(/h/g, ''); // h is mostly tone in Punjabi and often dropped
  // Bengali: v and b are one sound, and the inherent vowel wobbles between "o" and "a" (kemon / keman).
  if (lang === 'bn') k = k.replace(/v/g, 'b').replace(/o/g, 'a');
  return k;
}

const sim = (a: string, b: string) => (a === b ? 1 : 1 - levenshtein(a, b) / Math.max(a.length, b.length, 1));

export interface WordResult {
  word: string; // target word as written
  ok: boolean;
  close: boolean;
}
export interface Score {
  score: number; // 0..100
  words: WordResult[];
  heard: string;
  target: string;
}

const words = (s: string) => s.replace(/[?!.,;:…"()]/g, ' ').split(/\s+/).filter(Boolean);

/** Align target words with heard words (like a diff) and score. */
function scoreOne(target: string, heard: string): Score {
  const tw = words(target);
  const hw = words(heard);
  const k = kit();
  const key = (w: string) => soundKey(w, k.id);
  const tk = tw.map(key);
  // Second spelling of each target word, the way the recognizer would write it (college -> kaalaj).
  const tk2 = tw.map((w) => key(k.romanize(k.toNative(w))));
  const simT = (k: number, h: string) => Math.max(sim(tk[k], h), sim(tk2[k], h));
  const hk = hw.map(key);
  const n = tk.length;
  const m = hk.length;
  // dp[i][j] = best total similarity aligning first i target words with first j heard words
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const back = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++) {
      // also try matching one target word to two heard words joined (speech engines split words)
      const s1 = simT(i - 1, hk[j - 1]);
      const s2 = j > 1 ? simT(i - 1, hk[j - 2] + hk[j - 1]) : 0;
      const opts = [dp[i - 1][j - 1] + s1, dp[i - 1][j], dp[i][j - 1], j > 1 ? dp[i - 1][j - 2] + s2 : -1];
      const best = Math.max(...opts);
      dp[i][j] = best;
      back[i][j] = opts.indexOf(best);
    }
  const perWord = Array(n).fill(0);
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    const b = back[i][j];
    if (b === 0) {
      perWord[i - 1] = simT(i - 1, hk[j - 1]);
      i--;
      j--;
    } else if (b === 3) {
      perWord[i - 1] = simT(i - 1, hk[j - 2] + hk[j - 1]);
      i--;
      j -= 2;
    } else if (b === 1) i--;
    else j--;
  }
  // Also compare the whole thing without spaces (handles words merged differently).
  const whole = Math.max(sim(tk.join(''), hk.join('')), sim(tk2.join(''), hk.join('')));
  const wordsOut = tw.map((w, k) => ({ word: w, ok: perWord[k] >= 0.67, close: perWord[k] >= 0.45 && perWord[k] < 0.67 }));
  const wordScore = perWord.reduce((a, b) => a + Math.min(1, b / 0.8), 0) / Math.max(1, n);
  const extraPenalty = Math.max(0, m - n * 1.5) * 0.05;
  const score = Math.max(0, Math.min(100, Math.round((0.7 * wordScore + 0.3 * whole - extraPenalty) * 100)));
  return { score, words: wordsOut, heard, target };
}

/** Score what was heard against one or more accepted answers; best match wins. */
export function scoreSpeech(accepted: string[], heard: string[]): Score {
  let best: Score = { score: 0, words: words(accepted[0]).map((w) => ({ word: w, ok: false, close: false })), heard: heard[0] ?? '', target: accepted[0] };
  for (const t of accepted) for (const h of heard.length ? heard : ['']) {
    const s = scoreOne(t, h);
    if (s.score > best.score) best = s;
  }
  return best;
}

export const PASS = 70;
