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

// Recording is slow (a couple of clips a minute), so order matters: the most-heard lines of every language
// come first, taking turns between languages. Lessons, then conversations, then the Handbook.
type Item = { key: string; text: string; lang: string };
const tiers: Item[][][] = [[], [], []]; // tier -> language -> items
const langs = courses.filter((c) => c.available);
langs.forEach((c, li) => {
  const k = kitFor(c.languageId);
  const into = (tier: number) => (script: string | undefined, roman: string) => {
    const g = script ?? k.toNative(roman);
    ((tiers[tier][li] ??= [])).push({ key: audioKey(g), text: g, lang: c.languageId });
  };
  if (c.voiceSample) into(0)(c.voiceSample.script, c.voiceSample.text);
  if (c.languageId === 'pa') into(0)(undefined, SETTINGS_TEST_PHRASE);
  for (const p of allPhrases(c)) into(0)(p.script, p.text);
  for (const d of c.dialogues ?? []) for (const l of d.lines) into(1)(undefined, l.pa);
  for (const p of handbookPhrases(c)) into(2)(p.script, p.text);
});
const out = new Map<string, { text: string; lang: string }>();
for (const tier of tiers) {
  const n = Math.max(0, ...tier.map((l) => l?.length ?? 0));
  for (let i = 0; i < n; i++) for (const l of tier) {
    const it = l?.[i];
    if (it && !out.has(it.key)) out.set(it.key, { text: it.text, lang: it.lang });
  }
}
const list = [...out].map(([key, v]) => ({ key, ...v }));
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify(list, null, 1));
const by = list.reduce<Record<string, number>>((a, x) => ((a[x.lang] = (a[x.lang] ?? 0) + 1), a), {});
console.log(`${list.length} lines`, by);
