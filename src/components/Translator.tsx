import { useState } from 'react';
import type { Course, Phrase } from '../languages/types';
import { searchLessons, translateOnline, type Direction, type Translation } from '../engine/translate';
import { SpeakButton } from './Speak';

export function Translator({ course }: { course: Course }) {
  const [dir, setDir] = useState<Direction>('en-pa');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [online, setOnline] = useState<Translation | null>(null);
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<Phrase[]>([]);
  const [searched, setSearched] = useState(false);

  async function go(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    setSearched(true);
    setError('');
    setOnline(null);
    setMatches(searchLessons(q, dir, course));
    setBusy(true);
    try {
      setOnline(await translateOnline(q.trim(), dir, course.languageId));
    } catch {
      setError(navigator.onLine ? "Couldn't reach the translation service right now." : "You're offline. Showing matches from your lessons only.");
    } finally {
      setBusy(false);
    }
  }

  const swap = () => {
    setDir(dir === 'en-pa' ? 'pa-en' : 'en-pa');
    setOnline(null);
    setMatches([]);
    setSearched(false);
  };

  return (
    <div className="page">
      <header className="topbar">
        <h1>Translate</h1>
      </header>
      <form className="card translator" onSubmit={go}>
        <div className="dir">
          <span>{dir === 'en-pa' ? 'English' : course.languageName}</span>
          <button type="button" className="swap" onClick={swap} aria-label="Swap languages">
            ⇄
          </button>
          <span>{dir === 'en-pa' ? course.languageName : 'English'}</span>
        </div>
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={dir === 'en-pa' ? 'Type in English, e.g. "Where is the market?"' : `Type ${course.languageName} in English letters, e.g. "${course.translateExample ?? 'Ki haal aa?'}"`}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) go(e);
          }}
        />
        <button className="btn" disabled={busy || !q.trim()}>
          {busy ? 'Translating…' : 'Translate'}
        </button>
      </form>

      {online && (
        <section className="card result">
          <div className="result-label">Translation</div>
          <div className="result-main">
            {dir === 'en-pa' && <SpeakButton script={online.script} text={online.text} />}
            <div>
              <div className="big">{online.text}</div>
            </div>
          </div>
          {dir === 'en-pa' && <p className="muted small">Spelling is converted automatically, so it may differ slightly from the lessons.</p>}
          {dir === 'pa-en' && <p className="muted small">Romanized {course.languageName} is tricky for online translators. Check the matches from your lessons and the Handbook too.</p>}
        </section>
      )}
      {error && <p className="notice">{error}</p>}

      {searched && matches.length > 0 && (
        <section className="card">
          <div className="result-label">From your lessons and Handbook</div>
          {matches.map((p) => (
            <div key={p.id} className="book-row">
              <SpeakButton phrase={p} size="sm" />
              <div className="book-text">
                <strong>{p.text}</strong>
                <span className="muted">{p.en}</span>
                {p.note && <span className="muted small">{p.note}</span>}
              </div>
            </div>
          ))}
        </section>
      )}
      {searched && !busy && !online && matches.length === 0 && !error && <p className="empty">No translation found.</p>}
    </div>
  );
}
