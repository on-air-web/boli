import type { Phrase } from '../languages/types';
import { getState } from './progress';
import { audioKey } from './audioKey';
import { kit } from './lang';
import { getCourse } from '../languages';

export const SETTINGS_TEST_PHRASE = 'Sat Sri Akal ji, ki haal aa? Main Punjabi sikh reha haan.';

// Pre-recorded natural-voice clips (made by scripts/gen_audio.py). Loaded once; missing = none yet.
// Keys are made from native script, so Punjabi, Marathi and Bengali clips never collide.
let recorded: Set<string> | null = null;
let recordedVoices: Record<string, string> = {};
const manifestReady =
  typeof fetch !== 'undefined'
    ? fetch('./audio/manifest.json')
        .then((r) => (r.ok ? r.json() : { keys: [] }))
        .then((m: { voice?: string; voices?: Record<string, string>; keys: string[] }) => {
          recorded = new Set(m.keys);
          recordedVoices = m.voices ?? (m.voice ? { pa: m.voice } : {});
        })
        .catch(() => (recorded = new Set()))
    : Promise.resolve();

export const recordedCount = () => recorded?.size ?? 0;

// Text to speech, best option first:
// 0. A pre-recorded natural (neural) clip, if one was generated for this exact line
// 1. Online voice for the course language (Google Translate audio) when online and allowed in settings
// 2. A voice for the language installed on the device (pa-IN / mr-IN / bn-IN)
// 3. A Hindi voice reading the phrase converted to Devanagari (very close sounds; available on iOS, Mac, Windows, Android)
// (The romanized text is never read directly: an English-style voice would mispronounce it.)

let voices: SpeechSynthesisVoice[] = [];
const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
function refreshVoices() {
  voices = synth?.getVoices() ?? [];
}
refreshVoices();
synth?.addEventListener?.('voiceschanged', refreshVoices);

const findVoice = (prefix: string) => voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));

export const speechSupported = () => !!synth || typeof Audio !== 'undefined';

function speakDevice(text: string, lang: string, voice?: SpeechSynthesisVoice, rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!synth) return resolve();
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    if (voice) u.voice = voice;
    u.rate = rate;
    // Some browsers never fire "end" (no voice installed): don't let the app wait forever.
    const guard = setTimeout(resolve, 1500 + text.length * 120);
    u.onend = () => (clearTimeout(guard), resolve());
    u.onerror = () => (clearTimeout(guard), resolve());
    synth.speak(u);
  });
}

// One shared <audio> element. Safari only lets a page play sound after a tap; once this element has
// played during a tap it stays "unlocked", so later automatic playback (lesson intros, chats) works.
const audio: HTMLAudioElement | null = typeof Audio !== 'undefined' ? new Audio() : null;
const SILENCE = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhSmxhIIEVCSiJrDCQBTcu3UrAIwUdkRgQbFAZC1CQEwTJ9mjRvBA4UOLD8nKVOWfh+UlK3z/177OXrfOdKl7pyn3Xf//WreyTRUoAWgBgkOAGbZHBgG1OF6zM82DWbZaUmMBptgQhGjsyYqc9ae9XFz280948NMBWInljyzsNRFLPWdnZGWrddDsjK1unuSrVN9jJsK8KuQtQCtMBjCEtImISdNKJOopIpBFpNSMbIHCSRpRR5iakjTiyzLhchUUBwCgyKiweBv/7UsQbg8isVNoMPMjAAAA0gAAABEVFGmgqK////9bP/6XCykxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
let unlocked = false;
function unlock() {
  if (unlocked || !audio) return;
  unlocked = true;
  audio.src = SILENCE;
  audio.play().catch(() => (unlocked = false));
  // Wake up the device voices too (Safari needs a first utterance inside a tap).
  if (synth) synth.speak(new SpeechSynthesisUtterance(''));
}
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', unlock, { capture: true });
  window.addEventListener('keydown', unlock, { capture: true });
}

let lastVoice = '';
export const lastVoiceUsed = () => lastVoice;

function playUrl(url: string, rate: number, label: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!audio) return resolve(false);
    audio.pause();
    audio.src = url;
    audio.playbackRate = Math.max(0.6, Math.min(1, rate + 0.1));
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      audio.onended = audio.onerror = null;
      resolve(ok);
    };
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    audio
      .play()
      .then(() => (lastVoice = label))
      .catch(() => finish(false));
    setTimeout(() => audio.readyState === 0 && (audio.pause(), finish(false)), 5000);
  });
}

/** Speak text in the course language (Punjabi, Marathi, Bengali). `script` (native script) gives the best
 *  pronunciation; `roman` is converted when it is missing. The English letters are never read aloud. */
export async function speakText(script: string | undefined, roman: string, rateOverride?: number) {
  const { sound, speechRate, onlineVoice } = getState().settings;
  if (!sound) return;
  const k = kit();
  const name = getCourse(k.id).languageName;
  const rate = rateOverride ?? speechRate;
  // Never read the English letters aloud: that sounds like English. Always speak real native/Hindi script.
  script = script ?? k.toNative(roman);
  await manifestReady;
  const key = audioKey(script);
  const rv = recordedVoices[k.id] ?? '';
  if (recorded?.has(key) && (await playUrl(`./audio/${key}.mp3`, rate, `Natural voice${rv ? ` (${rv.replace(/^[a-z]{2}-IN-|Neural$/g, '')})` : ''}`))) return;
  // The page sends no Referer (see index.html), which Google's voice endpoint requires.
  const google = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${k.code}&total=1&idx=0&textlen=${script.length}&q=${encodeURIComponent(script)}`;
  if (onlineVoice && navigator.onLine && (await playUrl(google, rate, `Online ${name} voice`))) return;
  refreshVoices();
  const own = findVoice(k.code);
  if (own) {
    lastVoice = `Device ${name} voice (${own.name})`;
    return speakDevice(script, k.bcp47, own, rate);
  }
  // Hindi voices read these languages in Devanagari letters very closely (same sounds, same alphabet order).
  const hi = findVoice('hi');
  lastVoice = hi ? `Device Hindi voice (${hi.name})` : 'Device Hindi voice';
  return speakDevice(k.toDeva(script), 'hi-IN', hi, rate);
}

/** Older name, kept so existing call sites keep working. */
export const speakPunjabi = speakText;

export const speakPhrase = (p: Phrase, rate?: number) => speakText(p.script, p.text, rate);

export function stopSpeaking() {
  synth?.cancel();
  audio?.pause();
}

/** Describe which voice will be used, for the settings screen. */
export function voiceInfo(): string {
  refreshVoices();
  const s = getState().settings;
  const parts: string[] = [];
  if (recordedCount()) parts.push(`Natural voice for ${recordedCount()} lesson & handbook phrases`);
  const k = kit();
  const name = getCourse(k.id).languageName;
  if (s.onlineVoice) parts.push(`Online ${name} voice when connected`);
  const own = findVoice(k.code);
  const hi = findVoice('hi');
  if (own) parts.push(`device ${name} voice (${own.name})`);
  else if (hi) parts.push(`device Hindi voice (${hi.name}) offline`);
  else parts.push('device default voice offline');
  return parts.join(', then ');
}
