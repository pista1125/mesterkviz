declare const __DEV_NETWORK_IP__: string | null;

export interface JoinUrlOptions {
  customBaseUrl?: string;
  preferProduction?: boolean;
}

export const isLocalhost = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const getLocalDevIp = (): string | null => {
  return typeof __DEV_NETWORK_IP__ !== 'undefined' ? __DEV_NETWORK_IP__ : null;
};

export const getProductionJoinUrl = (code: string): string | null => {
  const firebaseProjectId = import.meta.env?.VITE_FIREBASE_PROJECT_ID;
  if (!firebaseProjectId) return null;
  return `https://${firebaseProjectId}.web.app/#/join/${code}?code=${code}`;
};

export const getJoinUrl = (code: string, options?: JoinUrlOptions): string => {
  if (options?.customBaseUrl) {
    const cleanBase = options.customBaseUrl.replace(/\/+$/, '');
    return `${cleanBase}/#/join/${code}?code=${code}`;
  }

  if (options?.preferProduction) {
    const prod = getProductionJoinUrl(code);
    if (prod) return prod;
  }

  if (typeof window === 'undefined') {
    return `/#/join/${code}?code=${code}`;
  }

  let origin = window.location.origin;
  const port = window.location.port ? `:${window.location.port}` : '';
  const devIp = getLocalDevIp();

  // In local development on localhost, substitute the machine's local Wi-Fi / LAN IP
  // so phone cameras (iOS / Android) recognize the link and can navigate over the local network.
  if (isLocalhost() && devIp) {
    origin = `${window.location.protocol}//${devIp}${port}`;
  }

  // Ensure strict RFC 3986 URI format with trailing slash before hash (e.g. http://10.134.67.50:8080/#/join/123456?code=123456)
  // This guarantees mobile phone cameras recognize it as a clickable web URL (TYPE_URL) rather than raw text.
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const basePath = pathname ? `${pathname}/` : '/';

  return `${origin}${basePath}#/join/${code}?code=${code}`;
};

export const extractRoomCodeFromText = (text: string): string | null => {
  if (!text) return null;
  const clean = text.trim();

  // Pattern 1: /join/123456
  const joinPathMatch = clean.match(/\/join\/(\d{6})/i);
  if (joinPathMatch?.[1]) return joinPathMatch[1];

  // Pattern 2: code=123456
  const queryMatch = clean.match(/[?&]code=(\d{6})/i);
  if (queryMatch?.[1]) return queryMatch[1];

  // Pattern 3: Standalone 6-digit number
  const directMatch = clean.match(/\b(\d{6})\b/);
  if (directMatch?.[1]) return directMatch[1];

  return null;
};
