// Shared course format. Every language (Punjabi, Marathi, ...) is just data in this shape.

export interface Phrase {
  id: string;
  /** Target-language text in romanized form, e.g. "Ki haal hai?" */
  text: string;
  /** Natural English meaning */
  en: string;
  /** Other acceptable romanized spellings for typing exercises */
  alt?: string[];
  /** Other acceptable English meanings */
  enAlt?: string[];
  /** Word-by-word breakdown: [word, meaning] */
  words?: [string, string][];
  /** Short usage tip shown when the phrase is introduced */
  note?: string;
  /** The same sentence in Hindi (romanized), for learners who know Hindi */
  hi?: string;
  /** Words that differ from Hindi: [this language, Hindi] */
  hiWords?: [string, string][];
  /** Native script (optional, for later versions) */
  script?: string;
}

export interface Lesson {
  id: string;
  title: string;
  phrases: Phrase[];
}

export interface Unit {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lessons: Lesson[];
}

import type { Dialogue, HbSection } from './handbook-types';

export interface Course {
  languageId: string;
  languageName: string;
  /** Name of the language in itself, romanized */
  nativeName: string;
  flag: string;
  available: boolean;
  /** Short cheers shown after a right answer, in the language (romanized) */
  praise?: string[];
  /** Played by "Test voice" in settings */
  voiceSample?: { text: string; script?: string };
  /** Placeholder example for the translator */
  translateExample?: string;
  tips?: string[];
  /** Hindi → this language sound patterns, shown when the trigger word is first taught */
  hiPatterns?: { when: string; text: string }[];
  units: Unit[];
  handbook?: HbSection[];
  dialogues?: Dialogue[];
}
