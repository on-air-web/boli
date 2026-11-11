import { actions, useAppState } from '../engine/progress';
import { speakPunjabi, voiceInfo } from '../engine/speech';

export function Settings() {
  const s = useAppState();
  const st = s.settings;
  return (
    <div className="page">
      <header className="topbar">
        <h1>Settings</h1>
      </header>
      <section className="card settings">
        <label className="row">
          <span>Sound</span>
          <input type="checkbox" checked={st.sound} onChange={(e) => actions.updateSettings({ sound: e.target.checked })} />
        </label>
        <label className="row">
          <span>Play phrases automatically</span>
          <input type="checkbox" checked={st.autoplay} onChange={(e) => actions.updateSettings({ autoplay: e.target.checked })} />
        </label>
        <label className="row">
          <span>Use online Punjabi voice (best quality)</span>
          <input type="checkbox" checked={st.onlineVoice} onChange={(e) => actions.updateSettings({ onlineVoice: e.target.checked })} />
        </label>
        <label className="row">
          <span>Speech speed</span>
          <input type="range" min={0.5} max={1.1} step={0.05} value={st.speechRate} onChange={(e) => actions.updateSettings({ speechRate: Number(e.target.value) })} />
        </label>
        <button className="btn btn-secondary" onClick={() => speakPunjabi('ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਕੀ ਹਾਲ ਹੈ?', 'Sat Sri Akal, ki haal hai?')}>
          🔊 Test voice
        </button>
        <p className="muted small">Voice: {voiceInfo()}.</p>
        <label className="row">
          <span>Speaking exercises in lessons</span>
          <input type="checkbox" checked={st.speakInLessons} onChange={(e) => actions.updateSettings({ speakInLessons: e.target.checked })} />
        </label>
        <label className="row">
          <span>Speech checking listens in</span>
          <select value={st.recognitionLang} onChange={(e) => actions.updateSettings({ recognitionLang: e.target.value })}>
            <option value="pa-IN">Punjabi (best)</option>
            <option value="hi-IN">Hindi (if Punjabi isn't available)</option>
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
