# Boli: learn Punjabi (and more Indian languages)

Free and open source (MIT). Everything you see is in English letters: no Gurmukhi or Devanagari.

A personal, Duolingo-style app for casual conversational Punjabi in romanized text.
Installable web app (iPhone, iPad, Mac, Windows), works offline after the first visit.

## Try it right now
Open `Boli.html` in Chrome or Safari. Everything is in that one file. Progress is saved in the browser.

## Run from source (Mac)
1. Install Node.js (https://nodejs.org, LTS version).
2. In Terminal, in this folder:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (e.g. http://localhost:5173). The "Network" address works on your iPhone on the same Wi-Fi.

`npm run build` makes a deployable site in `dist/`. Put it on any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
to get an https link; then on iPhone open it in Safari, Share → Add to Home Screen.

## Host on Cloudflare Pages (to use on your phone)
1. `npm run build` (or use the ready-made `boli-cloudflare.zip`).
2. dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets (Direct Upload).
3. Name the project (e.g. `boli`), upload the zip or the `dist` folder, Deploy. You get https://<name>.pages.dev.
4. To update later: open the project → Create new deployment → upload again.
   Or from Terminal: `npx wrangler pages deploy dist --project-name boli`.

## What's inside
- `src/languages/punjabi/course.ts`: all lessons (5 units, 12 lessons, 48 phrases). Each phrase has romanized text,
  English, accepted spelling variants, word breakdown, tips, and Gurmukhi (used for speech).
- `src/languages/marathi/course.ts`: placeholder. Fill it in the same format and set `available: true`.
- Hindi comparisons: each phrase has `hi` (Hindi sentence) and `hiWords` (words that differ). Lessons show each
  word pair once, with rotating wording, plus occasional pattern tips (`hiPatterns`). Phrasebook has a cheat sheet.
- `src/engine/listen.ts`: speech recognition + sound-based scoring. `src/engine/script.ts`: converts between English letters and
  Gurmukhi/Devanagari behind the scenes (only for the voice and the speech checker; never shown).
- `src/engine/`: exercise generator, answer checking (forgiving romanized spelling), progress/streaks, speech, translator.
- `src/components/`: screens (Learn, Lesson, Translate, Phrasebook, Settings).

## Speaking practice (Speak tab)
- Conversations: the app plays one side of a real chat (12 scenarios), you answer out loud and get a score.
- Repeat after me: listen, then say it. Each word is marked green (right), amber (close) or red (missed).
- Lessons include a couple of "Say this out loud" exercises (can be turned off in Settings).
- Uses the browser's built-in, free speech recognition (Chrome, Edge, Safari). It listens in Punjabi (falls back to Hindi),
  turns what it heard into English letters, and compares sounds, not spelling. English words mixed in ("busy", "call") are fine.
- Needs https (Cloudflare Pages is fine) and microphone permission. Speech recognition in Chrome needs internet.

## Handbook
`src/languages/punjabi/handbook.ts`: 21 sections, 500+ English | Hindi | Punjabi rows, grammar notes, slang, a Punjabi + English
mixing guide, verb tenses, self-practice. Conversations are in `dialogues.ts`. Every row can be heard and practised.

## Text to speech
1. Online Punjabi voice (Google Translate audio) when connected; can be switched off in Settings.
2. Offline: a Punjabi device voice if installed, otherwise a Hindi voice reading the phrase (sounds very close).
   On Mac: System Settings → Accessibility → Spoken Content → System voice → Manage Voices → add Hindi (Lekha) for better offline audio.

## Translator
English ↔ Punjabi. Shows romanized Punjabi plus Gurmukhi, with audio. Uses Google Translate's public endpoint
(needs internet), and also shows matching phrases from your lessons (works offline).
Romanization of translator output is generated automatically, so spelling may differ slightly from lessons.

## Desktop apps later
The same code can be wrapped with Tauri or Electron for native Mac/Windows apps. Installing the web app from Chrome/Edge
already gives a desktop app window today.
