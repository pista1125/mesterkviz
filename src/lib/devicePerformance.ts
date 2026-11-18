/**
 * Gyenge eszköz felismerése. Olcsó androidos telefonokon a nagy elmosás (blur),
 * az áttetsző háttérelmosás (backdrop-filter) és a sok egyidejű animáció akadozást,
 * "lefagyást" okoz. Ilyenkor egyszerűsített megjelenítést használunk.
 *
 * Kézi kapcsoló: ?lite=1 (bekapcsol) vagy ?lite=0 (kikapcsol) az URL-ben – megjegyzi.
 */
const STORAGE_KEY = 'kvizmester_lite_mode';

const readOverride = (): boolean | null => {
  try {
    const search = window.location.search || window.location.hash.split('?')[1] || '';
    const v = new URLSearchParams(search).get('lite');
    if (v === '1' || v === '0') {
      localStorage.setItem(STORAGE_KEY, v);
      return v === '1';
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === '1' || stored === '0') return stored === '1';
  } catch {
    /* localStorage tiltva */
  }
  return null;
};

export const detectLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const override = readOverride();
  if (override !== null) return override;

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 3) return true;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return true;
  return false;
};

export const IS_LOW_END_DEVICE = detectLowEndDevice();

if (IS_LOW_END_DEVICE && typeof document !== 'undefined') {
  document.documentElement.classList.add('low-end');
}
