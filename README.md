<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/769bfd01-0ae2-425e-97c8-368ca9eebd15

## Run Locally

**Prerequisites:** Node.js

This app runs **locally** (Vite on port 3000) but talks to **Google Cloud** for AI and auth:

| Service | Where it runs | Config |
|---------|---------------|--------|
| React UI | Local (`npm run dev`) | — |
| Gemini chat / images / TTS | Google AI (cloud API) | `GEMINI_API_KEY` in `.env.local` |
| Sign-in + generation gallery | Firebase on GCP | `firebase-applet-config.json` |

1. Install dependencies: `npm install`
2. Copy env template: `cp .env.example .env.local`
3. Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) to `.env.local`
4. Verify Google Cloud connectivity: `npm run check:gcp`
5. Run the app: `npm run dev` → http://localhost:3000

**AI Lab (chat):** Client Tools → AI Lab → Sign in with Google → Ultra-Fast Chat tab.

Firebase Auth on `localhost` uses the project in `firebase-applet-config.json`. Ensure `localhost` is listed under Firebase Console → Authentication → Settings → Authorized domains.
