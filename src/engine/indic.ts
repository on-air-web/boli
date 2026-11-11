// Script helpers for Marathi (Devanagari) and Bengali (Bengali script).
// Native script is NEVER shown to the learner. It is only used behind the scenes:
//  - to feed text-to-speech voices (they read native script far better than English letters)
//  - to romanize what the speech recognizer heard, so it can be compared with the lesson text
//  - to send romanized input to the online translator
//
// Bengali and Devanagari Unicode blocks line up (Bengali = Devanagari + 0x80), so we work in
// Devanagari and shift at the end. Gurmukhi (Punjabi) has its own helpers in script.ts.

export type IndicLang = 'mr' | 'bn';

const HAL = '्';

// ---------------------------------------------------------------- roman -> native

const R_CONS: [string, string][] = [
  ['chchh', 'च्छ'], ['cch', 'च्छ'], ['chh', 'छ'], ['kh', 'ख'], ['gh', 'घ'], ['ch', 'च'], ['jh', 'झ'], ['th', 'थ'], ['dh', 'ध'], ['ph', 'फ'], ['bh', 'भ'], ['sh', 'श'],
  ['k', 'क'], ['g', 'ग'], ['j', 'ज'], ['t', 'त'], ['d', 'द'], ['n', 'न'], ['p', 'प'], ['b', 'ब'], ['m', 'म'], ['y', 'य'],
  ['r', 'र'], ['l', 'ल'], ['v', 'व'], ['w', 'व'], ['s', 'स'], ['h', 'ह'], ['z', 'झ'], ['f', 'फ'], ['q', 'क'], ['c', 'क'], ['x', 'क्स'],
];
// [roman, independent letter, matra]
const R_VOW: [string, string, string][] = [
  ['aa', 'आ', 'ा'], ['ai', 'ऐ', 'ै'], ['au', 'औ', 'ौ'], ['ee', 'ई', 'ी'], ['ii', 'ई', 'ी'], ['oo', 'ऊ', 'ू'], ['ou', 'ऊ', 'ू'],
  ['a', 'अ', ''], ['i', 'इ', 'ि'], ['u', 'उ', 'ु'], ['e', 'ए', 'े'], ['o', 'ओ', 'ो'],
];
// Consonants that join the one before them as a cluster (kya, pyaar, aamhi, kra).
const GLIDES = new Set(['y', 'r', 'v', 'w', 'h']);

function romanWord(w: string, lang: IndicLang): string {
  let out = '';
  let i = 0;
  let prev: 'start' | 'cons' | 'vowel' = 'start';
  let syllable = 0; // vowels seen so far
  while (i < w.length) {
    const rest = w.slice(i + 1);
    // n before a consonant: Marathi writes an anusvara (sangto -> संगतो); Bengali a conjunct (bondhu -> बन्धु).
    if (w[i] === 'n' && prev === 'vowel' && rest && !/^[aeiouyhn]/.test(rest) && lang === 'mr') {
      out += 'ं';
      i++;
      continue;
    }
    const v = R_VOW.find(([r]) => w.startsWith(r, i));
    if (v) {
      const [r, ind, matra] = v;
      let m = matra;
      let indep = ind;
      const atEnd = i + r.length === w.length;
      if (lang === 'mr') {
        // a word-final short "a" after a consonant is usually long in Marathi (mala, kasa, majha)
        if (r === 'a' && prev === 'cons' && atEnd) m = 'ा';
        if (r === 'i' && prev === 'cons' && atEnd) m = 'ी';
        if (r === 'u' && prev === 'cons' && atEnd) m = 'ू';
      } else {
        // Bengali has no short/long a: "a" is always আ. Its inherent vowel sounds like "o",
        // so a medial "o" before a consonant is usually just the inherent vowel (kemon -> কেমন).
        if (r === 'a') [m, indep] = ['ा', 'आ'];
        // "ai" / "au" are two sounds in Bengali (jai = যাই, bou = বউ), not one long vowel.
        if (r === 'ai') [m, indep] = ['ाइ', 'आइ'];
        if (r === 'au') [m, indep] = ['ाउ', 'आउ'];
        if (r === 'o' && prev === 'cons' && !atEnd && syllable > 0 && /^[^aeiou]/.test(w.slice(i + 1))) m = '';
      }
      out += prev === 'cons' ? m : indep;
      prev = 'vowel';
      syllable++;
      i += r.length;
      continue;
    }
    const c = R_CONS.find(([r]) => w.startsWith(r, i));
    if (c) {
      const [r, g0] = c;
      let g = g0;
      if (lang === 'bn') {
        if (r === 'z') g = 'ज';
        else if (r === 'v') g = 'भ';
        else if (r === 'w') g = 'ब';
        else if (r === 'y' && prev === 'vowel') g = 'य़'; // after a consonant it is the ya-phala (byapar = ব্যাপার)
      }
      const doubled = w.startsWith(r, i + r.length);
      const finalCluster = !/[aeiou]/.test(w.slice(i + r.length)); // mast, dost, fakt
      if (prev === 'cons' && (GLIDES.has(r) || lang === 'bn' || finalCluster)) out += HAL;
      if (doubled) {
        out += g + HAL + g;
        i += r.length * 2;
      } else {
        out += g;
        i += r.length;
      }
      prev = 'cons';
      continue;
    }
    out += w[i];
    prev = 'start';
    i++;
  }
  return out;
}

/** Devanagari -> Bengali script (blocks line up by 0x80). */
export function devaToBengali(s: string): string {
  return [...s.normalize('NFD')]
    .map((c) => {
      const n = c.charCodeAt(0);
      if (c === 'व') return 'ব';
      if (c === 'ळ') return 'ল';
      if (c === 'ॉ') return 'ো';
      if (c === 'ऑ') return 'অ';
      if (c === 'ॅ') return 'ে';
      if (n >= 0x0900 && n <= 0x097f) return String.fromCharCode(n + 0x80);
      return c;
    })
    .join('')
    .normalize('NFC');
}

/** Bengali script -> Devanagari. */
export function bengaliToDeva(s: string): string {
  // NFC, not NFD: Bengali ো / ৌ would otherwise split into two vowel signs.
  return [...s.normalize('NFC')]
    .map((c) => {
      const n = c.charCodeAt(0);
      if (c === 'ৎ') return 'त्';
      if (c === 'ৰ') return 'र';
      if (c === 'ৱ') return 'व';
      if (n >= 0x0980 && n <= 0x09ff) return String.fromCharCode(n - 0x80);
      return c;
    })
    .join('');
}

/** Romanized Marathi / Bengali -> native script, using a word list first and spelling rules for the rest. */
export function romanToNative(s: string, lang: IndicLang, known: Record<string, string>): string {
  return s
    .toLowerCase()
    .split(/(\s+|[?!.,;:'"()/…-]+)/)
    .map((p) => {
      if (!/^[a-z]+$/.test(p)) return p.replace(/\./g, '।');
      const k = known[p];
      if (k) return k;
      const d = romanWord(p, lang);
      return lang === 'bn' ? devaToBengali(d) : d;
    })
    .join('')
    .replace(/।(?=\S)/g, '। ')
    .replace(/\s+$/, '');
}

export const hasDevanagari = (s: string) => /[ऀ-ॿ]/.test(s);
export const hasBengali = (s: string) => /[ঀ-৿]/.test(s);

// ---------------------------------------------------------------- native -> roman

const CONS: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ng', च: 'ch', छ: 'chh', ज: 'j', झ: 'jh', ञ: 'n',
  ट: 't', ठ: 'th', ड: 'd', ढ: 'dh', ण: 'n', त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm', य: 'y', र: 'r', ल: 'l', ळ: 'l', व: 'v',
  श: 'sh', ष: 'sh', स: 's', ह: 'h',
};
const NUKTA_MAP: Record<string, string> = { k: 'k', kh: 'kh', g: 'g', j: 'z', ph: 'f', d: 'r', dh: 'rh', y: 'Y' };
const VOWELS: Record<string, string> = { अ: 'a', आ: 'aa', इ: 'i', ई: 'ee', उ: 'u', ऊ: 'oo', ऋ: 'ri', ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au', ऑ: 'o', ऍ: 'e' };
const MATRA: Record<string, string> = { 'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॉ': 'o', 'ॅ': 'e' };
const LABIAL = new Set(['m', 'p', 'b', 'bh', 'ph']);

interface Syl { c: string; v: string; inherent: boolean; nasal: boolean }

function romanizeDevaWord(w: string, lang: IndicLang): string {
  const syls: Syl[] = [];
  // Split nukta letters (ज़ -> ज + ़) but keep vowel signs whole.
  for (const ch of w.normalize('NFC').replace(/[\u0958-\u095F]/g, (c) => c.normalize('NFD'))) {
    const last = syls[syls.length - 1];
    if (CONS[ch] !== undefined) syls.push({ c: CONS[ch], v: 'a', inherent: true, nasal: false });
    else if (ch === '़' && last) last.c = NUKTA_MAP[last.c] ?? last.c;
    else if (VOWELS[ch]) syls.push({ c: '', v: VOWELS[ch], inherent: false, nasal: false });
    else if (MATRA[ch] && last) Object.assign(last, { v: MATRA[ch], inherent: false });
    else if (ch === HAL && last) Object.assign(last, { v: '', inherent: false });
    else if ((ch === 'ं' || ch === 'ँ') && last) last.nasal = true;
    else if (ch === 'ः' && last) last.v += 'h';
    else if (/[०-९]/.test(ch)) syls.push({ c: String(ch.charCodeAt(0) - 0x966), v: '', inherent: false, nasal: false });
    else syls.push({ c: ch, v: '', inherent: false, nasal: false });
  }
  // Schwa deletion: final inherent vowel is silent; a middle one is silent between two pronounced vowels.
  const n = syls.length;
  // (Not when it carries a nasal: Marathi तुमचं = tumcha(n).)
  if (n > 1 && syls[n - 1].inherent && !syls[n - 1].nasal) syls[n - 1].v = '';
  for (let i = 1; i < n - 1; i++) {
    const s = syls[i];
    if (s.inherent && s.c && syls[i - 1].v && syls[i + 1].v && syls[i + 1].c) s.v = '';
  }
  let out = '';
  syls.forEach((s, i) => {
    let v = s.v;
    const isLast = i === n - 1;
    const next = syls[i + 1];
    if (lang === 'bn') {
      // Bengali: inherent vowel sounds "o"; no long/short difference worth spelling.
      if (s.inherent && v === 'a') v = 'o';
      v = v.replace('aa', 'a').replace('ee', 'i').replace('oo', 'u');
    } else {
      if ((v === 'ee' || v === 'i') && next && !next.c) v = 'iy';
      else if (isLast && v === 'ee') v = 'i';
      else if (isLast && v === 'oo') v = 'u';
      else if (isLast && v === 'aa' && (s.c || i > 0) && !s.nasal) v = 'a';
    }
    // Marathi colloquial final anusvara (झालं, माझं, सगळं) is just a nasal "a": write zala, maza, sagla.
    const softEnd = lang === 'mr' && isLast && s.nasal && /^(a|aa)$/.test(v);
    if (softEnd) v = 'a';
    let nasal = '';
    if (s.nasal && !softEnd) {
      if (lang === 'bn') nasal = next ? 'n' : 'ng';
      else if (isLast && /^(i|u|ee|oo|e)$/.test(s.v)) nasal = '';
      else if (next && LABIAL.has(next.c)) nasal = 'm';
      else nasal = 'n';
    }
    let c = s.c;
    // Bengali য is a "j" sound (jabo, jodi) except right after another consonant (byapar); য় is "y".
    if (lang === 'bn' && c === 'y' && (i === 0 || syls[i - 1].v)) c = 'j';
    if (c === 'Y') c = 'y';
    if (lang === 'mr' && c === 'jh') c = 'z'; // Marathi झ sounds "z": zala, maza
    if (lang === 'bn' && c === 'v') c = 'b'; // Bengali has no v sound
    out += c + v + nasal;
  });
  return out;
}

/** Native script (Devanagari or Bengali) -> everyday romanized text. */
export function romanizeIndic(s: string, lang: IndicLang, friendly?: (w: string) => string): string {
  if (hasBengali(s)) s = bengaliToDeva(s);
  const parts = s.split(/(\s+|[?!.,।॥"'()]+)/);
  const r = parts
    .map((p) => (/[\u0900-\u0963\u0966-\u097F]/.test(p) ? romanizeDevaWord(p, lang) : p.replace(/[।॥]/g, '.')))
    .map((p) => (friendly && /^[a-z]+$/i.test(p) ? friendly(p) : p))
    .join('')
    .replace(/\s+\./g, '.');
  return r.charAt(0).toUpperCase() + r.slice(1);
}

/** Build a reverse lookup (romanized-from-script -> our usual spelling) from a known-word list. */
export function friendlyFrom(known: Record<string, string>, lang: IndicLang): (w: string) => string {
  let rev: Map<string, string> | null = null;
  return (word: string) => {
    if (!rev) {
      rev = new Map();
      for (const [roman, native] of Object.entries(known)) {
        const r = romanizeIndic(native, lang).toLowerCase();
        if (!rev.has(r)) rev.set(r, roman);
      }
    }
    const hit = rev.get(word.toLowerCase());
    if (!hit) return word;
    return word[0] === word[0].toUpperCase() ? hit.charAt(0).toUpperCase() + hit.slice(1) : hit;
  };
}
