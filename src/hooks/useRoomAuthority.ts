import { useEffect, useMemo, useRef } from 'react';
import type { Room, RoomParticipant, QuizAnswer } from '@/types/quiz';
import { updateRoom } from '@/services/db';
import { serverNow } from '@/lib/serverClock';
import { PRESENCE_TIMEOUT_MS, useNow } from '@/lib/questionTimer';

/**
 * A tanári gép (Vezérlő / Kivetítő) a "hiteles forrás" arra, hogy hány diák válaszolt,
 * és mikor válaszolt mindenki. Az eredményt beírja a szoba dokumentumba, így a diákok
 * telefonjainak NEM kell az egész osztály összes válaszát és résztvevőjét figyelniük
 * (ez okozott sok fölösleges újrarajzolást és adatforgalmat a gyenge telefonokon).
 *
 * Online diák: aki az utóbbi ~70 mp-ben jelzett (szívverés), vagy már válaszolt erre a kérdésre.
 * Így egy elalvó / kilépett telefon nem tartja fel az egész osztályt.
 */
export const useRoomAuthority = (
  room: Room | null,
  participants: RoomParticipant[],
  answers: QuizAnswer[],
  enabled: boolean
) => {
  const now = useNow(5000, enabled);

  const stats = useMemo(() => {
    const active = participants.filter((p) => p.is_active);
    if (!room) return { active, online: active, answered: 0, total: 0, allAnswered: false };

    const qIdx = room.current_question_index;
    const session = room.session_number || 1;
    const answeredIds = new Set(
      answers
        .filter((a) => a.question_index === qIdx && (a.session_number || 1) === session)
        .map((a) => a.participant_id)
    );

    const sNow = serverNow();
    const online = active.filter((p) => {
      if (answeredIds.has(p.id)) return true;
      if (p.last_seen_ms == null) return true; // régi kliens, nincs szívverés → aktívnak vesszük
      return sNow - p.last_seen_ms < PRESENCE_TIMEOUT_MS;
    });

    const answered = active.filter((p) => answeredIds.has(p.id)).length;
    const total = Math.max(online.length, answered);
    return { active, online, answered, total, allAnswered: total > 0 && answered >= total };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, participants, answers, now]);

  // Összesítők beírása a szobába (csak ha változott, kis késleltetéssel összevonva)
  const lastWritten = useRef<string>('');
  useEffect(() => {
    if (!enabled || !room) return;

    const updates: Partial<Room> = { participant_count: stats.active.length };
    // Tengeralattjáró módban mindenki a saját tempójában halad → nincs közös kérdés-összesítő
    if (room.status === 'active' && room.game_mode !== 'submarine') {
      updates.answer_stats = {
        question_index: room.current_question_index,
        session_number: room.session_number || 1,
        answered: stats.answered,
        total: stats.total,
      };
      if (stats.allAnswered && room.all_answered_index !== room.current_question_index) {
        updates.all_answered_index = room.current_question_index;
      }
    }

    const cur = room.answer_stats;
    const next = updates.answer_stats;
    const statsChanged = !!next && (
      !cur ||
      cur.question_index !== next.question_index ||
      cur.session_number !== next.session_number ||
      cur.answered !== next.answered ||
      cur.total !== next.total
    );
    const countChanged = room.participant_count !== updates.participant_count;
    if (!statsChanged && !countChanged && updates.all_answered_index === undefined) return;

    const key = JSON.stringify(updates);
    if (key === lastWritten.current) return;

    const t = setTimeout(() => {
      lastWritten.current = key;
      updateRoom(room.id, updates).catch((err) => {
        lastWritten.current = '';
        console.error('[RoomAuthority] Összesítő írása sikertelen:', err);
      });
    }, 400);
    return () => clearTimeout(t);
  }, [enabled, room, stats]);

  return stats;
};
