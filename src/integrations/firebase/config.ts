import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const decode = (b64: string) => {
  try {
    return typeof atob !== 'undefined' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf8');
  } catch {
    return b64;
  }
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || decode('QUl6YVN5QmJLTkl6eF9qTVV3a1RLejd3ZWZ0VjgtVWx2TWtfN29Z'),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || decode('bWVzdGVya3Zpei1mNTJjZS5maXJlYmFzZWFwcC5jb20='),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || decode('bWVzdGVya3Zpei1mNTJjZQ=='),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || decode('bWVzdGVya3Zpei1mNTJjZS5maXJlYmFzZXN0b3JhZ2UuYXBw'),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || decode('OTkwNDA5NzY4MTc0'),
  appId: import.meta.env.VITE_FIREBASE_APP_ID || decode('MTo5OTA0MDk3NjgxNzQ6d2ViOmRjYTNmMzgwZGZmYzVkN2EwNTg3ZmY='),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || decode('Ry1XMjlYUUY5Q1A3'),
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west1');

export default app;
