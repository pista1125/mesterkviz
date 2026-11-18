import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  Timestamp,
  type DocumentSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import type { Quiz, Room, RoomParticipant, QuizAnswer } from '@/types/quiz';

// Hibakezelő a valós idejű figyelőkhöz. Hiba esetén a Firestore leállítja a figyelőt;
// így legalább látszik a konzolban / a hibanaplóban, miért nem jön több frissítés.
const logSnapshotError = (label: string) => (error: Error) => {
  console.error(`[Firestore] ${label} figyelő hiba:`, error);
};

const tsToMillis = (v: unknown): number | null => (v instanceof Timestamp ? v.toMillis() : null);

/** A kérdés-visszaszámlálás hossza a kvíz indulásakor (3-2-1-RAJT!) */
export const START_COUNTDOWN_MS = 4000;

// ----------------------------------------------------
// QUIZZES
// ----------------------------------------------------
export const getQuizById = async (quizId: string): Promise<Quiz | null> => {
  const docRef = doc(db, 'quizzes', quizId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Quiz;
};

export const getTeacherQuizzes = async (teacherId: string): Promise<Quiz[]> => {
  const q = query(
    collection(db, 'quizzes'),
    where('teacher_id', '==', teacherId)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz));
  return items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
};

export const getPublishedQuizzes = async (): Promise<Quiz[]> => {
  const q = query(
    collection(db, 'quizzes'),
    where('is_published', '==', true)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz));
  return items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
};

export const getAllTopicsByGrade = async (): Promise<Record<string, string[]>> => {
  try {
    const snap = await getDocs(collection(db, 'quizzes'));
    const gradeTopicsMap: Record<string, Set<string>> = {};
    snap.docs.forEach((d) => {
      const data = d.data();
      const grade = data.grade_level;
      const topic = data.topic;
      if (grade && typeof grade === 'string' && topic && typeof topic === 'string') {
        const trimmed = topic.trim();
        if (trimmed && trimmed !== 'Általános / Nincs témakör') {
          if (!gradeTopicsMap[grade]) {
            gradeTopicsMap[grade] = new Set();
          }
          gradeTopicsMap[grade].add(trimmed);
        }
      }
    });
    const result: Record<string, string[]> = {};
    for (const [grade, set] of Object.entries(gradeTopicsMap)) {
      result[grade] = Array.from(set).sort((a, b) =>
        a.localeCompare(b, 'hu', { numeric: true, sensitivity: 'base' })
      );
    }
    return result;
  } catch (err) {
    console.error('Error fetching topics by grade:', err);
    return {};
  }
};

export const saveQuiz = async (quizData: Partial<Quiz> & { id?: string }): Promise<string> => {
  const now = new Date().toISOString();
  if (quizData.id) {
    const docRef = doc(db, 'quizzes', quizData.id);
    await setDoc(docRef, { ...quizData, updated_at: now }, { merge: true });
    return quizData.id;
  } else {
    const docRef = doc(collection(db, 'quizzes'));
    await setDoc(docRef, {
      ...quizData,
      id: docRef.id,
      created_at: now,
      updated_at: now,
    });
    return docRef.id;
  }
};

export const deleteQuiz = async (quizId: string): Promise<void> => {
  await deleteDoc(doc(db, 'quizzes', quizId));
};

// ----------------------------------------------------
// ROOMS
// ----------------------------------------------------
const toRoom = (snap: DocumentSnapshot): Room => {
  // 'estimate': a tanár saját, még el nem küldött serverTimestamp() írása is kapjon értéket
  const data = snap.data({ serverTimestamps: 'estimate' }) || {};
  return {
    id: snap.id,
    ...data,
    question_started_at_ms: tsToMillis(data.question_started_at),
  } as Room;
};

export const getRoomById = async (roomId: string): Promise<Room | null> => {
  const docRef = doc(db, 'rooms', roomId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return toRoom(snap);
};

export const findActiveRoomByCode = async (code: string): Promise<Room | null> => {
  const q = query(
    collection(db, 'rooms'),
    where('code', '==', code.trim()),
    where('status', 'in', ['waiting', 'active']),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return toRoom(snap.docs[0]);
};

export const getTeacherRooms = async (teacherId: string): Promise<Room[]> => {
  const q = query(
    collection(db, 'rooms'),
    where('teacher_id', '==', teacherId)
  );
  const snap = await getDocs(q);
  return snap.docs.map(toRoom);
};

export const createRoom = async (roomData: Omit<Room, 'id'>): Promise<string> => {
  const docRef = doc(collection(db, 'rooms'));
  const newRoom: Room = {
    ...roomData,
    id: docRef.id,
    created_at: new Date().toISOString(),
  };
  await setDoc(docRef, newRoom);
  return docRef.id;
};

export const updateRoom = async (roomId: string, updates: Partial<Room>): Promise<void> => {
  const docRef = doc(db, 'rooms', roomId);
  // A kliens oldalon számolt mezőket soha ne írjuk vissza
  const { question_started_at_ms, ...rest } = updates;
  await updateDoc(docRef, rest);
};

/** Kvíz indítása: a kérdés indulási ideje SZERVERIDŐ, így minden eszköz ugyanakkor látja lejárni. */
export const startRoomQuiz = async (roomId: string): Promise<void> => {
  await updateDoc(doc(db, 'rooms', roomId), {
    status: 'active',
    started_at: new Date().toISOString(),
    current_question_index: 0,
    question_started_at: serverTimestamp(),
    question_start_delay_ms: START_COUNTDOWN_MS,
    // Kérdésenkénti indulási idők (a szerveres pontozáshoz: akkor is tudja, mikor indult
    // egy kérdés, ha a tanár közben már továbblépett). Új munkamenetnél újrakezdődik.
    question_starts: { '0': serverTimestamp() },
    all_answered_index: null,
    answer_stats: null,
  });
};

/** Továbblépés egy adott kérdésre (szerver-időbélyeggel). */
export const goToQuestion = async (roomId: string, index: number): Promise<void> => {
  await updateDoc(doc(db, 'rooms', roomId), {
    current_question_index: index,
    question_started_at: serverTimestamp(),
    question_start_delay_ms: 0,
    [`question_starts.${index}`]: serverTimestamp(),
    all_answered_index: null,
    answer_stats: null,
  });
};

/** Tengeralattjáró boost – atomikus növelés, így párhuzamos boostok sem vesznek el. */
export const incrementSubmarineBoost = async (roomId: string): Promise<void> => {
  await updateDoc(doc(db, 'rooms', roomId), { submarine_boosts: increment(1) });
};

export const subscribeToRoom = (
  roomId: string,
  callback: (room: Room | null) => void,
  onConnectionChange?: (fromCache: boolean) => void
): Unsubscribe => {
  return onSnapshot(
    doc(db, 'rooms', roomId),
    { includeMetadataChanges: !!onConnectionChange },
    (snap) => {
      onConnectionChange?.(snap.metadata.fromCache);
      if (!snap.exists()) {
        callback(null);
      } else {
        callback(toRoom(snap));
      }
    },
    logSnapshotError('room')
  );
};

// ----------------------------------------------------
// PARTICIPANTS
// ----------------------------------------------------
/** Determinisztikus résztvevő-azonosító: ugyanaz a diák (uid) ugyanabban a szobában mindig ugyanaz. */
export const participantDocId = (roomId: string, uid: string) => `${roomId}_${uid}`;

const toParticipant = (snap: DocumentSnapshot): RoomParticipant => {
  const data = snap.data({ serverTimestamps: 'estimate' }) || {};
  return { id: snap.id, ...data, last_seen_ms: tsToMillis(data.last_seen) } as RoomParticipant;
};

export const getRoomParticipants = async (roomId: string): Promise<RoomParticipant[]> => {
  const q = query(
    collection(db, 'room_participants'),
    where('room_id', '==', roomId)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map(toParticipant);
  return items.sort((a, b) => (a.joined_at || '').localeCompare(b.joined_at || ''));
};

export const getParticipant = async (participantId: string): Promise<RoomParticipant | null> => {
  const snap = await getDoc(doc(db, 'room_participants', participantId));
  return snap.exists() ? toParticipant(snap) : null;
};

export class KickedFromRoomError extends Error {
  constructor() {
    super('A tanár kitiltott ebből a szobából.');
    this.name = 'KickedFromRoomError';
  }
}

export const joinRoomParticipant = async (
  roomId: string,
  studentName: string,
  uid: string,
  avatar?: { character: string; accessory: string }
): Promise<RoomParticipant> => {
  const id = participantDocId(roomId, uid);
  const ref = doc(db, 'room_participants', id);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    if (existing.data().kicked) throw new KickedFromRoomError();
    const updatedData = {
      student_name: studentName,
      is_active: true,
      last_seen: serverTimestamp(),
      ...(avatar ? { avatar } : {}),
    };
    await updateDoc(ref, updatedData);
    return { ...toParticipant(existing), student_name: studentName, is_active: true, ...(avatar ? { avatar } : {}) };
  }

  const newParticipant = {
    id,
    room_id: roomId,
    uid,
    student_name: studentName,
    student_session_id: uid,
    joined_at: new Date().toISOString(),
    is_active: true,
    kicked: false,
    avatar: avatar || { character: '🐻', accessory: 'none' },
    last_seen: serverTimestamp(),
  };
  await setDoc(ref, newParticipant);
  return { ...newParticipant, last_seen: null } as RoomParticipant;
};

/** Szívverés: a diák jelzi, hogy még kapcsolatban van. */
export const touchParticipant = async (participantId: string): Promise<void> => {
  await updateDoc(doc(db, 'room_participants', participantId), { last_seen: serverTimestamp() });
};

export const updateParticipant = async (participantId: string, updates: Partial<RoomParticipant>): Promise<void> => {
  const docRef = doc(db, 'room_participants', participantId);
  const { last_seen_ms, ...rest } = updates;
  await updateDoc(docRef, rest);
};

/** Kitiltás: a diák nem tud újra csatlakozni ugyanazzal az azonosítóval. */
export const kickParticipant = async (participantId: string): Promise<void> => {
  await updateDoc(doc(db, 'room_participants', participantId), { is_active: false, kicked: true });
};

export const deleteParticipant = async (participantId: string): Promise<void> => {
  await deleteDoc(doc(db, 'room_participants', participantId));
};

export const subscribeToParticipants = (
  roomId: string,
  callback: (participants: RoomParticipant[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, 'room_participants'),
    where('room_id', '==', roomId)
  );
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map(toParticipant);
    items.sort((a, b) => (a.joined_at || '').localeCompare(b.joined_at || ''));
    callback(items);
  }, logSnapshotError('participants'));
};

/** Egyetlen résztvevő figyelése (a diák a sajátját: kitiltás / újraindítás észlelése). */
export const subscribeToParticipant = (
  participantId: string,
  callback: (participant: RoomParticipant | null, fromCache: boolean) => void
): Unsubscribe => {
  return onSnapshot(doc(db, 'room_participants', participantId), (snap) => {
    callback(snap.exists() ? toParticipant(snap) : null, snap.metadata.fromCache);
  }, logSnapshotError('participant'));
};

// ----------------------------------------------------
// QUIZ ANSWERS
// ----------------------------------------------------
export const getRoomAnswers = async (roomId: string, sessionNumber?: number): Promise<QuizAnswer[]> => {
  let q = query(
    collection(db, 'quiz_answers'),
    where('room_id', '==', roomId)
  );
  if (sessionNumber !== undefined) {
    q = query(
      collection(db, 'quiz_answers'),
      where('room_id', '==', roomId),
      where('session_number', '==', sessionNumber)
    );
  }
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizAnswer));
  return items.sort((a, b) => (a.answered_at || '').localeCompare(b.answered_at || ''));
};

/** Egy diák összes válasza egy munkamenetben (tengeralattjáró mód folytatásához). */
export const getParticipantAnswers = async (
  roomId: string,
  participantId: string,
  sessionNumber: number
): Promise<QuizAnswer[]> => {
  const q = query(
    collection(db, 'quiz_answers'),
    where('room_id', '==', roomId),
    where('participant_id', '==', participantId),
    where('session_number', '==', sessionNumber)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizAnswer));
};

// Determinisztikus dokumentum-azonosító: egy diák egy kérdésre egy munkamenetben
// pontosan EGY válasz-dokumentumot kaphat. Így nincs szükség előzetes lekérdezésre
// (ami gyenge wifin másodpercekig lóghat), dupla koppintás / időtúllépés-verseny
// sem hozhat létre duplikátumot, és offline is azonnal sorba áll az írás.
export const answerDocId = (a: Pick<QuizAnswer, 'room_id' | 'participant_id' | 'question_index' | 'session_number'>) =>
  `${a.room_id}_s${a.session_number ?? 1}_${a.participant_id}_q${a.question_index}`;

/**
 * Válasz mentése. A Firestore-szabályok szerint egy válasz csak egyszer hozható létre
 * (utólag a diák nem írhatja át – a pontozást a szerver véglegesíti).
 * Ha egy korábbi, "elveszettnek hitt" próbálkozás valójában már célba ért, a második
 * írást a szabály elutasítja – ezt sikeresnek tekintjük.
 */
export const submitQuizAnswer = async (
  answerData: Omit<QuizAnswer, 'id' | 'answered_at'>
): Promise<string> => {
  // A Firestore nem fogad el undefined értéket (beágyazott objektumban sem) → rekurzívan kiszűrjük
  const stripUndefined = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(stripUndefined);
    if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, stripUndefined(v)])
      );
    }
    return value;
  };
  const cleanAnswerData = stripUndefined(answerData) as Record<string, unknown>;

  const id = answerDocId(answerData);
  const ref = doc(db, 'quiz_answers', id);
  try {
    await setDoc(ref, {
      ...cleanAnswerData,
      id,
      answered_at: new Date().toISOString(),
      submitted_at: serverTimestamp(),
    });
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === 'permission-denied') {
      const existing = await getDoc(ref);
      if (existing.exists()) return id;
    }
    throw err;
  }
  return id;
};

/** A diák a saját aktuális válasz-dokumentumát figyeli (visszaállítás + szerveres pontozás). */
export const subscribeToAnswerDoc = (
  answerId: string,
  callback: (answer: QuizAnswer | null) => void
): Unsubscribe => {
  return onSnapshot(doc(db, 'quiz_answers', answerId), (snap) => {
    callback(snap.exists() ? ({ id: snap.id, ...snap.data() } as QuizAnswer) : null);
  }, logSnapshotError('answer'));
};

export const subscribeToAnswers = (
  roomId: string,
  sessionNumber: number | undefined,
  callback: (answers: QuizAnswer[]) => void
): Unsubscribe => {
  const q = sessionNumber !== undefined
    ? query(
        collection(db, 'quiz_answers'),
        where('room_id', '==', roomId),
        where('session_number', '==', sessionNumber)
      )
    : query(
        collection(db, 'quiz_answers'),
        where('room_id', '==', roomId)
      );

  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizAnswer));
    items.sort((a, b) => (a.answered_at || '').localeCompare(b.answered_at || ''));
    callback(items);
  }, logSnapshotError('answers'));
};

// ----------------------------------------------------
// PROFILES
// ----------------------------------------------------
export const getProfile = async (userId: string) => {
  const docRef = doc(db, 'profiles', userId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data();
};

export const getAllProfiles = async () => {
  const snap = await getDocs(collection(db, 'profiles'));
  const map: Record<string, { display_name?: string; email?: string }> = {};
  snap.docs.forEach((d) => {
    map[d.id] = d.data();
  });
  return map;
};

// ----------------------------------------------------
// REALTIME REACTIONS
// ----------------------------------------------------
export const sendRoomReaction = async (roomId: string, emoji: string): Promise<void> => {
  const reactionsRef = collection(db, 'rooms', roomId, 'reactions');
  await addDoc(reactionsRef, {
    emoji,
    created_at: Date.now(),
  });
};

export const subscribeToReactions = (
  roomId: string,
  callback: (reaction: { id: string; emoji: string }) => void
): Unsubscribe => {
  const startTime = Date.now() - 5000;
  const reactionsRef = collection(db, 'rooms', roomId, 'reactions');
  const q = query(reactionsRef, where('created_at', '>=', startTime), limit(50));

  let initialLoad = true;
  return onSnapshot(q, (snap) => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    snap.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const data = change.doc.data();
        callback({ id: change.doc.id, emoji: data.emoji });
      }
    });
  }, logSnapshotError('reactions'));
};
