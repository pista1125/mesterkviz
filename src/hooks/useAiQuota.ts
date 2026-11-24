import { useCallback, useEffect, useState } from 'react';
import { getMyAiQuota, type MyAiQuota, type QuotaInfo } from '@/services/ai';

/** A bejelentkezett tanár havi AI-kerete (és hogy admin-e). */
export function useAiQuota(enabled: boolean) {
  const [quota, setQuota] = useState<MyAiQuota | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      setQuota(await getMyAiQuota());
    } catch (e) {
      // Nem kritikus: ha nem sikerül lekérni, a generálásnál úgyis a szerver dönt.
      console.warn('getAiQuota failed:', e);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Generálás után a szerver válaszából frissít, külön hívás nélkül. */
  const applyQuota = useCallback((q: QuotaInfo | undefined) => {
    if (!q) return;
    setQuota((prev) => (prev ? { ...prev, ...q } : prev));
  }, []);

  const markExhausted = useCallback(() => {
    setQuota((prev) => (prev ? { ...prev, used: prev.limit, remaining: 0 } : prev));
  }, []);

  return { quota, loading, refresh, applyQuota, markExhausted };
}
