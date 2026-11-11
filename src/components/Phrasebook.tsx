import { useState } from 'react';
import type { Course } from '../languages/types';
import { langProgress } from '../engine/progress';
import { SpeakButton } from './Speak';
import { allPairs } from '../engine/hindi';

export function Phrasebook({ course }: { course: Course }) {
  const [showAll, setShowAll] = useState(false);
  const lp = langProgress(course.languageId);
  const [showHindi, setShowHindi] = useState(false);
  const pairs = allPairs(course);
  return (
    <div className="page">
      <header className="topbar">
        <h1>Phrasebook</h1>
      </header>
      <div className="toggles">
        <label>
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Show phrases not learned yet
        </label>
      </div>
      {pairs.length > 0 && (
        <section className="card book">
          <button className="hindi-toggle" onClick={() => setShowHindi(!showHindi)}>
            <h2>
              <span className="hindi-flag">HI</span> Hindi ➜ {course.languageName} words ({pairs.length}) {showHindi ? '▾' : '▸'}
            </h2>
          </button>
          {showHindi && (
            <div className="cheat">
              {pairs.map(([pa, hi]) => (
                <div key={pa} className="cheat-row">
                  <span className="muted">{hi}</span>
                  <span>➜</span>
                  <b>{pa}</b>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {course.units.map((u) => {
        const phrases = u.lessons.flatMap((l) => l.phrases).filter((p) => showAll || lp.phrases[p.id]);
        if (!phrases.length) return null;
        return (
          <section key={u.id} className="card book">
            <h2>
              {u.emoji} {u.title}
            </h2>
            {phrases.map((p) => {
              const st = lp.phrases[p.id];
              const strength = st ? Math.round((st.right / Math.max(1, st.seen)) * 100) : null;
              return (
                <div key={p.id} className="book-row">
                  <SpeakButton phrase={p} size="sm" />
                  <div className="book-text">
                    <strong>{p.text}</strong>
                    <span className="muted">{p.en}</span>
                    {showAll && p.hi && <span className="muted small">Hindi: {p.hi}</span>}
                  </div>
                  {strength !== null && <span className={`strength ${strength >= 80 ? 'good' : strength >= 50 ? 'ok' : 'weak'}`}>{strength}%</span>}
                </div>
              );
            })}
          </section>
        );
      })}
      {!showAll && Object.keys(lp.phrases).length === 0 && <p className="empty">Phrases you learn will show up here. Start a lesson first!</p>}
    </div>
  );
}
