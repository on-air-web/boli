export interface HbRow {
  en: string;
  hi: string;
  pa: string;
  note?: string;
}
export interface HbTable {
  title?: string;
  rows: HbRow[];
}
export interface DialogueLine {
  who: 'A' | 'B';
  pa: string;
  en: string;
  hi?: string;
  /** Other acceptable Punjabi answers when you say this line in speaking practice */
  accept?: string[];
}
export interface Dialogue {
  id: string;
  title: string;
  emoji: string;
  setting: string;
  lines: DialogueLine[];
}
export interface HbSection {
  id: string;
  title: string;
  emoji: string;
  intro?: string;
  tables?: HbTable[];
  notes?: { title: string; body: string }[];
  dialogues?: Dialogue[];
  practice?: { en: string; pa: string }[];
}

/** Compact table rows: "English | Hindi | Punjabi | optional note" */
export function rows(src: string): HbRow[] {
  return src
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [en, hi, pa, note] = l.split('|').map((x) => x.trim());
      return { en, hi, pa, ...(note ? { note } : {}) };
    });
}
