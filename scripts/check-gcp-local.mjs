import { readFileSync, existsSync } from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });
config({ path: '.env' });

const geminiApiKey = process.env.GEMINI_API_KEY || '';
const firebaseConfig = JSON.parse(
  readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf8'),
);

let ok = true;

console.log('Silverback local + Google Cloud check\n');

console.log('Firebase (Google Cloud):');
console.log(`  projectId: ${firebaseConfig.projectId}`);
console.log(`  firestoreDatabaseId: ${firebaseConfig.firestoreDatabaseId}`);
console.log(`  authDomain: ${firebaseConfig.authDomain}`);

if (!existsSync('.env.local')) {
  console.log('\n.env.local: missing (create from .env.example)');
  ok = false;
} else {
  console.log('\n.env.local: present');
}

if (!geminiApiKey) {
  console.log('GEMINI_API_KEY: missing — AI Lab chat/image/TTS will not work locally');
  ok = false;
} else {
  console.log('GEMINI_API_KEY: set');
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Reply with exactly: ok' }] }],
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      console.log(`Gemini API test: failed (${res.status}) ${body.slice(0, 200)}`);
      ok = false;
    } else {
      console.log('Gemini API test: ok');
    }
  } catch (error) {
    console.log(`Gemini API test: error — ${error}`);
    ok = false;
  }
}

console.log(`\nLocal dev URL: http://localhost:3000`);
console.log(`AI Lab: Client Tools → AI Lab (Google sign-in + Gemini)`);

process.exit(ok ? 0 : 1);
