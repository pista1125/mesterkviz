import { doc, setDoc, getDocFromServer, serverTimestamp, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/integrations/firebase/config';

/**
 * Szerveridő-szinkron.
 *
 * A telefonok órája eltérhet egymástól és a tanári gépétől. Ha minden eszköz a saját
 * órájával számolná a kérdés lejártát, mindenkinél máskor járna le. Ezért megmérjük,
 * mennyivel tér el a helyi óra a Firestore szerver órájától (offset), és a kérdés
 * indulási idejét (szerver-időbélyeg) ezzel számoljuk át helyi időre.
 *
 * Mérés: írunk egy serverTimestamp()-et a saját clock_sync/{uid} dokumentumba, majd
 * visszaolvassuk. A szerver az írás pillanatában (t0 és t1 között) bélyegzett, így
 * offset ≈ szerverIdő − (t0 + t1) / 2. Több mérésből a legkisebb körbejárási idejűt használjuk.
 */

let offsetMs = 0;
let synced = false;
let lastSyncAt = 0;
let inflight: Promise<void> | null = null;

export const getServerOffset = () => offsetMs;
export const isServerClockSynced = () => synced;
/** Becsült aktuális szerveridő (ms) */
export const serverNow = () => Date.now() + offsetMs;
/** Szerveridő (ms) → helyi idő (ms) */
export const serverToLocal = (serverMs: number) => serverMs - offsetMs;

const measureOnce = async (uid: string): Promise<{ offset: number; rtt: number } | null> => {
  const ref = doc(db, 'clock_sync', uid);
  const t0 = Date.now();
  await setDoc(ref, { t: serverTimestamp() });
  const t1 = Date.now();
  const snap = await getDocFromServer(ref);
  const t = snap.data()?.t;
  if (!(t instanceof Timestamp)) return null;
  return { offset: t.toMillis() - (t0 + t1) / 2, rtt: t1 - t0 };
};

export const syncServerClock = async (opts: { force?: boolean } = {}): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  // 5 percen belül nem mérünk újra (kivéve kényszerítve)
  if (!opts.force && synced && Date.now() - lastSyncAt < 5 * 60 * 1000) return;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      let best: { offset: number; rtt: number } | null = null;
      for (let i = 0; i < 3; i++) {
        const m = await measureOnce(uid);
        if (m && (!best || m.rtt < best.rtt)) best = m;
      }
      if (best) {
        offsetMs = Math.round(best.offset);
        synced = true;
        lastSyncAt = Date.now();
      }
    } catch (err) {
      console.warn('[ServerClock] Szinkronizálás sikertelen, helyi óra használata:', err);
    } finally {
      inflight = null;
    }
  })();
  return inflight;
};
