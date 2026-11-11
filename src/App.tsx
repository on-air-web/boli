import { useState } from 'react';
import { getCourse } from './languages';
import { actions, getState, langProgress, useAppState } from './engine/progress';
import { allPhrases, buildLesson, buildReview, type Exercise } from './engine/exercises';
import { speechSupported } from './engine/speech';
import { Home } from './components/Home';
import { Lesson } from './components/Lesson';
import { Translator } from './components/Translator';
import { Phrasebook } from './components/Phrasebook';
import { Settings } from './components/Settings';
import { SpeakTab } from './components/SpeakTab';
import { Handbook } from './components/Handbook';
import { recognitionSupported } from './engine/listen';

type Tab = 'learn' | 'speak' | 'handbook' | 'translate' | 'phrases' | 'settings';
interface Session { lessonId: string | null; title: string; exercises: Exercise[] }



export default function App() {
  const s = useAppState();
  const course = getCourse(s.language);
  const [tab, setTab] = useState<Tab>('learn');
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<{ xp: number; correct: number; total: number } | null>(null);
  const canListen = speechSupported() && s.settings.sound;
  const canSpeak = recognitionSupported() && s.settings.speakInLessons;
  const [convo, setConvo] = useState<string | null>(null);

  function startLesson(id: string) {
    const lesson = course.units.flatMap((u) => u.lessons).find((l) => l.id === id)!;
    setSession({ lessonId: id, title: lesson.title, exercises: buildLesson(lesson, course, { canListen, canSpeak }) });
  }
  function startReview() {
    const lp = langProgress(course.languageId);
    const learned = allPhrases(course).filter((p) => lp.phrases[p.id]);
    const weakness = (p: { id: string }) => {
      const st = lp.phrases[p.id];
      return st ? st.wrong * 2 - st.right + (Date.now() - st.last) / 864e5 : 0;
    };
    setSession({ lessonId: null, title: 'Practice', exercises: buildReview(learned, course, weakness, { canListen, canSpeak }) });
  }

  if (session) {
    return (
      <Lesson
        title={session.title}
        exercises={session.exercises}
        onAnswer={(id, ok) => actions.recordAnswer(course.languageId, id, ok)}
        onQuit={() => setSession(null)}
        onDone={({ correct, total }) => {
          const xp = 10 + Math.round((correct / Math.max(1, total)) * 10);
          actions.finishSession(course.languageId, session.lessonId, xp);
          setResult({ xp, correct, total });
          setSession(null);
        }}
      />
    );
  }

  if (result) {
    const acc = Math.round((result.correct / Math.max(1, result.total)) * 100);
    return (
      <div className="done">
        <div className="done-emoji">🎉</div>
        <h1>Lesson complete!</h1>
        <div className="done-stats">
          <div>
            <b>+{result.xp}</b>
            <span>XP</span>
          </div>
          <div>
            <b>{acc}%</b>
            <span>accuracy</span>
          </div>
          <div>
            <b>🔥 {getState().streak}</b>
            <span>day streak</span>
          </div>
        </div>
        <button className="btn" onClick={() => setResult(null)} autoFocus>
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <main>
        {tab === 'learn' && <Home course={course} onStart={startLesson} onReview={startReview} onSettings={() => setTab('settings')} />}
        {tab === 'speak' && (
          <SpeakTab
            key={convo ?? 'home'}
            course={course}
            start={convo ? { kind: 'convo', dialogue: course.dialogues!.find((d) => d.id === convo)! } : undefined}
          />
        )}
        {tab === 'handbook' && (
          <Handbook
            course={course}
            onPractise={(id) => {
              setConvo(id);
              setTab('speak');
            }}
          />
        )}
        {tab === 'translate' && <Translator course={course} />}
        {tab === 'phrases' && <Phrasebook course={course} />}
        {tab === 'settings' && <Settings />}
      </main>
      <nav className="tabs">
        {(
          [
            ['learn', '🏠', 'Learn'],
            ['speak', '🎤', 'Speak'],
            ['handbook', '📘', 'Handbook'],
            ['translate', '🔤', 'Translate'],
            ['phrases', '⭐', 'My phrases'],
          ] as [Tab, string, string][]
        ).map(([id, icon, label]) => (
          <button key={id} className={tab === id ? 'active' : ''} onClick={() => {
              setConvo(null);
              setTab(id);
            }}>
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
