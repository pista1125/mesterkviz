import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/integrations/firebase/config';

/**
 * Diák-azonosítás névtelen (anonymous) Firebase bejelentkezéssel.
 *
 * Miért? A Firebase a bejelentkezést az IndexedDB-ben tárolja, így az azonosító
 * megmarad oldalfrissítés, bezárt fül, telefon-alvás vagy QR-kód újraszkennelése után is.
 * Ugyanaz a diák ugyanazzal a résztvevő-dokumentummal tér vissza (nincs duplikált résztvevő),
 * és a Firestore-szabályok ellenőrizni tudják, hogy mindenki csak a saját adatát írja.
 *
 * Ha a tanár be van jelentkezve ugyanabban a böngészőben, az ő azonosítóját használjuk.
 */

const FALLBACK_KEY = 'kvizmester_device_id';
let pending: Promise<string> | null = null;

const getFallbackDeviceId = (): string => {
  try {
    let id = localStorage.getItem(FALLBACK_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(FALLBACK_KEY, id);
    }
    return `dev-${id}`;
  } catch {
    return `dev-${crypto.randomUUID()}`;
  }
};

export const ensureStudentIdentity = (): Promise<string> => {
  if (!pending) {
    pending = (async () => {
      await auth.authStateReady();
      if (auth.currentUser) return auth.currentUser.uid;
      try {
        const cred = await signInAnonymously(auth);
        return cred.user.uid;
      } catch (err) {
        // Pl. ha a Firebase konzolban még nincs bekapcsolva az Anonymous szolgáltató.
        // Átmeneti tartalék: eszközhöz kötött azonosító (a szigorú szabályokkal már nem fog működni).
        console.error('[Auth] Névtelen bejelentkezés sikertelen, tartalék azonosító használata:', err);
        return getFallbackDeviceId();
      }
    })();
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
};
