import { actions, useAppState } from '../engine/progress';
import { useState } from 'react';
import { lastVoiceUsed, speakText, voiceInfo } from '../engine/speech';
import { courses, getCourse } from '../languages';
import { kit } from '../engine/lang';

export function Settings() {
  const [used, setUsed] = useState('');
  const s = useAppState();
  const st = s.settings;
  const course = getCourse(s.language);
  const name = course.languageName;
  const native = st.recognitionLang === 'hi-IN' || st.recognitionLang === 'en-IN' ? st.recognitionLang : kit().bcp47;
  return (
    <div className="page">
      <header className="topbar">
        <h1>Settings</h1>
      </header>
      <section className="card settings">
        <label className="row">
          <span>Language</span>
          <select value={s.language} onChange={(e) => actions.setLanguage(e.target.value)}>
            {courses.map((c) => (
              <option key={c.languageId} value={c.languageId} disabled={!c.available}>
                {c.flag} {c.languageName}
                {c.available ? '' : ' (coming soon)'}
              </option>
            ))}
          </select>
        </label>
        <label className="row">
          <span>Sound</span>
          <input type="checkbox" checked={st.sound} onChange={(e) => actions.updateSettings({ sound: e.target.checked })} />
        </label>
        <label className="row">
          <span>Play phrases automatically</span>
          <input type="checkbox" checked={st.autoplay} onChange={(e) => actions.updateSettings({ autoplay: e.target.checked })} />
        </label>
        <label className="row">
          <span>Use online {name} voice (best quality)</span>
          <input type="checkbox" checked={st.onlineVoice} onChange={(e) => actions.updateSettings({ onlineVoice: e.target.checked })} />
        </label>
        <label className="row">
          <span>Speech speed</span>
          <input type="range" min={0.5} max={1.1} step={0.05} value={st.speechRate} onChange={(e) => actions.updateSettings({ speechRate: Number(e.target.value) })} />
        </label>
        <button
          className="btn btn-secondary"
          onClick={async () => {
            await speakText(course.voiceSample?.script, course.voiceSample?.text ?? 'Hello');
            setUsed(lastVoiceUsed());
          }}
        >
          🔊 Test voice
        </button>
        <p className="muted small">Voice: {voiceInfo()}.{used && <> Just played with: <b>{used}</b>.</>}</p>
        <label className="row">
          <span>Speaking exercises in lessons</span>
          <input type="checkbox" checked={st.speakInLessons} onChange={(e) => actions.updateSettings({ speakInLessons: e.target.checked })} />
        </label>
        <label className="row">
          <span>Speech checking listens in</span>
          <select value={native} onChange={(e) => actions.updateSettings({ recognitionLang: e.target.value })}>
            <option value={kit().bcp47}>{name} (best)</option>
            <option value="hi-IN">Hindi (if {name} isn't available)</option>
            <option value="en-IN">English (India)</option>
          </select>
        </label>
        <label className="row">
          <span>Daily goal</span>
          <select value={st.dailyGoal} onChange={(e) => actions.updateSettings({ dailyGoal: Number(e.target.value) })}>
            {[10, 20, 30, 50, 80].map((n) => (
              <option key={n} value={n}>
                {n} XP
              </option>
            ))}
          </select>
        </label>
      </section>
      <section className="card settings">
        <h2>Install on your devices</h2>
        <p className="small">
          <strong>iPhone / iPad:</strong> open this page in Safari, tap Share, then "Add to Home Screen".
          <br />
          <strong>Mac / Windows:</strong> in Chrome or Edge, click the install icon in the address bar (or menu → "Install Boli"). On Mac Safari use File → "Add to Dock".
        </p>
      </section>
      <section className="card settings">
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) actions.reset();
          }}
        >
          Reset progress
        </button>
      </section>
    </div>
  );
}
