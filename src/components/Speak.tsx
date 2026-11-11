import type { Phrase } from '../languages/types';
import { speakPhrase, speakPunjabi } from '../engine/speech';

export function SpeakButton({ phrase, script, text, size = 'md', slow = false }: { phrase?: Phrase; script?: string; text?: string; size?: 'sm' | 'md' | 'lg'; slow?: boolean }) {
  const go = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rate = slow ? 0.6 : undefined;
    if (phrase) speakPhrase(phrase, rate);
    else if (text) speakPunjabi(script, text, rate);
  };
  return (
    <button className={`speak speak-${size}`} onClick={go} aria-label={slow ? 'Play slowly' : 'Play audio'} title={slow ? 'Play slowly' : 'Play audio'}>
      {slow ? '🐢' : '🔊'}
    </button>
  );
}
