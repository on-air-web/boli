import { useEffect, useMemo, useRef, useState } from 'react';
import type { Phrase } from '../languages/types';
import type { Exercise } from '../engine/exercises';
import { checkTyped, normalize, shuffle, tiles, type Verdict } from '../engine/text';
import { speakPhrase, stopSpeaking } from '../engine/speech';
import { getState } from '../engine/progress';
import { SpeakButton } from './Speak';
import { SpeakCheck } from './SpeakCheck';
import { PASS } from '../engine/listen';
import { hindiNote } from '../engine/hindi';
import { getCourse } from '../languages';

interface Props {
  title: string;
  exercises: Exercise[];
  onAnswer: (phraseId: string, correct: boolean) => void;
  onDone: (stats: { correct: number; total: number }) => void;
  onQuit: () => void;
}

const EXPAND: [RegExp, string][] = [
  [/\bim\b/g, 'i am'], [/\bits\b/g, 'it is'], [/\bwhats\b/g, 'what is'], [/\bdidnt\b/g, 'did not'], [/\bdont\b/g, 'do not'],
  [/\bthats\b/g, 'that is'], [/\bill\b/g, 'i will'], [/\bid\b/g, 'i would'], [/\blets\b/g, 'let us'], [/\bhows\b/g, 'how is'], [/\bwheres\b/g, 'where is'],
];
const englishKey = (s: string) => {
  let k = normalize(s.replace(/\(.*?\)/g, ''));
  for (const [re, r] of EXPAND) k = k.replace(re, r);
  return k.replace(/\b(the|a|an|please|some)\b/g, '').replace(/\s+/g, ' ').trim();
};

const autoplay = (p: Phrase) => getState().settings.autoplay && speakPhrase(p);

export function Lesson({ title, exercises, onAnswer, onDone, onQuit }: Props) {
  const [queue, setQueue] = useState(exercises);
  const [i, setI] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const ex = queue[i];
  const gradable = queue.filter((e) => e.kind !== 'intro').length;
  const progress = Math.round((i / queue.length) * 100);

  useEffect(() => () => stopSpeaking(), []);

  function grade(v: Verdict, phrase?: Phrase) {
    setVerdict(v);
    const ok = v !== 'wrong';
    if (phrase) {
      onAnswer(phrase.id, ok);
      if (getState().settings.autoplay) speakPhrase(phrase);
    }
    setStats((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    // Got it wrong? See it again at the end.
    if (!ok && ex.kind !== 'match' && ex.kind !== 'intro' && ex.kind !== 'speak') setQueue((q) => [...q, reshuffle(ex)]);
  }

  function next() {
    setVerdict(null);
    if (i + 1 >= queue.length) onDone(stats);
    else setI(i + 1);
  }

  if (!ex) return null;
  const phrase = 'phrase' in ex ? ex.phrase : undefined;

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button className="icon-btn" onClick={onQuit} aria-label="Quit lesson">
          ✕
        </button>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="lesson-count" title={title}>
          {stats.correct}/{gradable}
        </span>
      </div>

      <div className="lesson-body" key={i}>
        {ex.kind === 'intro' && <Intro phrase={ex.phrase} />}
        {(ex.kind === 'choose-en' || ex.kind === 'choose-pa' || ex.kind === 'listen' || ex.kind === 'hindi') && (
          <Choice ex={ex} locked={verdict !== null} onCheck={(ok) => grade(ok ? 'correct' : 'wrong', ex.phrase)} />
        )}
        {ex.kind === 'build' && <Build ex={ex} locked={verdict !== null} onCheck={(v) => grade(v, ex.phrase)} />}
        {(ex.kind === 'type-pa' || ex.kind === 'type-en') && <TypeIt ex={ex} locked={verdict !== null} onCheck={(v) => grade(v, ex.phrase)} />}
        {ex.kind === 'speak' && (
          <SpeakEx
            phrase={ex.phrase}
            locked={verdict !== null}
            onPass={() => grade('correct', ex.phrase)}
            onFail={() => grade('wrong', ex.phrase)}
            onSkip={() => {
              // Can't talk right now: drop the remaining speaking exercises in this lesson.
              setQueue((q) => [...q.slice(0, i + 1), ...q.slice(i + 1).filter((e) => e.kind !== 'speak')]);
              next();
            }}
          />
        )}
        {ex.kind === 'match' && <Match pairs={ex.pairs} onMiss={(id) => onAnswer(id, false)} onDone={(mistakes) => grade(mistakes <= 1 ? 'correct' : 'wrong')} />}
      </div>

      {ex.kind === 'intro' ? (
        <footer className="feedback">
          <button className="btn" onClick={next} autoFocus>
            Got it
          </button>
        </footer>
      ) : verdict ? (
        <footer className={`feedback ${verdict}`}>
          <div className="feedback-text">
            <strong>{verdict === 'correct' ? pick(['Nice!', 'Bahut vadhiya!', 'Correct!', 'Shabaash!']) : verdict === 'typo' ? 'Almost! Watch the spelling.' : 'Not quite.'}</strong>
            {phrase && verdict !== 'correct' && (
              <span>
                Answer: <b>{ex.kind === 'type-en' || ex.kind === 'choose-en' || ex.kind === 'listen' ? phrase.en : phrase.text}</b>
              </span>
            )}
            {phrase && (
              <span className="muted">
                {phrase.text} = {phrase.en}
              </span>
            )}
          </div>
          <button className="btn" onClick={next} autoFocus>
            Continue
          </button>
        </footer>
      ) : null}
    </div>
  );
}

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function reshuffle(ex: Exercise): Exercise {
  if ('options' in ex) return { ...ex, options: shuffle(ex.options) };
  if (ex.kind === 'build') return { ...ex, bank: shuffle(ex.bank) };
  return { ...ex };
}

function Intro({ phrase }: { phrase: Phrase }) {
  useEffect(() => void autoplay(phrase), [phrase]);
  return (
    <div className="intro">
      <div className="pill">New phrase</div>
      <div className="intro-main">
        <SpeakButton phrase={phrase} size="lg" />
        <SpeakButton phrase={phrase} size="sm" slow />
      </div>
      <h2 className="big">{phrase.text}</h2>
      <p className="meaning">{phrase.en}</p>
      {phrase.words && phrase.words.length > 1 && (
        <div className="words">
          {phrase.words.map(([w, m]) => (
            <span key={w} className="word">
              <b>{w}</b>
              <small>{m}</small>
            </span>
          ))}
        </div>
      )}
      {phrase.note && <p className="note">💡 {phrase.note}</p>}
      <HindiBox phrase={phrase} />
    </div>
  );
}

function SpeakEx({ phrase, locked, onPass, onFail, onSkip }: { phrase: Phrase; locked: boolean; onPass: () => void; onFail: () => void; onSkip: () => void }) {
  useEffect(() => void autoplay(phrase), [phrase]);
  const [missed, setMissed] = useState(false);
  return (
    <div className="exercise">
      <h3>Say this out loud</h3>
      <div className="prompt">
        <SpeakButton phrase={phrase} size="sm" />
        <div>
          <span className="big">{phrase.text}</span>
          <div className="muted">{phrase.en}</div>
        </div>
      </div>
      <SpeakCheck accepted={[phrase.text, ...(phrase.alt ?? [])]} onResult={(s) => !locked && (s.score >= PASS ? onPass() : setMissed(true))} />
      {!locked && (
        <div className="row-btns">
          {missed && (
            <button className="btn btn-secondary" onClick={onFail}>
              Move on
            </button>
          )}
          <button className="link skip" onClick={onSkip}>
            Can't speak right now
          </button>
        </div>
      )}
    </div>
  );
}

function HindiBox({ phrase }: { phrase: Phrase }) {
  const n = hindiNote(phrase, getCourse(getState().language));
  if (!n) return null;
  if (n.kind === 'same')
    return (
      <div className="hindi same">
        <span className="hindi-flag">HI</span> {n.line}
      </div>
    );
  return (
    <div className="hindi">
      <div className="hindi-lead">
        <span className="hindi-flag">HI</span> {n.lead}
      </div>
      <div className="hindi-pairs">
        {n.pairs.map(([pa, hi]) => (
          <span key={pa} className="hindi-pair">
            <span className="hi-word">{hi}</span> <span className="arrow">➜</span> <b>{pa}</b>
          </span>
        ))}
      </div>
      <div className="hindi-sentence">
        Hindi: <i>{n.hi}</i>
      </div>
      {n.pattern && <div className="hindi-pattern">{n.pattern}</div>}
    </div>
  );
}

function Choice({ ex, locked, onCheck }: { ex: Extract<Exercise, { options: string[] }>; locked: boolean; onCheck: (ok: boolean) => void }) {
  const [sel, setSel] = useState<string | null>(null);
  const answer = ex.kind === 'choose-pa' || ex.kind === 'hindi' ? ex.phrase.text : ex.phrase.en;
  useEffect(() => {
    if (ex.kind === 'listen') speakPhrase(ex.phrase);
  }, [ex]);
  return (
    <div className="exercise">
      <h3>
        {ex.kind === 'listen'
          ? 'What did you hear?'
          : ex.kind === 'choose-pa'
            ? 'How do you say this in Punjabi?'
            : ex.kind === 'hindi'
              ? 'You know it in Hindi. Now say it in Punjabi!'
              : 'What does this mean?'}
      </h3>
      <div className="prompt">
        {ex.kind === 'listen' ? (
          <div className="intro-main">
            <SpeakButton phrase={ex.phrase} size="lg" />
            <SpeakButton phrase={ex.phrase} size="sm" slow />
          </div>
        ) : ex.kind === 'hindi' ? (
          <div>
            <span className="hindi-flag">HI</span> <span className="big">{ex.phrase.hi}</span>
            <div className="muted">{ex.phrase.en}</div>
          </div>
        ) : ex.kind === 'choose-en' ? (
          <>
            <SpeakButton phrase={ex.phrase} size="sm" />
            <span className="big">{ex.phrase.text}</span>
          </>
        ) : (
          <span className="big">{ex.phrase.en}</span>
        )}
      </div>
      <div className="options">
        {ex.options.map((o) => (
          <button
            key={o}
            className={`option ${sel === o ? 'selected' : ''} ${locked && o === answer ? 'right' : ''} ${locked && sel === o && o !== answer ? 'wrong' : ''}`}
            disabled={locked}
            onClick={() => setSel(o)}
          >
            {o}
          </button>
        ))}
      </div>
      {!locked && (
        <button className="btn check" disabled={!sel} onClick={() => onCheck(sel === answer)}>
          Check
        </button>
      )}
    </div>
  );
}

function Build({ ex, locked, onCheck }: { ex: Extract<Exercise, { kind: 'build' }>; locked: boolean; onCheck: (v: Verdict) => void }) {
  const [picked, setPicked] = useState<number[]>([]);
  const accepted = useMemo(() => [ex.phrase.text, ...(ex.phrase.alt ?? [])].map((t) => tiles(t).join(' ').toLowerCase()), [ex]);
  const check = () => {
    const s = picked.map((k) => ex.bank[k]).join(' ').toLowerCase();
    onCheck(accepted.includes(s) ? 'correct' : 'wrong');
  };
  return (
    <div className="exercise">
      <h3>Build this in Punjabi</h3>
      <div className="prompt">
        <span className="big">{ex.phrase.en}</span>
      </div>
      <div className="answer-line">
        {picked.map((k) => (
          <button key={k} className="tile" disabled={locked} onClick={() => setPicked(picked.filter((x) => x !== k))}>
            {ex.bank[k]}
          </button>
        ))}
      </div>
      <div className="bank">
        {ex.bank.map((w, k) => (
          <button key={k} className={`tile ${picked.includes(k) ? 'ghost' : ''}`} disabled={locked || picked.includes(k)} onClick={() => setPicked([...picked, k])}>
            {w}
          </button>
        ))}
      </div>
      {!locked && (
        <button className="btn check" disabled={!picked.length} onClick={check}>
          Check
        </button>
      )}
    </div>
  );
}

function TypeIt({ ex, locked, onCheck }: { ex: Extract<Exercise, { kind: 'type-pa' | 'type-en' }>; locked: boolean; onCheck: (v: Verdict) => void }) {
  const [val, setVal] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const toPa = ex.kind === 'type-pa';
  const check = () => {
    if (!val.trim()) return;
    if (toPa) onCheck(checkTyped(val, [ex.phrase.text, ...(ex.phrase.alt ?? [])]));
    else {
      const acc = [ex.phrase.en, ...(ex.phrase.enAlt ?? [])].map(englishKey);
      const k = englishKey(val);
      onCheck(acc.includes(k) ? 'correct' : checkTyped(k, acc, false));
    }
  };
  return (
    <div className="exercise">
      <h3>{toPa ? 'Write this in Punjabi (romanized)' : 'Write this in English'}</h3>
      <div className="prompt">
        {!toPa && <SpeakButton phrase={ex.phrase} size="sm" />}
        <span className="big">{toPa ? ex.phrase.en : ex.phrase.text}</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!locked) check();
        }}
      >
        <input
          ref={ref}
          className="type-input"
          value={val}
          disabled={locked}
          onChange={(e) => setVal(e.target.value)}
          placeholder={toPa ? 'Type in Punjabi…' : 'Type in English…'}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {!locked && (
          <button className="btn check" disabled={!val.trim()}>
            Check
          </button>
        )}
      </form>
      {toPa && !locked && <p className="muted small">Spelling is flexible: "kiven" or "kiwen" both work.</p>}
    </div>
  );
}

function Match({ pairs, onMiss, onDone }: { pairs: Phrase[]; onMiss: (id: string) => void; onDone: (mistakes: number) => void }) {
  const left = useMemo(() => shuffle(pairs), [pairs]);
  const right = useMemo(() => shuffle(pairs), [pairs]);
  const [selL, setSelL] = useState<string | null>(null);
  const [selR, setSelR] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [miss, setMiss] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!selL || !selR) return;
    if (selL === selR) {
      const m = [...matched, selL];
      setMatched(m);
      const p = pairs.find((x) => x.id === selL);
      if (p && getState().settings.autoplay) speakPhrase(p);
      if (m.length === pairs.length && !finished) {
        setFinished(true);
        setTimeout(() => onDone(mistakes), 350);
      }
    } else {
      setMiss(selR);
      setMistakes((n) => n + 1);
      onMiss(selL);
      setTimeout(() => setMiss(null), 500);
    }
    setSelL(null);
    setSelR(null);
  }, [selL, selR]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="exercise">
      <h3>Match the pairs</h3>
      <div className="match">
        <div className="col">
          {left.map((p) => (
            <button key={p.id} className={`option ${selL === p.id ? 'selected' : ''} ${matched.includes(p.id) ? 'matched' : ''}`} disabled={matched.includes(p.id)} onClick={() => setSelL(p.id)}>
              {p.text}
            </button>
          ))}
        </div>
        <div className="col">
          {right.map((p) => (
            <button
              key={p.id}
              className={`option ${selR === p.id ? 'selected' : ''} ${matched.includes(p.id) ? 'matched' : ''} ${miss === p.id ? 'wrong shake' : ''}`}
              disabled={matched.includes(p.id)}
              onClick={() => setSelR(p.id)}
            >
              {p.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
