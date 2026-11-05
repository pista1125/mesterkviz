/**
 * Hungarian diacritic mapping dictionary for reliable accent removal
 */
const ACCENT_MAP: Record<string, string> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ö: 'o',
  ő: 'o',
  ú: 'u',
  ü: 'u',
  ű: 'u',
};

/**
 * Normalizes text for comparison:
 * 1. Lowercases the string
 * 2. Standardizes decimal separators (e.g. 2,5 -> 2.5)
 * 3. Removes Hungarian and standard accents/diacritics
 * 4. Removes leading and trailing punctuation
 * 5. Removes all whitespace (so "20 dm" === "20dm")
 */
export const normalizeText = (text: string | null | undefined): string => {
  if (!text) return '';

  let normalized = text.toLowerCase().trim();

  // Normalize decimal separators between digits: "2,5" -> "2.5"
  normalized = normalized.replace(/(\d),(\d)/g, '$1.$2');

  // Replace Hungarian accents explicitly
  normalized = normalized.replace(/[áéíóöőúüű]/g, (char) => ACCENT_MAP[char] || char);

  // Standard NFD accent stripping for any other accented chars
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Strip leading and trailing punctuation marks
  normalized = normalized.replace(/^[\s.,!?;:()[\]{}"'„”«»]+|[\s.,!?;:()[\]{}"'„”«»]+$/g, '');

  // Remove all whitespace characters
  normalized = normalized.replace(/\s+/g, '');

  return normalized;
};

/**
 * Checks whether the student's answer matches the correct answer
 * on Level 1 (local normalization).
 * Also supports multi-alternative correct answers separated by "/" or ";"
 * (e.g. "20dm / 2m" or "autó; gépkocsi").
 */
export const isNormalizedMatch = (
  studentAnswer: string | null | undefined,
  correctAnswer: string | null | undefined
): boolean => {
  if (!studentAnswer || !correctAnswer) return false;

  const normStudent = normalizeText(studentAnswer);
  if (!normStudent) return false;

  const normCorrect = normalizeText(correctAnswer);
  if (normStudent === normCorrect) return true;

  // Check possible slash/semicolon-separated teacher alternatives
  if (correctAnswer.includes('/') || correctAnswer.includes(';')) {
    const alternatives = correctAnswer
      .split(/[/;]/)
      .map((part) => normalizeText(part))
      .filter(Boolean);

    if (alternatives.includes(normStudent)) {
      return true;
    }
  }

  return false;
};

