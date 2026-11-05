export const getJoinUrl = (code: string): string => {
  if (typeof window === 'undefined') return `/#/join/${code}`;
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/$/, '');
  return `${origin}${pathname}#/join/${code}`;
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

