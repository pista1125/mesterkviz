import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/config';

/**
 * Kliens oldali hibanapló → Firestore `client_errors` gyűjtemény.
 *
 * Így kiderül, melyik eszközön / böngészőben mi romlik el (eddig a diák csak annyit
 * mondott, hogy "lefagyott"). Megtekintés: Firebase konzol → Firestore → client_errors.
 *
 * Védelem az elárasztás ellen: munkamenetenként legfeljebb 10 bejegyzés, és ugyanaz
 * az üzenet csak egyszer.
 */
const MAX_REPORTS_PER_SESSION = 10;
let sent = 0;
const seen = new Set<string>();
const APP_VERSION = import.meta.env.VITE_APP_VERSION || 'dev';

// Ártalmatlan, ismert zaj, amit nem érdemes naplózni
const IGNORED = [/ResizeObserver loop/i, /Script error\.?$/i, /Non-Error promise rejection captured/i];

export const reportClientError = (error: unknown, kind: string, extraStack?: string) => {
  try {
    if (sent >= MAX_REPORTS_PER_SESSION) return;
    const err = error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error));
    const message = `${err.name}: ${err.message}`.slice(0, 2000);
    if (IGNORED.some((re) => re.test(message))) return;
    const key = `${kind}|${message}`;
    if (seen.has(key)) return;
    seen.add(key);

    const uid = auth.currentUser?.uid;
    if (!uid) {
      // A szabályok bejelentkezést kérnek; bejelentkezés nélkül csak a konzolba írunk
      console.error('[ClientError]', kind, err);
      return;
    }
    sent++;
    const stack = `${err.stack || ''}${extraStack ? `\n--- component stack ---${extraStack}` : ''}`.slice(0, 8000);
    addDoc(collection(db, 'client_errors'), {
      message,
      stack,
      kind,
      url: window.location.href.slice(0, 500),
      route: window.location.hash.slice(0, 200),
      user_agent: navigator.userAgent.slice(0, 500),
      uid,
      created_at: new Date().toISOString(),
      app_version: APP_VERSION,
    }).catch(() => undefined);
  } catch {
    /* a hibanapló sosem okozhat újabb hibát */
  }
};

let installed = false;
export const installGlobalErrorHandlers = () => {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener('error', (e) => reportClientError(e.error || e.message, 'window-error'));
  window.addEventListener('unhandledrejection', (e) => reportClientError(e.reason, 'unhandled-rejection'));
};
