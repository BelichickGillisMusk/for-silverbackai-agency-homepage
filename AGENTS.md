# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single-page React app (Vite + React 19 + TypeScript) for **Silverback AI Agency** — a marketing portal and client-tools hub. There is no local backend; optional cloud deps are Google Gemini (AI features) and Firebase (AI Lab auth/persistence only).

### Services

| Service | Required locally? | Command |
|---------|-------------------|---------|
| Vite dev server | Yes | `npm run dev` (port **3000**, host `0.0.0.0`) |

No Docker, database, or docker-compose. `express` is listed in `package.json` but unused.

### Standard commands

See `README.md` and `package.json` scripts:

- **Install:** `npm install`
- **Dev:** `npm run dev` → http://localhost:3000
- **Lint:** `npm run lint` (TypeScript `tsc --noEmit` only — no unit/E2E test runner)
- **Build:** `npm run build`
- **Preview prod build:** `npm run preview`
- **Deploy:** `npm run deploy` (Cloudflare Workers via Wrangler; needs Cloudflare auth)

### Environment

- Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` for hero image generation and **AI Lab**. Without it, the rest of the SPA (navigation, mock dashboards, Hot Buttons, etc.) still works.
- `VITE_GEMINI_API_KEY` and `VITE_BASE_URL` in `.env.example` are not read by the app; `vite.config.ts` injects `process.env.GEMINI_API_KEY` from `GEMINI_API_KEY`.
- Firebase config is committed in `firebase-applet-config.json` (cloud-hosted; no extra env vars for local dev).

### Dev server notes

- Prefer a **tmux** session for `npm run dev` so the process stays attached across agent steps.
- `DISABLE_HMR=true` disables Vite HMR (used in AI Studio agent mode); leave unset for normal local dev.
- After `npm install`, restart the dev server if it was already running — dependency changes are not always picked up by a live Vite process.

### Scope for minimal E2E verification

Landing page → **Client Tools** hub → open a tool (e.g. Rent DMC, Hot Buttons). AI Lab and Gemini-powered flows need `GEMINI_API_KEY` and live Firebase.
