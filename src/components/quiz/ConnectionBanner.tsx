import { useEffect, useState } from 'react';
import { WifiOff, Loader2 } from 'lucide-react';

interface ConnectionBannerProps {
  /** A Firestore szerint az adat csak helyi gyorsítótárból jön (nincs szerverkapcsolat) */
  fromCache: boolean;
}

/**
 * Látható jelzés, ha megszakadt a kapcsolat. Korábban ilyenkor az oldal egyszerűen
 * "befagyott" – a diák nem tudta, hogy nála van a hiba. A Firestore magától újracsatlakozik,
 * a beküldött válaszok sorba állnak és kapcsolat után elmennek.
 */
export const ConnectionBanner = ({ fromCache }: ConnectionBannerProps) => {
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const [showCacheWarning, setShowCacheWarning] = useState(false);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  // A gyorsítótárból jövő adatot csak akkor jelezzük, ha tartósan fennáll (ne villogjon induláskor)
  useEffect(() => {
    if (!fromCache) {
      setShowCacheWarning(false);
      return;
    }
    const t = setTimeout(() => setShowCacheWarning(true), 4000);
    return () => clearTimeout(t);
  }, [fromCache]);

  if (online && !showCacheWarning) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-amber-500 px-3 py-1.5 text-center text-sm font-semibold text-amber-950 shadow-md"
    >
      {online ? <Loader2 className="h-4 w-4 animate-spin" /> : <WifiOff className="h-4 w-4" />}
      <span>
        {online
          ? 'Gyenge kapcsolat – újracsatlakozás… A válaszod nem vész el.'
          : 'Nincs internetkapcsolat – a válaszod elküldjük, amint visszajön a hálózat.'}
      </span>
    </div>
  );
};
