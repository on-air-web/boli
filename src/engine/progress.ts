import { useEffect, useState } from 'react';

export interface PhraseStat { seen: number; right: number; wrong: number; last: number }
export interface LangProgress { completed: Record<string, number>; phrases: Record<string, PhraseStat> }
export interface Settings { sound: boolean; autoplay: boolean; speechRate: number; onlineVoice: boolean; dailyGoal: number; recognitionLang: string; speakInLessons: boolean }
export interface AppState {
  language: string;
  xp: number;
  streak: number;
  lastDay: string | null;
  xpByDay: Record<string, number>;
  langs: Record<string, LangProgress>;
  settings: Settings;
}

const KEY = 'boli-state-v1';
const defaults: AppState = {
  language: 'pa',
  xp: 0,
  streak: 0,
  lastDay: null,
  xpByDay: {},
  langs: {},
  settings: { sound: true, autoplay: true, speechRate: 0.85, onlineVoice: true, dailyGoal: 30, recognitionLang: 'pa-IN', speakInLessons: true },
};

export const today = () => new Date().toLocaleDateString('en-CA');
const yesterday = () => new Date(Date.now() - 864e5).toLocaleDateString('en-CA');

export function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const s = JSON.parse(raw) as AppState;
    const merged = { ...defaults, ...s, settings: { ...defaults.settings, ...s.settings } };
    // Streak breaks if you missed a day.
    if (merged.lastDay && merged.lastDay !== today() && merged.lastDay !== yesterday()) merged.streak = 0;
    return merged;
  } catch {
    return defaults;
  }
}

let state = load();
const listeners = new Set<() => void>();
function set(next: AppState) {
  state = next;
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}
export const getState = () => state;

export function useAppState(): AppState {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);
  return state;
}

function lang(s: AppState, id: string): LangProgress {
  return s.langs[id] ?? { completed: {}, phrases: {} };
}

export const actions = {
  setLanguage(id: string) {
    set({ ...state, language: id });
  },
  updateSettings(patch: Partial<Settings>) {
    set({ ...state, settings: { ...state.settings, ...patch } });
  },
  recordAnswer(langId: string, phraseId: string, correct: boolean) {
    const lp = lang(state, langId);
    const st = lp.phrases[phraseId] ?? { seen: 0, right: 0, wrong: 0, last: 0 };
    const next = { ...st, seen: st.seen + 1, right: st.right + (correct ? 1 : 0), wrong: st.wrong + (correct ? 0 : 1), last: Date.now() };
    set({ ...state, langs: { ...state.langs, [langId]: { ...lp, phrases: { ...lp.phrases, [phraseId]: next } } } });
  },
  finishSession(langId: string, lessonId: string | null, xp: number) {
    const lp = lang(state, langId);
    const d = today();
    const streak = state.lastDay === d ? state.streak : state.lastDay === yesterday() ? state.streak + 1 : 1;
    const completed = lessonId ? { ...lp.completed, [lessonId]: (lp.completed[lessonId] ?? 0) + 1 } : lp.completed;
    set({
      ...state,
      xp: state.xp + xp,
      streak,
      lastDay: d,
      xpByDay: { ...state.xpByDay, [d]: (state.xpByDay[d] ?? 0) + xp },
      langs: { ...state.langs, [langId]: { ...lp, completed } },
    });
  },
  reset() {
    set({ ...defaults, settings: state.settings });
  },
};

export function langProgress(id: string): LangProgress {
  return lang(state, id);
}
