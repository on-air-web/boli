import { useEffect, useMemo, useState } from 'react';
import type { Course, Phrase } from '../languages/types';
import type { Dialogue } from '../languages/handbook-types';
import { allPhrases } from '../engine/exercises';
import { handbookPhrases, isSentence } from '../engine/handbookItems';
import { PASS, recognitionSupported, type Score } from '../engine/listen';
import { speakPhrase, speakText, stopSpeaking } from '../engine/speech';
import { actions, langProgress } from '../engine/progress';
import { sample } from '../engine/text';
import { SpeakButton } from './Speak';
import { SpeakCheck } from './SpeakCheck';

type View = { kind: 'home' } | { kind: 'drill'; title: string; items: Phrase[] } | { kind: 'convo'; dialogue: Dialogue };

export function SpeakTab({ course, start }: { course: Course; start?: View }) {
  const [view, setView] = useState<View>(start ?? { kind: 'home' });
  useEffect(() => () => stopSpeaking(), []);
  const home = () => setView({ kind: 'home' });

  if (view.kind === 'drill') return <Drill title={view.title} items={view.items} onExit={home} languageId={course.languageId} />;
  if (view.kind === 'convo') return <Conversation dialogue={view.dialogue} onExit={home} languageId={course.languageId} languageName={course.languageName} />;

  const lp = langProgress(course.languageId);
  const learned = allPhrases(course).filter((p) => lp.phrases[p.id]);
  const sets: { title: string; emoji: string; desc: string; items: () => Phrase[] }[] = [
    ...(learned.length >= 3 ? [{ title: 'Phrases you learned', emoji: '⭐', desc: `${learned.length} phrases from your lessons`, items: () => sample(learned, 8) }] : []),
    { title: 'Everyday sentences', emoji: '📝', desc: 'Chatting, plans, work, family', items: () => sample(handbookPhrases(course, ['sentences']).filter(isSentence), 8) },
    { title: `${course.languageName} + English`, emoji: '🔀', desc: 'How people really talk', items: () => sample(handbookPhrases(course, ['english-mix']), 8) },
    { title: 'Social phrases and slang', emoji: '🎉', desc: 'Greetings, reactions, expressions', items: () => sample(handbookPhrases(course, ['social', 'slang']), 8) },
    { title: 'Numbers and time', emoji: '🔢', desc: 'Counting and telling the time', items: () => sample(handbookPhrases(course, ['numbers', 'time']), 8) },
    { title: 'Getting around', emoji: '🧭', desc: 'Directions, food, health', items: () => sample(handbookPhrases(course, ['places', 'food', 'body', 'weather']).filter(isSentence), 8) },
  ];

  return (
    <div className="page">
      <header className="topbar">
        <h1>Speak</h1>
      </header>
      {!recognitionSupported() && (
        <p className="notice small">
          🎤 This browser can't check your speech. Open the app in <b>Chrome</b> or <b>Safari</b> to get feedback. You can still listen and practise out loud here.
        </p>
      )}
      <section>
        <h2 className="section-h">🗣️ Conversations</h2>
        <p className="muted small">The app plays one side of a real chat, and you answer out loud.</p>
        <div className="grid">
          {(course.dialogues ?? []).map((d) => (
            <button key={d.id} className="tile-card" onClick={() => setView({ kind: 'convo', dialogue: d })}>
              <span className="tile-emoji">{d.emoji}</span>
              <b>{d.title}</b>
              <span className="muted small">{d.setting}</span>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-h">🔁 Repeat after me</h2>
        <p className="muted small">Listen, then say it. You'll see which words sounded right.</p>
        <div className="grid">
          {sets.map((s) => (
            <button key={s.title} className="tile-card" onClick={() => setView({ kind: 'drill', title: s.title, items: s.items() })}>
              <span className="tile-emoji">{s.emoji}</span>
              <b>{s.title}</b>
              <span className="muted small">{s.desc}</span>
            </button>
          ))}
        </div>
      </section>
      <p className="muted small tip-box">
        Tips: speak at a normal pace, in a quiet place. {course.languageName} spellings vary, so the checker listens for sounds, not spelling. English words like "busy" or "call" are fine to say in English.
      </p>
    </div>
  );
}

function Drill({ title, items, onExit, languageId }: { title: string; items: Phrase[]; onExit: () => void; languageId: string }) {
  const [i, setI] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const [showEn, setShowEn] = useState(true);
  const p = items[i];
  useEffect(() => {
    if (p) speakPhrase(p);
    setBest(null);
  }, [p]);

  if (!p) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
    return (
      <div className="done overlay">
        <div className="done-emoji">🎤</div>
        <h1>Nice speaking!</h1>
        <div className="done-stats">
          <div>
            <b>{scores.length}</b>
            <span>phrases</span>
          </div>
          <div>
            <b>{avg}%</b>
            <span>avg. score</span>
          </div>
        </div>
        <button className="btn" onClick={onExit}>
          Done
        </button>
      </div>
    );
  }

  const next = () => {
    setScores((s) => [...s, best ?? 0]);
    if (i + 1 >= items.length) actions.finishSession(languageId, null, 5 + Math.round(((best ?? 0) / 100) * 5));
    setI(i + 1);
  };
  const onResult = (s: Score) => setBest((b) => Math.max(b ?? 0, s.score));

  return (
    <div className="lesson overlay">
      <div className="lesson-top">
        <button className="icon-btn" onClick={onExit} aria-label="Back">
          ✕
        </button>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${(i / items.length) * 100}%` }} />
        </div>
        <span className="lesson-count">
          {i + 1}/{items.length}
        </span>
      </div>
      <div className="lesson-body">
        <div className="pill">{title}</div>
        <div className="drill-card">
          <div className="intro-main">
            <SpeakButton phrase={p} size="lg" />
            <SpeakButton phrase={p} size="sm" slow />
          </div>
          <h2 className="big center">{p.text}</h2>
          {showEn ? <p className="meaning center">{p.en}</p> : <button className="link" onClick={() => setShowEn(true)}>Show meaning</button>}
          {p.alt && p.alt.length > 0 && <p className="muted small center">Also: {p.alt.join(' · ')}</p>}
        </div>
        <SpeakCheck accepted={[p.text, ...(p.alt ?? [])]} onResult={onResult} />
      </div>
      <footer className={`feedback ${best !== null && best >= PASS ? 'correct' : ''}`}>
        <div className="row-btns">
          <button className="btn btn-secondary" onClick={() => setShowEn(!showEn)}>
            {showEn ? 'Hide English' : 'Show English'}
          </button>
          <button className="btn" onClick={next}>
            {best === null ? 'Skip' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  );
}

interface Turn {
  who: 'A' | 'B';
  pa: string;
  en: string;
  score?: number;
}

function Conversation({ dialogue, onExit, languageId, languageName }: { dialogue: Dialogue; onExit: () => void; languageId: string; languageName: string }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Turn[]>([]);
  const [hint, setHint] = useState(false);
  const [showEn, setShowEn] = useState(true);
  const [tries, setTries] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const line = dialogue.lines[step];
  const accepted = useMemo(() => (line ? [line.pa, ...(line.accept ?? [])] : []), [line]);

  // The app's lines play automatically, then the chat moves on.
  useEffect(() => {
    if (!line || line.who !== 'A') return;
    let cancelled = false;
    const t = setTimeout(async () => {
      await speakText(undefined, line.pa);
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        setDone((d) => [...d, { who: 'A', pa: line.pa, en: line.en }]);
        setStep((s) => s + 1);
      }, 500);
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setHint(false);
    setTries(0);
    setLastScore(null);
  }, [step]);

  function advance(score: number) {
    setDone((d) => [...d, { who: 'B', pa: line.pa, en: line.en, score }]);
    setStep((s) => s + 1);
  }

  const onResult = (s: Score) => {
    setTries((t) => t + 1);
    setLastScore(s.score);
    if (s.score >= PASS) setTimeout(() => advance(s.score), 1200);
  };

  const finished = !line;
  const myScores = done.filter((t) => t.who === 'B').map((t) => t.score ?? 0);
  useEffect(() => {
    if (finished) actions.finishSession(languageId, null, 10);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="lesson overlay">
      <div className="lesson-top">
        <button className="icon-btn" onClick={onExit} aria-label="Back">
          ✕
        </button>
        <div className="convo-title">
          {dialogue.emoji} {dialogue.title}
        </div>
        <button className="icon-btn small" onClick={() => setShowEn(!showEn)} title="Show or hide English">
          {showEn ? 'EN ✓' : 'EN'}
        </button>
      </div>
      <div className="lesson-body chat">
        <p className="muted small center">{dialogue.setting} You are the blue bubbles.</p>
        {done.map((t, k) => (
          <div key={k} className={`bubble ${t.who === 'A' ? 'them' : 'me'}`}>
            <div className="bubble-pa">
              {t.pa} <SpeakButton text={t.pa} size="sm" />
            </div>
            {showEn && <div className="bubble-en">{t.en}</div>}
            {t.score !== undefined && <div className="bubble-score">{t.score}%</div>}
          </div>
        ))}
        {line?.who === 'A' && <div className="bubble them typing">…</div>}
        {line?.who === 'B' && (
          <div className="your-turn">
            <div className="pill">Your turn</div>
            <p className="say-this">
              Say: <b>“{line.en}”</b>
            </p>
            {hint ? (
              <p className="hint">
                {line.pa} <SpeakButton text={line.pa} size="sm" />
              </p>
            ) : (
              <button className="link" onClick={() => setHint(true)}>
                Show me the {languageName}
              </button>
            )}
            <SpeakCheck accepted={accepted} onResult={onResult} />
            {(tries >= 2 || !recognitionSupported()) && lastScore !== null && lastScore < PASS && (
              <button className="btn btn-secondary" onClick={() => advance(lastScore ?? 0)}>
                Move on
              </button>
            )}
            {!recognitionSupported() && (
              <button className="btn btn-secondary" onClick={() => advance(0)}>
                I said it, continue
              </button>
            )}
          </div>
        )}
        {finished && (
          <div className="convo-done">
            <h2>🎉 Conversation complete!</h2>
            <p>
              Your average: <b>{Math.round(myScores.reduce((a, b) => a + b, 0) / Math.max(1, myScores.length))}%</b>
            </p>
            <button className="btn" onClick={onExit}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
