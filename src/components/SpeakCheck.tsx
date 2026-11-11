import { useEffect, useRef, useState } from 'react';
import { listenOnce, PASS, recognitionSupported, scoreSpeech, stopListening, type Score } from '../engine/listen';
import { stopSpeaking } from '../engine/speech';
import { getCourse } from '../languages';
import { getState } from '../engine/progress';

/**
 * Tap the mic, say the phrase, get feedback word by word.
 * `accepted` = all versions that count as right (first one is shown).
 */
export function SpeakCheck({ accepted, onResult, compact = false }: { accepted: string[]; onResult?: (s: Score) => void; compact?: boolean }) {
  const [state, setState] = useState<'idle' | 'listening' | 'done' | 'error'>('idle');
  const [interim, setInterim] = useState('');
  const [result, setResult] = useState<Score | null>(null);
  const [error, setError] = useState('');
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      stopListening();
    };
  }, []);
  useEffect(() => {
    setState('idle');
    setResult(null);
    setInterim('');
  }, [accepted.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!recognitionSupported())
    return (
      <div className="notice small">
        🎤 Speech checking isn't available in this browser. Use Chrome (Mac, Windows, Android) or Safari (iPhone, iPad, Mac). For now, say it out loud and compare with the audio.
      </div>
    );

  async function start() {
    if (state === 'listening') return stopListening();
    stopSpeaking();
    setState('listening');
    setInterim('');
    setResult(null);
    try {
      const heard = await listenOnce((t) => mounted.current && setInterim(t));
      if (!mounted.current) return;
      if (!heard.alternatives.length) {
        setState('error');
        setError("I didn't catch anything. Tap the mic and speak a bit louder.");
        return;
      }
      const s = scoreSpeech(accepted, heard.alternatives);
      setResult(s);
      setState('done');
      onResult?.(s);
    } catch (e) {
      if (!mounted.current) return;
      const msg = (e as Error).message;
      setState('error');
      setError(
        msg === 'service-not-allowed'
          ? 'Speech recognition is turned off on this device. On iPhone: Settings → General → Keyboard → turn on Enable Dictation (and make sure Siri is allowed), then try again.'
          : msg === 'not-allowed'
            ? 'The microphone was refused. On iPhone: tap aA in the Safari address bar → Website Settings → Microphone → Allow (and check Settings → Safari → Microphone). Also check Settings → Privacy & Security → Speech Recognition → Safari is on.'
          : msg === 'network'
            ? 'Speech checking needs an internet connection.'
            : `Couldn't listen (${msg}). Try again.`
      );
    }
  }

  const pass = result && result.score >= PASS;
  return (
    <div className={`speakcheck ${compact ? 'compact' : ''}`}>
      <button className={`mic ${state === 'listening' ? 'on' : ''}`} onClick={start} aria-label={state === 'listening' ? 'Stop' : 'Speak'}>
        {state === 'listening' ? '⏹' : '🎤'}
      </button>
      <div className="speak-status">
        {state === 'idle' && <span className="muted">Tap the mic and say it</span>}
        {state === 'listening' && <span className="listening">Listening… {interim && <i>“{interim}”</i>}</span>}
        {state === 'error' && <span className="err">{error}</span>}
        {state === 'done' && result && (
          <>
            <div className={`score ${pass ? 'good' : result.score >= 50 ? 'ok' : 'weak'}`}>
              {result.score}% {pass ? pick([...(getCourse(getState().language).praise ?? []).map((p, i) => `${p} ${['🎉', '👏', '🙌'][i % 3]}`), 'Sounds right! ✅']) : result.score >= 50 ? 'Almost there' : 'Try again'}
            </div>
            <div className="said-words">
              {result.words.map((w, i) => (
                <span key={i} className={w.ok ? 'w-ok' : w.close ? 'w-close' : 'w-miss'}>
                  {w.word}
                </span>
              ))}
            </div>
            <div className="muted small">I heard: “{result.heard || '…'}”</div>
          </>
        )}
      </div>
    </div>
  );
}

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
