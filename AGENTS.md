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

### Environment variables

- `GEMINI_API_KEY` — required for hero image generation and **AI Lab** (image/chat/TTS). Set in `.env.local`. Most UI-only views work without it (hero falls back to Unsplash).
- `DISABLE_HMR=true` — disables Vite HMR (used in AI Studio agent mode); leave unset for normal local dev.

Firebase config is committed in `firebase-applet-config.json`; AI Lab auth/gallery needs internet access to Firebase.

### Non-obvious notes

- Deep link: `?appParams=intake` opens the SMS Toolkit intake view directly.
- `express` is listed in `package.json` but unused — no Express server to start.
- `.env.example` lists `VITE_GEMINI_API_KEY`; the app reads `GEMINI_API_KEY` via `vite.config.ts` `define`, not `VITE_` prefix.
