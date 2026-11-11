import type { Phrase } from '../languages/types';
import { getState } from './progress';
import { gurmukhiToDevanagari, romanToGurmukhi } from './script';

// Text to speech, best option first:
// 1. Online Punjabi voice (Google Translate audio) when online and allowed in settings
// 2. A Punjabi voice installed on the device (pa-IN)
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

function speakOnline(script: string, rate: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (!navigator.onLine || !audio) return resolve(false);
    audio.pause();
    // The page sends no Referer (see index.html), which Google's voice endpoint requires.
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=pa&total=1&idx=0&textlen=${script.length}&q=${encodeURIComponent(script)}`;
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
      .then(() => (lastVoice = 'Online Punjabi voice'))
      .catch(() => finish(false));
    setTimeout(() => audio.readyState === 0 && (audio.pause(), finish(false)), 5000);
  });
}

/** Speak Punjabi text. `script` (Gurmukhi) gives the best pronunciation; `roman` is converted when missing. */
export async function speakPunjabi(script: string | undefined, roman: string, rateOverride?: number) {
  const { sound, speechRate, onlineVoice } = getState().settings;
  if (!sound) return;
  const rate = rateOverride ?? speechRate;
  // Never read the English letters aloud: that sounds like English. Always speak real Punjabi/Hindi script.
  script = script ?? romanToGurmukhi(roman);
  if (onlineVoice && (await speakOnline(script, rate))) return;
  refreshVoices();
  const pa = findVoice('pa');
  if (pa) {
    lastVoice = `Device Punjabi voice (${pa.name})`;
    return speakDevice(script, 'pa-IN', pa, rate);
  }
  // Hindi voices read Punjabi in Devanagari letters almost perfectly (same sounds, same alphabet order).
  const hi = findVoice('hi');
  lastVoice = hi ? `Device Hindi voice (${hi.name})` : 'Device Hindi voice';
  return speakDevice(gurmukhiToDevanagari(script), 'hi-IN', hi, rate);
}

export const speakPhrase = (p: Phrase, rate?: number) => speakPunjabi(p.script, p.text, rate);

export function stopSpeaking() {
  synth?.cancel();
  audio?.pause();
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
