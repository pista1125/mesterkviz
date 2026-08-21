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
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import type { Quiz, Room, RoomParticipant, QuizAnswer } from '@/types/quiz';

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
export const getRoomById = async (roomId: string): Promise<Room | null> => {
  const docRef = doc(db, 'rooms', roomId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Room;
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
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as Room;
};

export const getTeacherRooms = async (teacherId: string): Promise<Room[]> => {
  const q = query(
    collection(db, 'rooms'),
    where('teacher_id', '==', teacherId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Room));
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
  await updateDoc(docRef, updates);
};

export const subscribeToRoom = (roomId: string, callback: (room: Room | null) => void): Unsubscribe => {
  return onSnapshot(doc(db, 'rooms', roomId), (snap) => {
    if (!snap.exists()) {
      callback(null);
    } else {
      callback({ id: snap.id, ...snap.data() } as Room);
    }
  });
};

// ----------------------------------------------------
// PARTICIPANTS
// ----------------------------------------------------
export const getRoomParticipants = async (roomId: string): Promise<RoomParticipant[]> => {
  const q = query(
    collection(db, 'room_participants'),
    where('room_id', '==', roomId)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as RoomParticipant));
  return items.sort((a, b) => (a.joined_at || '').localeCompare(b.joined_at || ''));
};

export const joinRoomParticipant = async (
  roomId: string,
  studentName: string,
  studentSessionId: string,
  avatar?: { character: string; accessory: string }
): Promise<RoomParticipant> => {
  // Check if participant already exists for this room + session
  const q = query(
    collection(db, 'room_participants'),
    where('room_id', '==', roomId),
    where('student_session_id', '==', studentSessionId),
    limit(1)
  );
  const snap = await getDocs(q);

  if (!snap.empty) {
    const existingDoc = snap.docs[0];
    const updatedData: Partial<RoomParticipant> = {
      student_name: studentName,
      is_active: true,
      ...(avatar ? { avatar } : {}),
    };
    await updateDoc(existingDoc.ref, updatedData);
    return { id: existingDoc.id, ...existingDoc.data(), ...updatedData } as RoomParticipant;
  }

  const docRef = doc(collection(db, 'room_participants'));
  const newParticipant: RoomParticipant = {
    id: docRef.id,
    room_id: roomId,
    student_name: studentName,
    student_session_id: studentSessionId,
    joined_at: new Date().toISOString(),
    is_active: true,
    avatar: avatar || { character: '🐻', accessory: 'none' },
  };
  await setDoc(docRef, newParticipant);
  return newParticipant;
};

export const updateParticipant = async (participantId: string, updates: Partial<RoomParticipant>): Promise<void> => {
  const docRef = doc(db, 'room_participants', participantId);
  await updateDoc(docRef, updates);
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
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as RoomParticipant));
    items.sort((a, b) => (a.joined_at || '').localeCompare(b.joined_at || ''));
    callback(items);
  });
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

export const submitQuizAnswer = async (
  answerData: Omit<QuizAnswer, 'id' | 'answered_at'>
): Promise<string> => {
  // Check if answer for participant + question_index + session_number already exists
  const q = query(
    collection(db, 'quiz_answers'),
    where('room_id', '==', answerData.room_id),
    where('participant_id', '==', answerData.participant_id),
    where('question_index', '==', answerData.question_index),
    where('session_number', '==', answerData.session_number),
    limit(1)
  );
  const snap = await getDocs(q);
  const now = new Date().toISOString();

  if (!snap.empty) {
    const existingDoc = snap.docs[0];
    await updateDoc(existingDoc.ref, {
      ...answerData,
      answered_at: now,
    });
    return existingDoc.id;
  }

  const docRef = doc(collection(db, 'quiz_answers'));
  const newAnswer: QuizAnswer = {
    ...answerData,
    id: docRef.id,
    answered_at: now,
  };
  await setDoc(docRef, newAnswer);
  return docRef.id;
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
  });
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
  });
};
