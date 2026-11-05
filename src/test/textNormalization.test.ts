import { describe, it, expect } from 'vitest';
import { normalizeText, isNormalizedMatch } from '@/lib/textNormalization';

describe('textNormalization', () => {
  it('normalizes spaces and casing', () => {
    expect(normalizeText('  20 dm  ')).toBe('20dm');
    expect(normalizeText('20dm')).toBe('20dm');
    expect(normalizeText('Budapest')).toBe('budapest');
  });

  it('removes Hungarian accents', () => {
    expect(normalizeText('Árvíztűrő tükörfúrógép')).toBe('arvizturotukorfurogep');
    expect(normalizeText('árvíztűrő')).toBe('arvizturo');
    expect(normalizeText('Őrült űrhajós')).toBe('orulturhajos');
  });

  it('normalizes decimal numbers with comma or dot', () => {
    expect(normalizeText('2,5 kg')).toBe('2.5kg');
    expect(normalizeText('2.5 kg')).toBe('2.5kg');
  });

  it('matches equivalent normalized answers', () => {
    expect(isNormalizedMatch('20 dm', '20dm')).toBe(true);
    expect(isNormalizedMatch(' 20dm. ', '20 dm')).toBe(true);
    expect(isNormalizedMatch('Petőfi Sándor', 'petofi sandor')).toBe(true);
    expect(isNormalizedMatch('2,5m', '2.5 m')).toBe(true);
  });

  it('supports slash and semicolon separated alternatives', () => {
    expect(isNormalizedMatch('autó', 'autó / gépkocsi')).toBe(true);
    expect(isNormalizedMatch('gepkocsi', 'autó / gépkocsi')).toBe(true);
    expect(isNormalizedMatch('2m', '20dm; 2m; 200cm')).toBe(true);
  });

  it('returns false for semantically different answers that require AI', () => {
    expect(isNormalizedMatch('kocsi', 'autó')).toBe(false);
    expect(isNormalizedMatch('kutya', 'macska')).toBe(false);
  });
});

