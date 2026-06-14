# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single Vite + React 19 + TypeScript SPA ("Silverback AI Agency" marketing/portal site) generated from Google AI Studio. It is deployed to Cloudflare Workers, but there is **no local backend server** to run (the `express`, `tsx`, and `dotenv` deps are declared but unused — all Gemini/Firebase calls happen client-side).

### Services / commands
Scripts live in `package.json`:
- Dev server: `npm run dev` — Vite on port `3000`, bound to `0.0.0.0`. This is the product; just open `http://localhost:3000/`.
- Lint/typecheck: `npm run lint` — runs `tsc --noEmit` (no ESLint/Prettier configured).
- Build: `npm run build` — outputs to `dist/`. A CSS `@import must precede...` warning and a >500 kB chunk-size warning are expected and harmless.
- Preview built bundle: `npm run preview` (default port 4173).
- `npm run deploy` is Cloudflare/`wrangler`-only — not needed for local dev/testing.

### Non-obvious caveats
- **No automated tests exist** — there is no test runner or `test` script. Verify changes via `npm run lint`, `npm run build`, and manual UI testing.
- **Env:** copy `.env.example` to `.env.local`. Only `GEMINI_API_KEY` is wired into the build (via Vite `define` in `vite.config.ts`); `VITE_BASE_URL` / `VITE_GEMINI_API_KEY` are declared but unused. The app loads fine **without** a Gemini key — the hero image falls back to a static image, but AI-Lab generation/chat features will error/fail without it. `GEMINI_API_KEY` is bundled into client JS (exposed in the browser).
- **Firebase** (Auth + Firestore) config is hardcoded in `firebase-applet-config.json` (no env needed). It's a live cloud service used only by the **AI Lab** view (Google sign-in + saving generations); there is no local emulator. The marketing site, intake form, and other views work without it.
- The intake/contact form submits via a `mailto:` link (opens the OS mail client) rather than a backend API.
- `vite.config.ts` gates HMR on `DISABLE_HMR` (set `DISABLE_HMR=true` to disable file watching); leave it unset for normal hot reload.
