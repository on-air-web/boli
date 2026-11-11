// Collects every Punjabi line the app can speak and writes scripts/texts.json: [{ key, text }].
// Run: npx esbuild scripts/export-texts.ts --bundle --platform=node --outfile=scripts/.export.cjs && node scripts/.export.cjs
import { writeFileSync } from 'node:fs';
import { courses } from '../src/languages';
import { handbookPhrases } from '../src/engine/handbookItems';
import { allPhrases } from '../src/engine/exercises';
import { romanToGurmukhi } from '../src/engine/script';
import { audioKey } from '../src/engine/audioKey';
import { SETTINGS_TEST_PHRASE } from '../src/engine/speech';

const out = new Map<string, string>();
const add = (script: string | undefined, roman: string) => {
  const g = script ?? romanToGurmukhi(roman);
  out.set(audioKey(g), g);
};
for (const c of courses.filter((c) => c.available)) {
  for (const p of allPhrases(c)) add(p.script, p.text);
  for (const p of handbookPhrases(c)) add(p.script, p.text);
  for (const d of c.dialogues ?? []) for (const l of d.lines) add(undefined, l.pa);
}
add(undefined, SETTINGS_TEST_PHRASE);
const list = [...out].map(([key, text]) => ({ key, text }));
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify(list, null, 1));
console.log(`${list.length} lines`);
