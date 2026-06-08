import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const hasGeminiApiKey = Boolean(apiKey);

export const geminiClient = new GoogleGenAI({ apiKey });

export const geminiSetupMessage =
  'Set GEMINI_API_KEY in .env.local (from Google AI Studio) and restart npm run dev. ' +
  'Firebase auth/gallery uses the Google Cloud project in firebase-applet-config.json.';
