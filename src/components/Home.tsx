import type { Course } from '../languages/types';
import { courses } from '../languages';
import { actions, langProgress, today, useAppState } from '../engine/progress';

export function Home({ course, onStart, onReview, onSettings }: { course: Course; onStart: (lessonId: string) => void; onReview: () => void; onSettings: () => void }) {
  const s = useAppState();
  const lp = langProgress(course.languageId);
  const lessons = course.units.flatMap((u) => u.lessons);
  const firstOpen = lessons.findIndex((l) => !lp.completed[l.id]);
  const todayXp = s.xpByDay[today()] ?? 0;
  const goalPct = Math.min(100, Math.round((todayXp / s.settings.dailyGoal) * 100));
  const learnedCount = Object.keys(lp.phrases).length;
  const tip = course.tips?.[new Date().getDate() % (course.tips?.length || 1)];

  return (
    <div className="page">
      <header className="topbar">
        <select className="lang-select" value={course.languageId} onChange={(e) => actions.setLanguage(e.target.value)} aria-label="Language">
          {courses.map((c) => (
            <option key={c.languageId} value={c.languageId} disabled={!c.available}>
              {c.flag} {c.languageName}
              {c.available ? '' : ' (coming soon)'}
            </option>
          ))}
        </select>
        <div className="stats">
          <span title="Day streak">🔥 {s.streak}</span>
          <span title="Total XP">⭐ {s.xp}</span>
          <button className="gear" onClick={onSettings} aria-label="Settings">
            ⚙️
          </button>
        </div>
      </header>

      <section className="goal card">
        <div className="goal-row">
          <strong>Today's goal</strong>
          <span>
            {todayXp} / {s.settings.dailyGoal} XP
          </span>
        </div>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${goalPct}%` }} />
        </div>
        {tip && <p className="tip">💡 {tip}</p>}
        {learnedCount >= 4 && (
          <button className="btn btn-secondary" onClick={onReview}>
            🔁 Practice what you've learned ({learnedCount} phrases)
          </button>
        )}
      </section>

      {course.units.map((u) => (
        <section key={u.id} className="unit">
          <div className="unit-head">
            <span className="unit-emoji">{u.emoji}</span>
            <div>
              <h2>{u.title}</h2>
              <p>{u.description}</p>
            </div>
          </div>
          <div className="path">
            {u.lessons.map((l, i) => {
              const idx = lessons.indexOf(l);
              const done = !!lp.completed[l.id];
              const current = idx === firstOpen;
              return (
                <button
                  key={l.id}
                  className={`node ${done ? 'done' : ''} ${current ? 'current' : ''}`}
                  style={{ marginLeft: `${[0, 34, 0, -34][i % 4]}%` }}
                  onClick={() => onStart(l.id)}
                >
                  <span className="node-dot">{done ? '✓' : i + 1}</span>
                  <span className="node-label">
                    {l.title}
                    {done && lp.completed[l.id] > 1 ? ` ×${lp.completed[l.id]}` : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
      <p className="footnote">More units and languages are on the way.</p>
    </div>
  );
}
