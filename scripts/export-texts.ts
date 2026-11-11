// Collects every line the app can speak, in every available language, and writes scripts/texts.json:
// [{ key, text, lang }]. `text` is native script (Gurmukhi / Devanagari / Bengali); it is never shown in the app.
// Run: npm run audio:texts
import { writeFileSync } from 'node:fs';
import { courses } from '../src/languages';
import { handbookPhrases } from '../src/engine/handbookItems';
import { allPhrases } from '../src/engine/exercises';
import { kitFor } from '../src/engine/lang';
import { audioKey } from '../src/engine/audioKey';
import { SETTINGS_TEST_PHRASE } from '../src/engine/speech';

const out = new Map<string, { text: string; lang: string }>();
for (const c of courses.filter((c) => c.available)) {
  const k = kitFor(c.languageId);
  const add = (script: string | undefined, roman: string) => {
    const g = script ?? k.toNative(roman);
    out.set(audioKey(g), { text: g, lang: c.languageId });
  };
  for (const p of allPhrases(c)) add(p.script, p.text);
  for (const p of handbookPhrases(c)) add(p.script, p.text);
  for (const d of c.dialogues ?? []) for (const l of d.lines) add(undefined, l.pa);
  if (c.voiceSample) add(c.voiceSample.script, c.voiceSample.text);
  if (c.languageId === 'pa') add(undefined, SETTINGS_TEST_PHRASE);
}
const list = [...out].map(([key, v]) => ({ key, ...v }));
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify(list, null, 1));
const by = list.reduce<Record<string, number>>((a, x) => ((a[x.lang] = (a[x.lang] ?? 0) + 1), a), {});
console.log(`${list.length} lines`, by);
