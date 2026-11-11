// Per-language "kit": how to speak, listen and convert scripts for each language.
// Everything the learner sees stays in English letters; native script is only used here, behind the scenes.

import { getState } from './progress';
import { KNOWN_WORDS as PA_KNOWN, gurmukhiToDevanagari, hasGurmukhi, romanToGurmukhi, toRoman } from './script';
import { bengaliToDeva, devaToBengali, friendlyFrom, hasBengali, hasDevanagari, romanToNative, romanizeIndic, type IndicLang } from './indic';
import { mrWords } from '../languages/marathi/words';
import { bnWords } from '../languages/bengali/words';

export interface LangKit {
  id: string;
  /** Google Translate / TTS language code */
  code: string;
  /** Speech recognition language */
  bcp47: string;
  /** Romanized -> native script (for voices and the translator) */
  toNative(roman: string): string;
  /** Native script (or Devanagari from a Hindi recognizer) -> romanized */
  romanize(s: string): string;
  hasNative(s: string): boolean;
  /** Native script -> Devanagari, so a Hindi voice can read it when no voice for the language is installed */
  toDeva(native: string): string;
}

// English words people mix into everyday speech. Spelled once (Gurmukhi list in script.ts) and converted.
const LOANS = `busy free college dinner tv phone call plan order online sorry wait late office market burger cold drink spicy pay
haircut makeover look restaurant assignment complete food tension meeting boss class exam time please thanks thank you okay ok
bye hello hi party movie mobile message chat bus train ticket station airport hotel room hospital doctor medicine gym job salary
weekend sure actually really already lunch breakfast coffee juice shopping mall shirt size discount bill cash card upi auto cab
traffic jam signal left right wifi password battery charge charger photo video status birthday cake gift friend best nice cool
super full enjoy miss fit smart tired bore boring fever ac fan light switch start done change problem delivery address location
share send reply week month minute second`
  .split(/\s+/)
  .filter(Boolean);
const loansDeva: Record<string, string> = Object.fromEntries(LOANS.filter((w) => PA_KNOWN[w]).map((w) => [w, gurmukhiToDevanagari(PA_KNOWN[w])]));
const loansBn: Record<string, string> = Object.fromEntries(Object.entries(loansDeva).map(([w, d]) => [w, devaToBengali(d)]));

function indicKit(id: string, lang: IndicLang, words: Record<string, string>, loans: Record<string, string>, toDeva: (s: string) => string): LangKit {
  const known = { ...loans, ...words };
  const friendly = friendlyFrom(known, lang);
  return {
    id,
    code: lang,
    bcp47: `${lang}-IN`,
    toNative: (r) => romanToNative(r, lang, known),
    romanize: (s) => (hasDevanagari(s) || hasBengali(s) ? romanizeIndic(s, lang, friendly) : s),
    hasNative: lang === 'bn' ? hasBengali : hasDevanagari,
    toDeva,
  };
}

const kits: Record<string, LangKit> = {
  pa: {
    id: 'pa',
    code: 'pa',
    bcp47: 'pa-IN',
    toNative: romanToGurmukhi,
    romanize: toRoman,
    hasNative: hasGurmukhi,
    toDeva: gurmukhiToDevanagari,
  },
  mr: indicKit('mr', 'mr', mrWords, loansDeva, (s) => s),
  bn: indicKit('bn', 'bn', bnWords, loansBn, bengaliToDeva),
};

export const kitFor = (id: string): LangKit => kits[id] ?? kits.pa;
export const kit = (): LangKit => kitFor(getState().language);

/** Recognition language: the course language unless the user picked Hindi or English in settings. */
export function recognitionLang(): string {
  const v = getState().settings.recognitionLang;
  return v === 'hi-IN' || v === 'en-IN' ? v : kit().bcp47;
}
