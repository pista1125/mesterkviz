import { describe, it, expect } from 'vitest';
import { extractRoomCodeFromText, getJoinUrl } from '@/lib/qrUtils';

describe('QR Utilities', () => {
  it('extracts room code from full hash URL', () => {
    expect(extractRoomCodeFromText('http://localhost:8080/#/join/164536')).toBe('164536');
    expect(extractRoomCodeFromText('https://mesterkviz.web.app/#/join/654321')).toBe('654321');
  });

  it('extracts room code from query parameters', () => {
    expect(extractRoomCodeFromText('https://mesterkviz.web.app/#/join?code=123456')).toBe('123456');
    expect(extractRoomCodeFromText('http://localhost:8080/join?code=987654')).toBe('987654');
  });

  it('extracts standalone 6-digit room code', () => {
    expect(extractRoomCodeFromText('164536')).toBe('164536');
    expect(extractRoomCodeFromText('Csatlakozz: 164536 koddal')).toBe('164536');
  });

  it('returns null for invalid inputs', () => {
    expect(extractRoomCodeFromText('')).toBeNull();
    expect(extractRoomCodeFromText('abc')).toBeNull();
    expect(extractRoomCodeFromText('12345')).toBeNull();
  });

  it('generates join url containing the code', () => {
    const url = getJoinUrl('164536');
    expect(url).toContain('#/join/164536');
  });
});

