import type { Phrase } from '../languages/types';
import { getState } from './progress';
import { gurmukhiToDevanagari, romanToGurmukhi } from './script';

// Text to speech, best option first:
// 1. Online Punjabi voice (Google Translate audio) when online and allowed in settings
// 2. A Punjabi voice installed on the device (pa-IN)
// 3. A Hindi voice reading the phrase converted to Devanagari (very close sounds; available on iOS, Mac, Windows, Android)
// 4. Any voice reading the romanized text

let voices: SpeechSynthesisVoice[] = [];
const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
function refreshVoices() {
  voices = synth?.getVoices() ?? [];
}
refreshVoices();
synth?.addEventListener?.('voiceschanged', refreshVoices);

const findVoice = (prefix: string) => voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));

export const speechSupported = () => !!synth || typeof Audio !== 'undefined';

let currentAudio: HTMLAudioElement | null = null;

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

function speakOnline(script: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (!navigator.onLine) return resolve(false);
    currentAudio?.pause();
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=pa&ttsspeed=${rate < 0.8 ? 0.24 : 1}&q=${encodeURIComponent(script)}`;
    const a = new Audio(url);
    currentAudio = a;
    a.playbackRate = Math.max(0.7, Math.min(1, rate + 0.1));
    let done = false;
    const finish = (ok: boolean) => {
      if (!done) {
        done = true;
        resolve(ok);
      }
    };
    a.onended = () => finish(true);
    a.onerror = () => finish(false);
    a.play().catch(() => finish(false));
    setTimeout(() => a.readyState === 0 && (a.pause(), finish(false)), 4000);
  });
}

/** Speak Punjabi text. `script` (Gurmukhi) gives the best pronunciation; `roman` is the fallback. */
export async function speakPunjabi(script: string | undefined, roman: string, rateOverride?: number) {
  const { sound, speechRate, onlineVoice } = getState().settings;
  if (!sound) return;
  const rate = rateOverride ?? speechRate;
  // No hand-written script? Convert the romanized text so the Punjabi voice can read it.
  script = script ?? romanToGurmukhi(roman);
  if (script && onlineVoice && (await speakOnline(script, rate))) return;
  refreshVoices();
  const pa = findVoice('pa');
  if (script && pa) return speakDevice(script, 'pa-IN', pa, rate);
  const hi = findVoice('hi');
  if (script && hi) return speakDevice(gurmukhiToDevanagari(script), 'hi-IN', hi, rate);
  return speakDevice(roman, hi ? 'hi-IN' : 'en-IN', hi ?? findVoice('en-in'), rate);
}

export const speakPhrase = (p: Phrase, rate?: number) => speakPunjabi(p.script, p.text, rate);

export function stopSpeaking() {
  synth?.cancel();
  currentAudio?.pause();
}

/** Describe which voice will be used, for the settings screen. */
export function voiceInfo(): string {
  refreshVoices();
  const s = getState().settings;
  const parts: string[] = [];
  if (s.onlineVoice) parts.push('Online Punjabi voice when connected');
  const pa = findVoice('pa');
  const hi = findVoice('hi');
  if (pa) parts.push(`device Punjabi voice (${pa.name})`);
  else if (hi) parts.push(`device Hindi voice (${hi.name}) offline`);
  else parts.push('device default voice offline');
  return parts.join(', then ');
}
