import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBbKNIzx_jMUwkTKz7weftV8-UlvMk_7oY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mesterkviz-f52ce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mesterkviz-f52ce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mesterkviz-f52ce.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "990409768174",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:990409768174:web:dca3f380dffc5d7a0587ff",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W29XQF9CP7",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1');

export default app;
