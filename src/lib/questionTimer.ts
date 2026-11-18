import { useEffect, useState } from 'react';
import type { Room } from '@/types/quiz';
import { isServerClockSynced, serverToLocal } from '@/lib/serverClock';

/**
 * Az aktuális kérdés indulási ideje HELYI időben (ms), a szerver-időbélyeg alapján.
 * null, ha nincs szerveres indulási idő (régi szoba) vagy az óra még nincs szinkronizálva
 * – ilyenkor a hívó a saját helyi indulási idejét használja.
 */
export const getQuestionStartLocal = (room: Room | null | undefined): number | null => {
  if (!room?.question_started_at_ms) return null;
  if (!isServerClockSynced()) return null;
  const local = serverToLocal(room.question_started_at_ms + (room.question_start_delay_ms || 0));
  // Józansági ellenőrzés: ha a számolt indulás a jövőben van 10 mp-nél jobban, valami
  // nincs rendben az órákkal → inkább helyi időzítés.
  if (local > Date.now() + (room.question_start_delay_ms || 0) + 10000) return null;
  return local;
};

/** Rendszeresen frissülő "most" érték (ms). */
export const useNow = (intervalMs: number, active: boolean): number => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    // Visszatéréskor (telefon feloldása) azonnal frissítünk
    const onVis = () => {
      if (document.visibilityState === 'visible') setNow(Date.now());
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [intervalMs, active]);
  return now;
};

/** Online-nak tekintjük a diákot, ha ennyi időn belül jelzett (szívverés 25 mp-enként). */
export const PRESENCE_TIMEOUT_MS = 70000;
export const HEARTBEAT_INTERVAL_MS = 25000;
