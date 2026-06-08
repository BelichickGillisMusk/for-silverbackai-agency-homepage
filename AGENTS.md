# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single React 19 + Vite 6 SPA for **Silverback AI Agency** (`silverbackai.agency`). One dev server serves all in-app views (landing, Client Tools showcase, Rent DMC, SMS Toolkit, Admin, Hot Buttons, Gilly Security, PC Investments, AI Lab).

### Services

| Service | Command | Port | Required? |
|---------|---------|------|-----------|
| Vite dev server | `npm run dev` | 3000 | Yes (only local process) |

No Docker, local database, or backend server. Production deploy uses Cloudflare Workers (`npm run deploy` / `wrangler deploy`).

### Standard commands

See `package.json` and `README.md`:

- Install: `npm install`
- Dev: `npm run dev` → http://localhost:3000
- Lint: `npm run lint` (`tsc --noEmit`)
- Build: `npm run build`
- Preview production build: `npm run preview`

### Local dev + Google Cloud

The app is a **local frontend** that calls **cloud backends**:

- **Gemini** (chat, images, TTS): `GEMINI_API_KEY` in `.env.local` or shell env. Get a key from https://aistudio.google.com/apikey
- **Firebase** (Google sign-in, Firestore gallery): `firebase-applet-config.json` → project `gen-lang-client-0013150741`, database `ai-studio-769bfd01-0ae2-425e-97c8-368ca9eebd15`

Run `npm run check:gcp` before testing AI Lab chat. It exits `1` without `GEMINI_API_KEY` — that is expected and does **not** block UI development or Firebase sign-in testing.

AI Lab path: http://localhost:3000 → Client Tools → AI Lab → Sign in with Google → **Ultra-Fast Chat**.

### Environment variables

- `GEMINI_API_KEY` — required for hero image generation and **AI Lab** (image/chat/TTS). Set in `.env.local` or export in shell (Vite also reads `process.env.GEMINI_API_KEY`). UI-only views work without it (hero falls back to Unsplash).
- `DISABLE_HMR=true` — disables Vite HMR (used in AI Studio agent mode); leave unset for normal local dev.

Firebase Auth on localhost requires `localhost` in Firebase Console → Authentication → Authorized domains (usually present by default).

### Non-obvious notes

- Deep link: `?appParams=intake` opens the SMS Toolkit intake view directly.
- `express` is listed in `package.json` but unused — no Express server to start.
- Shared Gemini client: `src/lib/gemini.ts`. Missing key shows a banner in AI Lab.
- `npm run check:gcp` — validates `.env.local` + Gemini API without starting the dev server.
