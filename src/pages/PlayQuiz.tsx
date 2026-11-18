import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Clock, CheckCircle2, Users, Send, Trophy, Zap, BarChart3, Sparkles, Check, Loader2, Infinity as LucideInfinity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isNormalizedMatch } from '@/lib/textNormalization';
import { type Room, type Quiz, type RoomParticipant, type AvatarData, type QuizAnswer, type MatchingUserPair, MATCHING_PAIR_COLORS, ANSWER_COLORS, isRoomUnlimitedTime, getQuestionEffectiveTimeLimit } from '@/types/quiz';
import { Podium } from '@/components/quiz/Podium';
import { Avatar } from '@/components/quiz/Avatar';
import { AvatarSelector } from '@/components/quiz/AvatarSelector';
import { ReactionButton } from '@/components/quiz/ReactionButton';
import { MathRenderer } from '@/components/quiz/MathRenderer';
import { ConnectionBanner } from '@/components/quiz/ConnectionBanner';
import {
  getRoomById,
  getQuizById,
  getRoomParticipants,
  getRoomAnswers,
  getParticipant,
  getParticipantAnswers,
  participantDocId,
  answerDocId,
  subscribeToRoom,
  subscribeToParticipant,
  subscribeToAnswerDoc,
  incrementSubmarineBoost,
  updateParticipant,
  touchParticipant,
  submitQuizAnswer,
} from '@/services/db';
import { ensureStudentIdentity } from '@/lib/identity';
import { syncServerClock, isServerClockSynced } from '@/lib/serverClock';
import { getQuestionStartLocal, useNow, HEARTBEAT_INTERVAL_MS } from '@/lib/questionTimer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const COLORS = ANSWER_COLORS;

const calculateScore = (isCorrect: boolean, timeTakenMs: number, timeLimitMs: number): number => {
  if (!isCorrect) return 0;
  if (!timeLimitMs || timeLimitMs <= 0) return 1000;
  const timeRatio = Math.max(0, 1 - timeTakenMs / timeLimitMs);
  return Math.round(100 + timeRatio * 900);
};

// Helper: generate a shuffled array of indices 0..n-1
const shuffleIndices = (n: number): number[] => {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

type MatchingState = {
  selectedSide: 'left' | 'right' | null;
  selectedId: string | null;
  userPairs: MatchingUserPair[];
  shuffledLeft: { id: string; text: string }[];
  shuffledRight: { id: string; text: string }[];
};
const EMPTY_MATCHING: MatchingState = { selectedSide: null, selectedId: null, userPairs: [], shuffledLeft: [], shuffledRight: [] };

/*
 * Diák játékoldal.
 *
 * Stabilitási alapelvek:
 *  - Azonosítás névtelen Firebase bejelentkezéssel → frissítés / alvás után ugyanaz a résztvevő.
 *  - A kérdés lejárta a SZERVER-időbélyegből számolódik → mindenkinél egyszerre jár le,
 *    és a későn érkező / visszatérő diák a valódi hátralévő időt látja.
 *  - A diák csak a szoba dokumentumot, a saját résztvevő- és a saját válasz-dokumentumát
 *    figyeli (nem az egész osztály összes válaszát) → kevesebb újrarajzolás gyenge telefonon.
 *  - A válasz azonnal mentődik; a szabad szöveges választ a szerver (AI) értékeli utólag.
 */
const PlayQuiz = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);
  const [completedAnswers, setCompletedAnswers] = useState<QuizAnswer[]>([]);
  const [showRanglistaBtn, setShowRanglistaBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(() => sessionStorage.getItem('student_name'));
  const [fromCache, setFromCache] = useState(false);
  const [clockSynced, setClockSynced] = useState(isServerClockSynced());

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [earnedScore, setEarnedScore] = useState(0);
  const [isEvaluatingAi, setIsEvaluatingAi] = useState(false);
  const [gradingDelayed, setGradingDelayed] = useState(false);
  const [evaluationSource, setEvaluationSource] = useState<'exact' | 'normalized' | 'ai' | null>(null);
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [answerDocReady, setAnswerDocReady] = useState(false);
  const [showStartCountdown, setShowStartCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const textAnswerRef = useRef('');
  textAnswerRef.current = textAnswer;

  const [matchingState, setMatchingState] = useState<MatchingState>(EMPTY_MATCHING);
  const matchingStateRef = useRef(matchingState);
  matchingStateRef.current = matchingState;
  const [matchingSummary, setMatchingSummary] = useState<{ correctPairs: number; totalPairs: number } | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarData>(() => {
    try {
      return JSON.parse(sessionStorage.getItem('student_avatar') || '{"character": "🐻", "accessory": "none"}');
    } catch {
      return { character: '🐻', accessory: 'none' };
    }
  });

  // Submarine Mode state
  const [submarineCorrectStore, setSubmarineCorrectStore] = useState(0);
  const [showBoostButton, setShowBoostButton] = useState(false);
  // Infinite random queue: holds actual quiz question indices in shuffled order
  const [submarineQueue, setSubmarineQueue] = useState<number[]>([]);
  // Hányadik tengeralattjáró-kérdésnél tart a diák (= a válasz egyedi DB-kulcsa)
  const [submarineStep, setSubmarineStep] = useState(0);
  const [submarineReady, setSubmarineReady] = useState(false);
  const countedCorrectRef = useRef<Set<string>>(new Set());

  const hasAnsweredRef = useRef(false);
  const roomRef = useRef<Room | null>(null);
  const quizRef = useRef<Quiz | null>(null);
  quizRef.current = quiz;

  // --- Aktuális kérdés ---
  const isSubmarine = room?.game_mode === 'submarine';
  const submarineActualQIndex = submarineQueue[0] ?? 0;
  const currentQIndex = isSubmarine ? submarineActualQIndex : (room?.current_question_index ?? 0);
  const currentQuestion = quiz?.questions[currentQIndex];
  const sessionNumber = room?.session_number || 1;
  const dbQuestionIndex = isSubmarine ? submarineStep : (room?.current_question_index ?? 0);
  const questionKey = `${isSubmarine ? 'sub' : 'q'}:${sessionNumber}:${dbQuestionIndex}`;
  const questionKeyRef = useRef(questionKey);
  questionKeyRef.current = questionKey;
  const currentAnswerId =
    room && participantId && (!isSubmarine || submarineReady)
      ? answerDocId({ room_id: room.id, session_number: sessionNumber, participant_id: participantId, question_index: dbQuestionIndex })
      : null;

  // --- Időzítés (szerveridőhöz kötve) ---
  const hasTimeLimit = !isRoomUnlimitedTime(room);
  const timeLimitSec = currentQuestion ? getQuestionEffectiveTimeLimit(room, currentQuestion) : 15;
  const timerActive = room?.status === 'active' && !showStartCountdown;
  const [localStart, setLocalStart] = useState<{ key: string; at: number } | null>(null);
  useEffect(() => {
    if (!timerActive) return;
    setLocalStart({ key: questionKey, at: Date.now() });
  }, [timerActive, questionKey]);
  const serverStart = !isSubmarine && clockSynced ? getQuestionStartLocal(room) : null;
  const localStartAt = localStart?.key === questionKey ? localStart.at : null;
  const questionStartAt = serverStart ?? localStartAt;
  const now = useNow(500, !!timerActive && hasTimeLimit);
  const deadline = hasTimeLimit && questionStartAt !== null ? questionStartAt + timeLimitSec * 1000 : null;
  const timer = !hasTimeLimit
    ? 999
    : deadline === null
      ? timeLimitSec
      : Math.min(timeLimitSec, Math.max(0, Math.ceil((deadline - now) / 1000)));
  const deadlinePassed = !!timerActive && deadline !== null && now >= deadline;

  // A "mindenki válaszolt" jelzést és a számlálót a tanári gép írja a szobába
  const allAnswered = !isSubmarine && room?.all_answered_index != null && room.all_answered_index === room.current_question_index;
  const isRevealed = isSubmarine ? answered : (deadlinePassed || allAnswered || (!hasTimeLimit && answered));
  // Zárolás: lejárt az idő, vagy már felfedték az eredményt (pl. visszatérő diáknál)
  const isTimedOut = deadlinePassed || (isRevealed && !answered);
  const stats = room?.answer_stats;
  const statsMatch = !!stats && stats.question_index === room?.current_question_index && stats.session_number === sessionNumber;
  const answeredCountDisplay = statsMatch ? stats!.answered : (answered ? 1 : 0);
  const totalDisplay = statsMatch ? stats!.total : (room?.participant_count ?? 0);
  const waitingParticipantCount = room?.participant_count ?? participants.length;

  // --- Állapot visszaállítása új kérdésnél ---
  const resetQuestionState = () => {
    hasAnsweredRef.current = false;
    textAnswerRef.current = '';
    setAnswered(false);
    setIsTimeout(false);
    setSelectedAnswer(null);
    setTextAnswer('');
    setAnswerCorrect(null);
    setEarnedScore(0);
    setIsEvaluatingAi(false);
    setGradingDelayed(false);
    setEvaluationSource(null);
    setAiReason(null);
    setMatchingSummary(null);
    setMatchingState(EMPTY_MATCHING);
    setAnswerDocReady(false);
  };

  const startCountdown = () => {
    setShowStartCountdown(true);
    setCountdownValue(3);
    let v = 3;
    const cdInterval = setInterval(() => {
      v -= 1;
      setCountdownValue(Math.max(v, 0));
      if (v <= 0) {
        clearInterval(cdInterval);
        setTimeout(() => setShowStartCountdown(false), 1000);
      }
    }, 1000);
  };

  // --- Betöltés: azonosítás, szoba, résztvevő, kvíz ---
  const fetchRoomData = useCallback(async () => {
    if (!roomId) return;
    setLoading(true);
    try {
      const uid = await ensureStudentIdentity();
      syncServerClock().then(() => setClockSynced(isServerClockSynced()));

      const roomData = await getRoomById(roomId);
      if (!roomData) {
        toast.error('Szoba nem található');
        navigate('/');
        return;
      }

      // Résztvevő feloldása: új (uid-alapú) azonosító, vagy régi munkamenet-azonosító
      let p = await getParticipant(participantDocId(roomId, uid));
      if (!p) {
        const legacy = sessionStorage.getItem('participant_id');
        if (legacy) {
          const lp = await getParticipant(legacy);
          if (lp && lp.room_id === roomId) p = lp;
        }
      }
      if (!p || p.kicked || !p.is_active) {
        if (p?.kicked) toast.error('A tanár kitiltott ebből a szobából.');
        navigate(roomData.code && roomData.status !== 'completed' ? `/join/${roomData.code}` : '/join');
        return;
      }

      setParticipantId(p.id);
      setStudentName(p.student_name);
      if (p.avatar) setCurrentAvatar(p.avatar);
      try {
        sessionStorage.setItem('participant_id', p.id);
        sessionStorage.setItem('student_name', p.student_name);
      } catch { /* privát mód */ }

      roomRef.current = roomData;
      setRoom(roomData);

      const quizData = await getQuizById(roomData.quiz_id);
      if (quizData) {
        setQuiz(quizData);
      } else {
        toast.error('Kvíz adatok nem tölthetők be');
      }
    } catch (err) {
      console.error('Error fetching room data:', err);
      toast.error('Hiba történt az adatok betöltésekor');
    } finally {
      setLoading(false);
    }
  }, [roomId, navigate]);

  useEffect(() => {
    fetchRoomData();
  }, [fetchRoomData]);

  // --- Valós idejű figyelők: szoba + saját résztvevő ---
  useEffect(() => {
    if (!roomId || !participantId) return;

    const unsubRoom = subscribeToRoom(roomId, (updated) => {
      if (!updated) return;
      const prev = roomRef.current;
      roomRef.current = updated;
      if (prev) {
        const questionChanged =
          updated.current_question_index !== prev.current_question_index ||
          (updated.session_number || 1) !== (prev.session_number || 1);
        if (questionChanged && updated.game_mode !== 'submarine') resetQuestionState();
        if (prev.status === 'waiting' && updated.status === 'active') startCountdown();
      }
      setRoom(updated);
    }, setFromCache);

    const unsubMe = subscribeToParticipant(participantId, (p, cached) => {
      if (cached) return; // offline gyorsítótár-adat alapján nem dobjuk ki a diákot
      if (!p || p.is_active === false) {
        toast.error(p?.kicked ? 'Ki lettél téve a szobából' : 'A tanár újraindította a szobát – csatlakozz újra!');
        try { sessionStorage.removeItem('participant_id'); } catch { /* */ }
        const code = roomRef.current?.code;
        navigate(code ? `/join/${code}` : '/join');
      }
    });

    return () => {
      unsubRoom();
      unsubMe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, participantId]);

  // --- Szívverés + visszatérés kezelése (telefon feloldása) ---
  useEffect(() => {
    if (!participantId) return;
    const beat = () => {
      if (document.visibilityState !== 'visible') return;
      touchParticipant(participantId).catch((e) => console.warn('[Heartbeat] sikertelen:', e));
    };
    beat();
    const iv = setInterval(beat, HEARTBEAT_INTERVAL_MS);
    const onVis = () => {
      if (document.visibilityState === 'visible') {
        beat();
        syncServerClock().then(() => setClockSynced(isServerClockSynced()));
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [participantId]);

  // --- Saját válasz-dokumentum figyelése: visszaállítás frissítés után + szerveres pontozás ---
  useEffect(() => {
    if (!currentAnswerId || room?.status !== 'active') return;
    setAnswerDocReady(false);
    const unsub = subscribeToAnswerDoc(currentAnswerId, (a) => {
      setAnswerDocReady(true);
      if (!a) return;
      hasAnsweredRef.current = true;
      setAnswered(true);
      const ans = (a.answer || {}) as Record<string, unknown>;
      setIsTimeout(!!ans.timeout);
      if (typeof ans.selectedOptionId === 'string') setSelectedAnswer(ans.selectedOptionId);
      if (typeof ans.text === 'string' && !textAnswerRef.current) setTextAnswer(ans.text);
      if (typeof ans.correctPairs === 'number') {
        setMatchingSummary({ correctPairs: ans.correctPairs, totalPairs: Number(ans.totalPairs) || 0 });
      }
      if (a.grading === 'pending') {
        setIsEvaluatingAi(true);
        setAnswerCorrect(null);
        return;
      }
      setIsEvaluatingAi(false);
      setAnswerCorrect(!!a.is_correct);
      setEarnedScore(a.score || 0);
      setEvaluationSource((a.evaluation_source || (ans.evaluation_source as QuizAnswer['evaluation_source']) || null) ?? null);
      setAiReason(a.ai_reason || null);

      if (roomRef.current?.game_mode === 'submarine' && a.is_correct && !countedCorrectRef.current.has(a.id)) {
        countedCorrectRef.current.add(a.id);
        setSubmarineCorrectStore((c) => c + 1);
      }
    });
    return unsub;
  }, [currentAnswerId, room?.status]);

  // Ha az AI-ellenőrzés sokáig tart, jelezzük a diáknak
  useEffect(() => {
    if (!isEvaluatingAi) {
      setGradingDelayed(false);
      return;
    }
    const t = setTimeout(() => setGradingDelayed(true), 20000);
    return () => clearTimeout(t);
  }, [isEvaluatingAi, questionKey]);

  // --- Lejárt az idő ---
  useEffect(() => {
    if (!deadlinePassed || !answerDocReady || hasAnsweredRef.current) return;
    if (!currentQuestion || room?.status !== 'active') return;
    if (currentQuestion.type === 'matching') {
      submitAnswer();
    } else if (currentQuestion.type === 'text-input' && textAnswerRef.current.trim()) {
      // A diák már begépelt valamit, csak nem nyomta meg a Beküldést → ne vesszen el
      submitAnswer();
    } else {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadlinePassed, answerDocReady, questionKey]);

  // --- Párosítás előkészítése ---
  useEffect(() => {
    if (!quiz || !room || room.status !== 'active' || matchingState.shuffledLeft.length > 0) return;
    const question = quiz.questions[currentQIndex];
    if (question?.type === 'matching' && question.pairs) {
      const leftItems = question.pairs.map(p => ({ id: p.id, text: p.left }));
      const rightItems = question.pairs.map(p => ({ id: p.id, text: p.right }));
      setMatchingState({
        selectedSide: null,
        selectedId: null,
        userPairs: [],
        shuffledLeft: [...leftItems].sort(() => Math.random() - 0.5),
        shuffledRight: [...rightItems].sort(() => Math.random() - 0.5),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz, room?.status, matchingState.shuffledLeft.length, questionKey]);

  // --- Tengeralattjáró: sor előkészítése, folytatás frissítés után ---
  useEffect(() => {
    if (!quiz || !room || room.game_mode !== 'submarine' || !participantId) return;
    let cancelled = false;
    setSubmarineReady(false);
    (async () => {
      let startStep = 0;
      try {
        const mine = await getParticipantAnswers(room.id, participantId, room.session_number || 1);
        startStep = mine.reduce((m, a) => Math.max(m, (a.question_index ?? -1) + 1), 0);
      } catch (e) {
        console.warn('Korábbi tengeralattjáró-válaszok lekérése sikertelen:', e);
      }
      if (cancelled) return;
      setSubmarineStep(startStep);
      setSubmarineQueue(shuffleIndices(quiz.questions.length));
      setSubmarineReady(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz?.id, room?.game_mode, room?.session_number, participantId]);

  const advanceSubmarine = () => {
    const q = quizRef.current;
    if (!q) return;
    resetQuestionState();
    setSubmarineQueue(prev => {
      const next = prev.slice(1);
      return next.length < 3 ? [...next, ...shuffleIndices(q.questions.length)] : next;
    });
    setSubmarineStep(s => s + 1);
  };

  // Tengeralattjáró: válasz (és értékelés) után automatikusan jön a következő kérdés.
  // Ha az AI-értékelés elakad, 15 mp után akkor is továbblépünk.
  useEffect(() => {
    if (!isSubmarine || !answered || room?.status !== 'active') return;
    const ready = isTimeout || answerCorrect !== null;
    const t = setTimeout(advanceSubmarine, ready ? 2000 : 15000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmarine, answered, answerCorrect, isTimeout, submarineStep, room?.status]);

  useEffect(() => {
    if (submarineCorrectStore >= 3) setShowBoostButton(true);
  }, [submarineCorrectStore]);

  // Fetch answers and show Ranglista button when quiz is completed
  useEffect(() => {
    if (!room || room.status !== 'completed' || !roomId) return;

    const fetchCompletedData = async () => {
      try {
        const [ansData, partData] = await Promise.all([
          getRoomAnswers(roomId, room.session_number),
          getRoomParticipants(roomId),
        ]);
        setCompletedAnswers(ansData);
        setParticipants(partData.filter(p => p.is_active));
      } catch (e) {
        console.error('Error fetching completed answers:', e);
      }
    };
    fetchCompletedData();

    // Show Ranglista button after podium animation finishes (~5s)
    const timer = setTimeout(() => setShowRanglistaBtn(true), 5500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status, roomId]);

  const getLeaderboard = () => {
    return participants.map((p) => {
      const sa = completedAnswers.filter((a) => a.participant_id === p.id);
      const totalScore = sa.reduce((sum, a) => sum + (a.score || 0), 0);
      const correctCount = sa.filter((a) => a.is_correct).length;
      return { ...p, totalScore, correctCount };
    }).sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
  };

  const handleSubmarineBoost = async () => {
    if (!roomId) return;
    try {
      await incrementSubmarineBoost(roomId);
      setSubmarineCorrectStore(0);
      setShowBoostButton(false);
      toast.success('🚀 TENGERALATTJÁRÓ FELGYORSÍTVA!', {
        icon: '🚀',
        duration: 2000
      });
    } catch (e) {
      console.error('Error boosting submarine:', e);
    }
  };

  // Lejárt idő rögzítése (0 pont)
  const handleTimeout = async () => {
    if (hasAnsweredRef.current || !room || !participantId || !currentQuestion) return;
    hasAnsweredRef.current = true;
    setAnswered(true);
    setIsTimeout(true);
    setAnswerCorrect(false);
    setEarnedScore(0);

    try {
      await submitQuizAnswer({
        room_id: room.id,
        participant_id: participantId,
        question_index: dbQuestionIndex,
        actual_question_index: currentQIndex,
        question_id: currentQuestion.id,
        answer: { timeout: true, actualQuestionIndex: currentQIndex, questionId: currentQuestion.id },
        is_correct: false,
        time_taken_ms: null,
        score: 0,
        session_number: sessionNumber,
        grading: 'client',
      });
    } catch (err) {
      console.error('Error recording timeout answer:', err);
    }
  };

  const submitAnswer = async (optionId?: string) => {
    if (!room || !quiz || !participantId || hasAnsweredRef.current) return;
    if (isSubmarine && !submarineReady) return;
    const question = currentQuestion;
    if (!question) return;

    const keyAtSubmit = questionKey;
    const isStillSameQuestion = () => questionKeyRef.current === keyAtSubmit;

    hasAnsweredRef.current = true;
    setAnswered(true);
    setIsTimeout(false);

    // Válaszidő a (szerveridőhöz igazított) kérdésindulástól. A végleges pontot a szerver számolja.
    const timeTaken = Math.max(0, Date.now() - (questionStartAt ?? Date.now()));
    const timeLimitMs = hasTimeLimit ? timeLimitSec * 1000 : 0;

    let isCorrect: boolean | null = false;
    let answerData: Record<string, unknown> = {};
    let evalSource: 'exact' | 'normalized' | 'ai' | undefined = undefined;
    let grading: 'client' | 'pending' = 'client';

    if ((question.type === 'multiple-choice' || question.type === 'true-false') && optionId) {
      const selectedOption = (question.options || []).find((o) => o.id === optionId);
      isCorrect = selectedOption?.isCorrect || false;
      answerData = {
        selectedOptionId: optionId,
        selectedOptionText: selectedOption?.text || '',
      };
      setSelectedAnswer(optionId);
    } else if (question.type === 'text-input') {
      const trimmed = textAnswerRef.current.trim();
      if (!trimmed) {
        hasAnsweredRef.current = false;
        setAnswered(false);
        return;
      }
      const isExact = trimmed.toLowerCase() === (question.correctAnswer || '').trim().toLowerCase();
      if (isExact) {
        isCorrect = true;
        evalSource = 'exact';
      } else if (isNormalizedMatch(trimmed, question.correctAnswer)) {
        isCorrect = true;
        evalSource = 'normalized';
      } else {
        // Nem egyezik szó szerint → a szerver AI-jal értékeli. A válasz azonnal mentődik,
        // a diák nem ragad be a beküldésnél.
        isCorrect = null;
        grading = 'pending';
        setIsEvaluatingAi(true);
      }
      answerData = evalSource ? { text: trimmed, evaluation_source: evalSource } : { text: trimmed };
    } else if (question.type === 'matching') {
      const totalPairs = question.pairs?.length || 0;
      const userPairs = matchingStateRef.current.userPairs;
      const correctPairs = userPairs.filter(p => p.leftId === p.rightId).length;
      isCorrect = totalPairs > 0 && correctPairs === totalPairs;
      answerData = {
        correctPairs,
        totalPairs,
        pairs: userPairs.map(p => ({
          leftId: p.leftId,
          rightId: p.rightId,
          isCorrect: p.leftId === p.rightId,
        })),
      };
      setMatchingSummary({ correctPairs, totalPairs });
    }

    // Ideiglenes pontszám (a szerver felülírja a véglegessel)
    let score = 0;
    if (question.type === 'matching') {
      const cp = answerData.correctPairs as number;
      const tp = answerData.totalPairs as number;
      if (cp && tp) {
        score = isSubmarine
          ? Math.round(1000 * (cp / tp))
          : Math.round(calculateScore(true, timeTaken, timeLimitMs) * (cp / tp));
      }
    } else if (isCorrect) {
      score = isSubmarine ? 1000 : calculateScore(true, timeTaken, timeLimitMs);
    }

    try {
      await submitQuizAnswer({
        room_id: room.id,
        participant_id: participantId,
        question_index: dbQuestionIndex,
        actual_question_index: currentQIndex,
        question_id: question.id,
        answer: {
          ...answerData,
          actualQuestionIndex: currentQIndex,
          questionId: question.id,
        },
        is_correct: isCorrect,
        time_taken_ms: timeTaken,
        score,
        session_number: sessionNumber,
        evaluation_source: evalSource,
        grading,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      if (isStillSameQuestion()) {
        hasAnsweredRef.current = false;
        setAnswered(false);
        setIsEvaluatingAi(false);
        toast.error('Hiba a válasz elküldésekor, próbáld újra!');
      }
    }
    // Az eredményt (helyes-e, pontszám) a saját válasz-dokumentum figyelője állítja be.
  };

  const handleItemClick = (side: 'left' | 'right', id: string) => {
    if (answered) return;

    setMatchingState((prev) => {
      // Check if this item is already in a pair
      const existingPairIndex = prev.userPairs.findIndex((p) =>
        side === 'left' ? p.leftId === id : p.rightId === id
      );

      // If clicked item is already paired:
      if (existingPairIndex !== -1) {
        // If an item on the OPPOSITE side is currently selected: re-pair it!
        if (prev.selectedSide && prev.selectedSide !== side && prev.selectedId) {
          const updatedPairs = prev.userPairs.filter((_, idx) => idx !== existingPairIndex);
          const cleanedPairs = updatedPairs.filter((p) =>
            prev.selectedSide === 'left' ? p.leftId !== prev.selectedId : p.rightId !== prev.selectedId
          );

          const usedColors = new Set(cleanedPairs.map((p) => p.colorIndex));
          let colorIndex = 0;
          while (usedColors.has(colorIndex)) colorIndex++;

          const newPair: MatchingUserPair = {
            leftId: side === 'left' ? id : prev.selectedId,
            rightId: side === 'right' ? id : prev.selectedId,
            colorIndex,
          };

          return {
            ...prev,
            selectedSide: null,
            selectedId: null,
            userPairs: [...cleanedPairs, newPair],
          };
        }

        // Otherwise unpair this item and select it
        const updatedPairs = prev.userPairs.filter((_, idx) => idx !== existingPairIndex);
        return {
          ...prev,
          selectedSide: side,
          selectedId: id,
          userPairs: updatedPairs,
        };
      }

      // If item is not in a pair:
      if (!prev.selectedSide || !prev.selectedId) {
        return {
          ...prev,
          selectedSide: side,
          selectedId: id,
        };
      }

      // If clicked item on the SAME side:
      if (prev.selectedSide === side) {
        if (prev.selectedId === id) {
          return { ...prev, selectedSide: null, selectedId: null };
        }
        return { ...prev, selectedSide: side, selectedId: id };
      }

      // Clicked on opposite side: form a new pair!
      const cleanedPairs = prev.userPairs.filter((p) =>
        prev.selectedSide === 'left' ? p.leftId !== prev.selectedId : p.rightId !== prev.selectedId
      );

      const usedColors = new Set(cleanedPairs.map((p) => p.colorIndex));
      let colorIndex = 0;
      while (usedColors.has(colorIndex)) colorIndex++;

      const newPair: MatchingUserPair = {
        leftId: side === 'left' ? id : prev.selectedId,
        rightId: side === 'right' ? id : prev.selectedId,
        colorIndex,
      };

      return {
        ...prev,
        selectedSide: null,
        selectedId: null,
        userPairs: [...cleanedPairs, newPair],
      };
    });
  };

  const handleAvatarUpdate = async (newAvatar: AvatarData) => {
    if (!participantId) return;

    try {
      await updateParticipant(participantId, { avatar: newAvatar });
      setCurrentAvatar(newAvatar);
      sessionStorage.setItem('student_avatar', JSON.stringify(newAvatar));
      setIsEditingAvatar(false);
      toast.success('Avatár frissítve!');
    } catch (error) {
      toast.error('Hiba az avatár frissítésekor');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Betöltés...</p>
      </div>
    );
  }

  if (!room || !quiz) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Hiba történt</h2>
        <p className="text-muted-foreground mb-4">Nem sikerült betölteni a szoba vagy a kvíz adatait.</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setLoading(true); fetchRoomData(); }}>Újrapróbálás</Button>
          <Button onClick={() => navigate('/')}>Vissza a főoldalra</Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    // Waiting Room
    if (room.status === 'waiting') {
      return (
        <div className="flex flex-1 flex-col items-center justify-center p-4 z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Várakozás...</h1>
            <p className="mt-2 text-muted-foreground">A tanár hamarosan elindítja a kvízt</p>
            <div className="mt-6 font-display text-5xl font-black tracking-widest text-primary animate-pulse-slow">{room.code}</div>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>{waitingParticipantCount} résztvevő</span>
            </div>
            {studentName && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  onClick={() => { setIsAvatarModalOpen(true); setIsEditingAvatar(false); }}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Avatar avatar={currentAvatar} size="lg" />
                </button>
                <div className="rounded-lg bg-muted px-4 py-2">
                  <span className="text-sm text-muted-foreground">Te:</span>{' '}
                  <span className="font-medium">{studentName}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      );
    }

    // Quiz Completed
    if (room.status === 'completed') {
      const leaderboard = getLeaderboard();
      return (
        <div className="flex flex-1 flex-col items-center justify-center p-2 sm:p-4 z-10 w-full">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="font-display text-2xl sm:text-3xl font-black text-center mb-2 sm:mb-4 text-white">Kvíz vége!</h1>
            {leaderboard.length > 0 ? (
              <Podium winners={leaderboard.slice(0, 3) as any} />
            ) : (
              <div className="text-center py-8">
                <Trophy className="mx-auto mb-3 h-14 w-14 text-accent opacity-30" />
                <p className="text-muted-foreground text-sm">Nincsenek eredmények</p>
              </div>
            )}
            <AnimatePresence>
              {showRanglistaBtn && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-5 flex flex-col items-center gap-2"
                >
                  <Button size="lg" className="font-bold shadow-lg" onClick={() => navigate(`/results/${room.id}`)}>
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Ranglista megtekintése
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                    Vissza a főoldalra
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      );
    }

    // Active Quiz - Show Question
    const questionIndex = room.game_mode === 'submarine' ? submarineActualQIndex : room.current_question_index;
    const question = quiz.questions[questionIndex];
    if (!question) return null;

    if (showStartCountdown) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center bg-primary text-primary-foreground p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-black mb-8 drop-shadow-xl">{quiz.title}</h1>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdownValue}
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="text-9xl md:text-[12rem] font-black"
                >
                  {countdownValue > 0 ? countdownValue : 'RAJT!'}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-1 flex-col"
          >
            <div className="mb-6 rounded-2xl bg-card/95 md:backdrop-blur-md p-6 text-center shadow-xl border border-primary/20">
              <h2 className="font-display text-xl font-bold text-card-foreground md:text-2xl leading-snug">
                <MathRenderer text={question.text} />
              </h2>
              {question.imageUrl && (
                <img
                  src={question.imageUrl}
                  alt="Kérdés kép"
                  className="mx-auto mt-4 max-h-48 rounded-xl object-contain shadow-md"
                />
              )}
            </div>

            {/* Waiting for other players / time to expire */}
            {answered && !isSubmarine && !isTimeout && (!isRevealed || answerCorrect === null) && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-6 rounded-2xl border border-primary/30 bg-card/90 md:backdrop-blur-md p-6 text-center shadow-xl flex flex-col items-center justify-center space-y-3"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-14 w-14 rounded-full bg-primary/20 animate-ping" />
                  <div className="relative h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/40">
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">
                    {isEvaluatingAi ? (gradingDelayed ? 'Az ellenőrzés késik… ⏳' : 'AI ellenőrzi a választ... ✨') : 'Válaszod rögzítve! ✨'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isEvaluatingAi
                      ? (gradingDelayed
                        ? 'A válaszod el van mentve, az értékelés hamarosan megjelenik (a tanár is látja).'
                        : 'A válaszod el van mentve, a mesterséges intelligencia értékeli...')
                      : 'Várakozás a többiekre és az idő lejártára...'}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/80 text-muted-foreground text-xs font-semibold border border-border/50">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span>
                    {answeredCountDisplay} / {totalDisplay} diák válaszolt már
                  </span>
                </div>
              </motion.div>
            )}

            {/* Timeout Feedback (when timer expired without answering) */}
            {isRevealed && isTimeout && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 rounded-xl p-4 text-center text-primary-foreground shadow-lg bg-destructive"
              >
                <div className="text-lg font-bold flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>⏰ Lejárt az idő!</span>
                </div>
                <div className="text-sm opacity-90 mt-1">
                  Nem küldtél be választ a megadott időn belül (0 pont)
                </div>
                {question.type === 'text-input' && (
                  <div className="mt-2 text-sm italic opacity-90">
                    A helyes válasz: <MathRenderer text={question.correctAnswer || ''} className="inline-block" />
                  </div>
                )}
                {question.type === 'multiple-choice' && (
                  <div className="mt-2 text-sm italic opacity-90">
                    A helyes válasz: <MathRenderer text={(question.options || []).find(o => o.isCorrect)?.text || ''} className="inline-block" />
                  </div>
                )}
              </motion.div>
            )}

            {/* Answer Feedback (when round is revealed) */}
            {isRevealed && answered && !isTimeout && answerCorrect !== null && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  "mb-4 rounded-xl p-4 text-center text-primary-foreground shadow-lg transition-colors",
                  question.type === 'matching'
                    ? matchingSummary && matchingSummary.correctPairs === matchingSummary.totalPairs
                      ? "bg-quiz-green"
                      : matchingSummary && matchingSummary.correctPairs > 0
                        ? "bg-amber-600"
                        : "bg-destructive"
                    : answerCorrect
                      ? "bg-quiz-green"
                      : "bg-destructive"
                )}
              >
                <div className="text-lg font-bold">
                  {question.type === 'matching' ? (
                    matchingSummary && matchingSummary.correctPairs === matchingSummary.totalPairs ? (
                      `✓ Hibátlan párosítás! Mind a(z) ${matchingSummary.totalPairs} pár helyes!`
                    ) : matchingSummary && matchingSummary.correctPairs > 0 ? (
                      `Részben helyes: ${matchingSummary.correctPairs}/${matchingSummary.totalPairs} pár lett jó!`
                    ) : (
                      `✗ Helytelen párosítás: 0/${matchingSummary?.totalPairs || 0} pár lett jó`
                    )
                  ) : (
                    answerCorrect ? '✓ Helyes válasz!' : '✗ Helytelen válasz'
                  )}
                </div>
                {evaluationSource === 'ai' && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/20 md:backdrop-blur-sm border border-white/20">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                    <span>
                      {answerCorrect
                        ? 'AI által jóváhagyva: Elfogadva ✨'
                        : 'AI által ellenőrizve: Nem fogadható el 🤖'}
                    </span>
                  </div>
                )}
                {!answerCorrect && question.type === 'text-input' && (
                  <div className="mt-2 text-sm italic opacity-90">
                    A helyes válasz: <MathRenderer text={question.correctAnswer || ''} className="inline-block" />
                  </div>
                )}
                {!answerCorrect && question.type === 'multiple-choice' && (
                  <div className="mt-2 text-sm italic opacity-90">
                    A helyes válasz: <MathRenderer text={(question.options || []).find(o => o.isCorrect)?.text || ''} className="inline-block" />
                  </div>
                )}
                {earnedScore > 0 && (
                  <div className="mt-1 flex items-center justify-center gap-1 text-sm">
                    <Trophy className="h-4 w-4" />
                    +{earnedScore} pont
                  </div>
                )}
              </motion.div>
            )}

            {room.game_mode === 'submarine' && (
              <div className="sticky top-0 z-30 -mx-4 mb-6 bg-background/80 p-4 md:backdrop-blur-md border-b">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-12 w-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                          i < submarineCorrectStore 
                            ? 'bg-quiz-green border-quiz-green text-white scale-110' 
                            : 'bg-muted border-muted-foreground/20 text-muted-foreground/20'
                        }`}
                      >
                        {i < submarineCorrectStore ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {showBoostButton && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ 
                          opacity: 1, 
                          scale: [1, 1.05, 1],
                          y: 0 
                        }}
                        transition={{ 
                          scale: { repeat: Infinity, duration: 1 } 
                        }}
                        className="w-full max-w-sm"
                      >
                        <Button 
                          size="lg" 
                          onClick={handleSubmarineBoost}
                          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black text-xl rounded-2xl shadow-[0_4px_15px_rgba(250,204,21,0.5)] border-2 border-yellow-200"
                        >
                          <Zap className="mr-3 h-6 w-6 fill-blue-900" />
                          BOOST AKTIVÁLÁSA!
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Multiple Choice Answers */}
            {question.type === 'multiple-choice' && (
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                {question.options.map((option, i) => {
                  const color = COLORS[i % COLORS.length];
                  const isSelected = selectedAnswer === option.id;
                  const isLocked = answered || isTimedOut;

                  let stateClass: string = color.bg;
                  if (isRevealed) {
                    if (option.isCorrect) {
                      stateClass = 'bg-quiz-green ring-4 ring-white/50 shadow-lg';
                    } else if (isSelected && !option.isCorrect) {
                      stateClass = 'bg-destructive opacity-80';
                    } else {
                      stateClass = `${color.bg} opacity-30`;
                    }
                  } else if (answered) {
                    if (isSelected) {
                      stateClass = `${color.bg} ring-4 ring-white/60 brightness-110`;
                    } else {
                      stateClass = `${color.bg} opacity-40`;
                    }
                  } else if (isTimedOut) {
                    stateClass = `${color.bg} opacity-30 cursor-not-allowed`;
                  } else {
                    stateClass = `${color.bg} hover:brightness-110 active:brightness-90`;
                  }

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      onClick={() => !isLocked && submitAnswer(option.id)}
                      disabled={isLocked}
                      className={cn(
                        "flex items-center gap-4 rounded-xl p-5 text-left text-lg font-bold text-primary-foreground transition-all",
                        stateClass
                      )}
                    >
                      <span className="text-2xl">{color.icon}</span>
                      <div className="flex-1">
                        <MathRenderer text={option.text || `Válasz ${i + 1}`} />
                      </div>
                      {isRevealed && option.isCorrect && (
                        <CheckCircle2 className="h-6 w-6 text-white shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Text Input Answer */}
            {question.type === 'text-input' && (
              <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                <div className="w-full max-w-md space-y-2">
                  <Input
                    placeholder={isTimedOut && !answered ? "Lejárt az idő" : "Írd be a választ..."}
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={answered || isEvaluatingAi || isTimedOut}
                    className="h-14 text-center text-xl font-bold"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && textAnswer.trim() && !answered && !isEvaluatingAi && !isTimedOut) {
                        submitAnswer();
                      }
                    }}
                  />
                  <Button
                    className="w-full h-12 text-lg font-bold"
                    onClick={() => submitAnswer()}
                    disabled={answered || isEvaluatingAi || !textAnswer.trim() || isTimedOut}
                  >
                    {isEvaluatingAi ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin text-yellow-300" />
                        AI ellenőrzi a választ...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> Beküldés
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Matching Answer */}
            {question.type === 'matching' && (
              <div className="flex flex-1 flex-col space-y-4">
                <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
                  {/* Left Column */}
                  <div className="space-y-2.5">
                    <h3 className="mb-2 text-center font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Bal oldal
                    </h3>
                    {matchingState.shuffledLeft.map((item) => {
                      const pair = matchingState.userPairs.find((p) => p.leftId === item.id);
                      const isSelected = matchingState.selectedSide === 'left' && matchingState.selectedId === item.id;
                      const pairColor = pair ? MATCHING_PAIR_COLORS[pair.colorIndex % MATCHING_PAIR_COLORS.length] : null;
                      const isPairCorrect = pair ? pair.leftId === pair.rightId : false;

                      // Correct partner text for reveal
                      const correctRight = question.pairs?.find((p) => p.id === item.id)?.right;

                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          whileHover={!answered && !isTimedOut ? { scale: 1.01 } : {}}
                          whileTap={!answered && !isTimedOut ? { scale: 0.99 } : {}}
                          onClick={() => !answered && !isTimedOut && handleItemClick('left', item.id)}
                          disabled={answered || isTimedOut}
                          className={cn(
                            "relative w-full rounded-2xl p-4 text-center font-medium transition-all shadow-sm flex flex-col items-center justify-center min-h-[72px] border-2",
                            isSelected && "ring-4 ring-primary border-primary bg-primary/10 shadow-md",
                            !isSelected && pairColor && cn(pairColor.bg, pairColor.border, pairColor.ring),
                            !isSelected && !pairColor && "bg-card border-border hover:border-primary/50 text-card-foreground",
                            isRevealed && pair && (isPairCorrect ? "border-quiz-green bg-quiz-green/15" : "border-destructive bg-destructive/15"),
                            isTimedOut && !answered && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {/* Pair number badge */}
                          {pair && (!isRevealed || !answered) && (
                            <span className={cn(
                              "absolute -top-2.5 -left-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm",
                              pairColor?.badge
                            )}>
                              {pair.colorIndex + 1}. pár
                            </span>
                          )}

                          {/* Reveal badge */}
                          {isRevealed && answered && pair && (
                            <span className={cn(
                              "absolute -top-2.5 -left-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1",
                              isPairCorrect ? "bg-quiz-green text-white" : "bg-destructive text-white"
                            )}>
                              {isPairCorrect ? "✓ Helyes" : "✗ Hibás"}
                            </span>
                          )}

                          <div className="text-base sm:text-lg font-bold">
                            <MathRenderer text={item.text} />
                          </div>

                          {/* Show correct answer if wrong after answered */}
                          {isRevealed && answered && pair && !isPairCorrect && correctRight && (
                            <div className="mt-1.5 text-xs text-quiz-green font-semibold">
                              Helyes párja: <MathRenderer text={correctRight} className="inline-block" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2.5">
                    <h3 className="mb-2 text-center font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Jobb oldal
                    </h3>
                    {matchingState.shuffledRight.map((item) => {
                      const pair = matchingState.userPairs.find((p) => p.rightId === item.id);
                      const isSelected = matchingState.selectedSide === 'right' && matchingState.selectedId === item.id;
                      const pairColor = pair ? MATCHING_PAIR_COLORS[pair.colorIndex % MATCHING_PAIR_COLORS.length] : null;
                      const isPairCorrect = pair ? pair.leftId === pair.rightId : false;

                      return (
                        <motion.button
                          key={item.id}
                          type="button"
                          whileHover={!answered && !isTimedOut ? { scale: 1.01 } : {}}
                          whileTap={!answered && !isTimedOut ? { scale: 0.99 } : {}}
                          onClick={() => !answered && !isTimedOut && handleItemClick('right', item.id)}
                          disabled={answered || isTimedOut}
                          className={cn(
                            "relative w-full rounded-2xl p-4 text-center font-medium transition-all shadow-sm flex flex-col items-center justify-center min-h-[72px] border-2",
                            isSelected && "ring-4 ring-primary border-primary bg-primary/10 shadow-md",
                            !isSelected && pairColor && cn(pairColor.bg, pairColor.border, pairColor.ring),
                            !isSelected && !pairColor && "bg-card border-border hover:border-primary/50 text-card-foreground",
                            isRevealed && pair && (isPairCorrect ? "border-quiz-green bg-quiz-green/15" : "border-destructive bg-destructive/15"),
                            isTimedOut && !answered && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {/* Pair number badge */}
                          {pair && (!isRevealed || !answered) && (
                            <span className={cn(
                              "absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm",
                              pairColor?.badge
                            )}>
                              {pair.colorIndex + 1}. pár
                            </span>
                          )}

                          {/* Reveal badge */}
                          {isRevealed && answered && pair && (
                            <span className={cn(
                              "absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1",
                              isPairCorrect ? "bg-quiz-green text-white" : "bg-destructive text-white"
                            )}>
                              {isPairCorrect ? "✓ Helyes" : "✗ Hibás"}
                            </span>
                          )}

                          <div className="text-base sm:text-lg font-bold">
                            <MathRenderer text={item.text} />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button / instructions */}
                {!answered && !isTimedOut && (
                  <div className="pt-2 flex flex-col items-center justify-center">
                    {matchingState.userPairs.length === (question.pairs?.length || 0) ? (
                      <Button
                        size="lg"
                        className="w-full max-w-sm h-12 text-base font-bold bg-quiz-green hover:bg-quiz-green/90 text-white shadow-lg shadow-quiz-green/20 animate-pulse"
                        onClick={() => submitAnswer()}
                      >
                        <Check className="mr-2 h-5 w-5" /> Párosítás beküldése
                      </Button>
                    ) : (
                      <div className="text-xs text-muted-foreground bg-muted/60 px-4 py-2 rounded-full font-medium">
                        Kattints egy elemre, majd a párjára ({matchingState.userPairs.length}/{(question.pairs?.length || 0)} pár kész)
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* True/False Answer */}
            {question.type === 'true-false' && (() => {
              const igazOpt = (question.options || []).find(o => o.text === 'Igaz');
              const hamisOpt = (question.options || []).find(o => o.text === 'Hamis');
              const isLocked = answered || isTimedOut;

              const getTFClass = (opt: typeof igazOpt, defaultBg: string) => {
                const isSelected = selectedAnswer === opt?.id;
                if (isRevealed) {
                  if (opt?.isCorrect) return 'bg-quiz-green ring-4 ring-white/50 shadow-lg';
                  if (isSelected && !opt?.isCorrect) return 'bg-destructive opacity-80';
                  return `${defaultBg} opacity-30`;
                }
                if (answered) {
                  if (isSelected) return `${defaultBg} ring-4 ring-white/60 brightness-110`;
                  return `${defaultBg} opacity-40`;
                }
                if (isTimedOut) return `${defaultBg} opacity-30 cursor-not-allowed`;
                return `${defaultBg} hover:brightness-110 active:brightness-90`;
              };

              return (
                <div className="flex flex-1 gap-4 items-center justify-center">
                  <motion.button
                    whileHover={!isLocked ? { scale: 1.02 } : {}}
                    whileTap={!isLocked ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (isLocked) return;
                      if (igazOpt) submitAnswer(igazOpt.id);
                      else toast.error('Hiba: Igaz válaszlehetőség nem található');
                    }}
                    disabled={isLocked}
                    className={cn(
                      "flex-1 max-w-sm h-32 rounded-2xl text-2xl font-bold text-primary-foreground transition-all flex items-center justify-center gap-2",
                      getTFClass(igazOpt, 'bg-quiz-blue')
                    )}
                  >
                    <span>Igaz</span>
                    {isRevealed && igazOpt?.isCorrect && <CheckCircle2 className="h-6 w-6 text-white" />}
                  </motion.button>
                  <motion.button
                    whileHover={!isLocked ? { scale: 1.02 } : {}}
                    whileTap={!isLocked ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (isLocked) return;
                      if (hamisOpt) submitAnswer(hamisOpt.id);
                      else toast.error('Hiba: Hamis válaszlehetőség nem található');
                    }}
                    disabled={isLocked}
                    className={cn(
                      "flex-1 max-w-sm h-32 rounded-2xl text-2xl font-bold text-primary-foreground transition-all flex items-center justify-center gap-2",
                      getTFClass(hamisOpt, 'bg-quiz-red')
                    )}
                  >
                    <span>Hamis</span>
                    {isRevealed && hamisOpt?.isCorrect && <CheckCircle2 className="h-6 w-6 text-white" />}
                  </motion.button>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-background to-[#030712]">
      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute hidden md:block -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-500/15 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute hidden md:block -bottom-32 -left-32 w-[500px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border/70 bg-card/85 md:backdrop-blur-md px-4 py-3 z-10 shadow-sm">
        {room.status === 'active' ? (
          <>
            <div className="text-sm text-muted-foreground">
              {room.current_question_index + 1}/{quiz.questions.length}
            </div>
            <div className={`flex items-center gap-2 font-display text-xl font-bold ${hasTimeLimit && timer <= 5 ? 'text-destructive' : 'text-foreground'}`}>
              <Clock className="h-5 w-5" />
              {hasTimeLimit ? `${timer}s` : <LucideInfinity className="h-5 w-5 text-primary" />}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border p-1 border-primary/20 shadow-sm overflow-hidden">
              <img src="/favicon.ico" alt="KvízMester" className="h-full w-full object-contain" />
            </div>
            <div className="font-display font-bold text-primary">KvízMester</div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{studentName}</span>
          <button
            onClick={() => { setIsAvatarModalOpen(true); setIsEditingAvatar(false); }}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <Avatar avatar={currentAvatar} size="sm" className="h-8 w-8" />
          </button>
        </div>
      </div>

      {renderContent()}

      {/* Reaction FAB */}
      <ReactionButton roomId={roomId!} className="fixed bottom-6 right-6 z-40" />

      <ConnectionBanner fromCache={fromCache} />

      {/* Avatar Modal */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-display text-2xl">
              {isEditingAvatar ? 'Avatár szerkesztése' : 'Avatárod'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            {!isEditingAvatar ? (
              <>
                <div className="mb-8">
                  <Avatar avatar={currentAvatar} size="xl" />
                </div>
                <Button
                  onClick={() => setIsEditingAvatar(true)}
                  className="w-full font-bold"
                  size="lg"
                >
                  Szerkesztés
                </Button>
              </>
            ) : (
              <AvatarSelector
                initialAvatar={currentAvatar}
                onSelect={handleAvatarUpdate}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayQuiz;
