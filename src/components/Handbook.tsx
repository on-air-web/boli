import { useMemo, useState } from 'react';
import type { Course, Phrase } from '../languages/types';
import type { HbRow, HbSection } from '../languages/handbook-types';
import { rowToPhrase, variants } from '../engine/handbookItems';
import { normalize } from '../engine/text';
import { SpeakButton } from './Speak';
import { SpeakCheck } from './SpeakCheck';

export function Handbook({ course, onPractise }: { course: Course; onPractise: (dialogueId: string) => void }) {
  const sections = course.handbook ?? [];
  const [open, setOpen] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [mic, setMic] = useState<Phrase | null>(null);

  const results = useMemo(() => {
    const n = normalize(q);
    if (n.length < 2) return null;
    const out: { section: HbSection; row: HbRow; id: string }[] = [];
    sections.forEach((s) =>
      s.tables?.forEach((t, ti) =>
        t.rows.forEach((r, ri) => {
          if ([r.en, r.hi, r.pa].some((x) => normalize(x).includes(n))) out.push({ section: s, row: r, id: `${s.id}-${ti}-${ri}` });
        })
      )
    );
    return out.slice(0, 60);
  }, [q, sections]);

  const section = sections.find((s) => s.id === open);

  return (
    <div className="page">
      <header className="topbar">
        {section ? (
          <button className="back" onClick={() => setOpen(null)}>
            ‹ Handbook
          </button>
        ) : (
          <h1>Handbook</h1>
        )}
      </header>

      {!section && (
        <>
          <input className="search" placeholder="Search English, Hindi or Punjabi…" value={q} onChange={(e) => setQ(e.target.value)} />
          {results ? (
            <section className="card">
              {results.length === 0 && <p className="muted">Nothing found.</p>}
              {results.map(({ section: s, row, id }) => (
                <Row key={id} row={row} id={id} onMic={setMic} tag={s.title} />
              ))}
            </section>
          ) : (
            <div className="hb-list">
              {sections.map((s) => (
                <button key={s.id} className="hb-item" onClick={() => setOpen(s.id)}>
                  <span className="hb-emoji">{s.emoji}</span>
                  <span className="hb-title">{s.title}</span>
                  <span className="muted">{count(s)}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {section && (
        <div>
          <h1 className="hb-h1">
            {section.emoji} {section.title}
          </h1>
          {section.intro && <p className="hb-intro">{section.intro}</p>}
          {section.notes?.map((n) => (
            <div key={n.title} className="card hb-note">
              <b>{n.title}</b>
              <p>{n.body}</p>
            </div>
          ))}
          {section.tables?.map((t, ti) => (
            <section key={ti} className="card">
              {t.title && <h2 className="hb-table-title">{t.title}</h2>}
              <div className="hb-head">
                <span>English</span>
                <span>Hindi</span>
                <span>Punjabi</span>
              </div>
              {t.rows.map((r, ri) => (
                <Row key={ri} row={r} id={`${section.id}-${ti}-${ri}`} onMic={setMic} />
              ))}
            </section>
          ))}
          {section.dialogues?.map((d) => (
            <section key={d.id} className="card">
              <h2 className="hb-table-title">
                {d.emoji} {d.title}
              </h2>
              <p className="muted small">{d.setting}</p>
              {d.lines.map((l, k) => (
                <div key={k} className="dlg-line">
                  <span className={`who who-${l.who}`}>{l.who}</span>
                  <div className="dlg-text">
                    <b>{l.pa}</b>
                    <span className="muted small">{l.en}</span>
                    {l.hi && <span className="muted small">Hindi: {l.hi}</span>}
                  </div>
                  <SpeakButton text={l.pa} size="sm" />
                </div>
              ))}
              <button className="btn btn-secondary" onClick={() => onPractise(d.id)}>
                🎤 Practise this conversation
              </button>
            </section>
          ))}
          {section.practice && (
            <section className="card">
              {section.practice.map((p, i) => (
                <Practice key={i} n={i + 1} en={p.en} pa={p.pa} onMic={setMic} />
              ))}
            </section>
          )}
        </div>
      )}

      {mic && (
        <div className="sheet-bg" onClick={() => setMic(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn sheet-x" onClick={() => setMic(null)} aria-label="Close">
              ✕
            </button>
            <div className="sheet-phrase">
              <SpeakButton phrase={mic} />
              <div>
                <div className="big">{mic.text}</div>
                <div className="muted">{mic.en}</div>
              </div>
            </div>
            <SpeakCheck accepted={[mic.text, ...(mic.alt ?? [])]} />
          </div>
        </div>
      )}
    </div>
  );
}

function count(s: HbSection) {
  const n = (s.tables?.reduce((a, t) => a + t.rows.length, 0) ?? 0) + (s.practice?.length ?? 0);
  if (s.dialogues) return `${s.dialogues.length} chats`;
  if (s.notes && !n) return `${s.notes.length} tips`;
  return n ? `${n}` : '';
}

function Row({ row, id, onMic, tag }: { row: HbRow; id: string; onMic: (p: Phrase) => void; tag?: string }) {
  const speakable = !row.pa.includes('...');
  const ph = rowToPhrase(row, id);
  return (
    <div className="hb-row">
      <div className="hb-cells">
        <span className="hb-en">{row.en}</span>
        <span className="hb-hi">{row.hi}</span>
        <span className="hb-pa">
          {variants(row.pa).map((v, i) => (
            <b key={i}>
              {i > 0 && <span className="muted"> / </span>}
              {v}
            </b>
          ))}
        </span>
        {(row.note || tag) && <span className="hb-note-line muted small">{[tag, row.note].filter(Boolean).join(' · ')}</span>}
      </div>
      {speakable && (
        <div className="hb-actions">
          <SpeakButton phrase={ph} size="sm" />
          <button className="mini-mic" onClick={() => onMic(ph)} aria-label="Practise saying it">
            🎤
          </button>
        </div>
      )}
    </div>
  );
}

function Practice({ n, en, pa, onMic }: { n: number; en: string; pa: string; onMic: (p: Phrase) => void }) {
  const [show, setShow] = useState(false);
  const ph: Phrase = { id: `pr-${n}`, text: pa, en };
  return (
    <div className="hb-row">
      <div className="hb-cells single">
        <span>
          {n}. {en}
        </span>
        {show ? (
          <b className="hb-pa">{pa}</b>
        ) : (
          <button className="link" onClick={() => setShow(true)}>
            Show answer
          </button>
        )}
      </div>
      <div className="hb-actions">
        {show && <SpeakButton phrase={ph} size="sm" />}
        <button className="mini-mic" onClick={() => onMic(ph)} aria-label="Say it">
          🎤
        </button>
      </div>
    </div>
  );
}
