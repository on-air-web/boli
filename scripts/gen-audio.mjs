// Generates natural audio (Punjabi, Marathi, Bengali) for every line in scripts/texts.json using Microsoft Azure Speech
// (neural voices; the free tier covers this easily). Only missing files are made, so re-runs are cheap.
// Needs env AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (e.g. centralindia). Optional VOICE_PA / VOICE_MR / VOICE_BN.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const KEY = process.env.AZURE_SPEECH_KEY;
const REGION = process.env.AZURE_SPEECH_REGION;
const VOICES = {
  pa: process.env.VOICE_PA || process.env.VOICE || 'pa-IN-VaaniNeural',
  mr: process.env.VOICE_MR || 'mr-IN-AarohiNeural',
  bn: process.env.VOICE_BN || 'bn-IN-TanishaaNeural',
};
if (!KEY || !REGION) {
  console.error('Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION');
  process.exit(1);
}
const dir = new URL('../public/audio/', import.meta.url);
const texts = JSON.parse(readFileSync(new URL('./texts.json', import.meta.url), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let made = 0;
for (const { key, text, lang = 'pa' } of texts) {
  const VOICE = VOICES[lang] ?? VOICES.pa;
  const file = new URL(`${key}.mp3`, dir);
  if (existsSync(file)) continue;
  const ssml = `<speak version="1.0" xml:lang="${VOICE.slice(0, 5)}"><voice name="${VOICE}"><prosody rate="-8%">${esc(text)}</prosody></voice></speak>`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'boli-audio-generator',
      },
      body: ssml,
    });
    if (res.ok) {
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      made++;
      break;
    }
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    console.error(`Failed (${res.status}) for: ${text}`);
    process.exit(1);
  }
}
const keys = readdirSync(dir).filter((f) => f.endsWith('.mp3')).map((f) => f.slice(0, -4)).sort();
writeFileSync(new URL('manifest.json', dir), JSON.stringify({ voices: VOICES, keys }));
console.log(`Made ${made} new clips, ${keys.length} total.`);
