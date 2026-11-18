import { describe, it, expect, vi, beforeEach } from 'vitest';

// A Firebase-t nem inicializáljuk a tesztben
vi.mock('@/integrations/firebase/config', () => ({ db: {}, auth: { currentUser: null } }));

import { answerDocId, participantDocId } from '@/services/db';
import { getQuestionStartLocal } from '@/lib/questionTimer';
import * as serverClock from '@/lib/serverClock';
import { getAnswerColor, ANSWER_COLORS } from '@/types/quiz';
import type { Room } from '@/types/quiz';

describe('Determinisztikus azonosítók (a Firestore-szabályokkal egyeznie kell!)', () => {
  it('résztvevő: szoba_uid', () => {
    expect(participantDocId('ROOM1', 'uidABC')).toBe('ROOM1_uidABC');
  });

  it('válasz: szoba_s{munkamenet}_{résztvevő}_q{kérdés}', () => {
    expect(
      answerDocId({ room_id: 'ROOM1', session_number: 2, participant_id: 'ROOM1_uidABC', question_index: 7 })
    ).toBe('ROOM1_s2_ROOM1_uidABC_q7');
  });

  it('válasz: hiányzó munkamenet = 1', () => {
    expect(
      answerDocId({ room_id: 'R', session_number: undefined as unknown as number, participant_id: 'P', question_index: 0 })
    ).toBe('R_s1_P_q0');
  });
});

describe('Szerveridőhöz kötött kérdésindulás', () => {
  const baseRoom = { question_started_at_ms: 1_000_000, question_start_delay_ms: 0 } as Room;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('szinkron nélkül nincs szerveres indulás (helyi tartalék)', () => {
    vi.spyOn(serverClock, 'isServerClockSynced').mockReturnValue(false);
    expect(getQuestionStartLocal(baseRoom)).toBeNull();
  });

  it('a szerveridőt helyi időre számolja át (offset + visszaszámlálás)', () => {
    vi.spyOn(serverClock, 'isServerClockSynced').mockReturnValue(true);
    // a helyi óra 5 mp-cel siet a szerverhez képest → offset = -5000
    vi.spyOn(serverClock, 'serverToLocal').mockImplementation((ms) => ms + 5000);
    vi.spyOn(Date, 'now').mockReturnValue(1_010_000);
    const room = { ...baseRoom, question_start_delay_ms: 4000 } as Room;
    expect(getQuestionStartLocal(room)).toBe(1_000_000 + 4000 + 5000);
  });

  it('gyanúsan jövőbeli indulásnál helyi időzítésre vált', () => {
    vi.spyOn(serverClock, 'isServerClockSynced').mockReturnValue(true);
    vi.spyOn(serverClock, 'serverToLocal').mockImplementation((ms) => ms);
    vi.spyOn(Date, 'now').mockReturnValue(0);
    expect(getQuestionStartLocal(baseRoom)).toBeNull();
  });
});

describe('Válaszszínek', () => {
  it('a diagram és a gombok ugyanazt a palettát használják', () => {
    const q = { type: 'multiple-choice' as const };
    ANSWER_COLORS.forEach((c, i) => {
      expect(getAnswerColor(q, { text: 'x' }, i).fill).toBe(c.fill);
      expect(getAnswerColor(q, { text: 'x' }, i).bg).toBe(c.bg);
    });
  });

  it('Igaz = kék, Hamis = piros a sorrendtől függetlenül', () => {
    const q = { type: 'true-false' as const };
    expect(getAnswerColor(q, { text: 'Hamis' }, 0).bg).toBe('bg-quiz-red');
    expect(getAnswerColor(q, { text: 'Igaz' }, 1).bg).toBe('bg-quiz-blue');
  });
});
