import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Clock, CheckCircle2, Users, Send, Trophy, Smile, Zap, BarChart3, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isNormalizedMatch } from '@/lib/textNormalization';
import { requestEvaluateAnswer } from '@/services/ai';
import type { Room, Quiz, QuizQuestion, RoomParticipant, AvatarData, QuizAnswer } from '@/types/quiz';
import { Podium } from '@/components/quiz/Podium';
import { Avatar } from '@/components/quiz/Avatar';
import { AvatarSelector } from '@/components/quiz/AvatarSelector';
import { ReactionButton } from '@/components/quiz/ReactionButton';
import { MathRenderer } from '@/components/quiz/MathRenderer';
import {
  getRoomById,
  getQuizById,
  getRoomParticipants,
  getRoomAnswers,
  subscribeToRoom,
  subscribeToParticipants,
  updateRoom,
  updateParticipant,
  submitQuizAnswer,
} from '@/services/db';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const COLORS = [
  { bg: 'bg-quiz-red', icon: '▲', label: 'A' },
  { bg: 'bg-quiz-blue', icon: '◆', label: 'B' },
  { bg: 'bg-quiz-yellow', icon: '●', label: 'C' },
  { bg: 'bg-quiz-green', icon: '■', label: 'D' },
  { bg: 'bg-primary', icon: '★', label: 'E' },
  { bg: 'bg-secondary', icon: '♦', label: 'F' },
];

const calculateScore = (isCorrect: boolean, timeTakenMs: number, timeLimitMs: number): number => {
  if (!isCorrect) return 0;
  const timeRatio = Math.max(0, 1 - timeTakenMs / timeLimitMs);
  return Math.round(100 + timeRatio * 900);
};

export interface MatchingUserPair {
  leftId: string;
  rightId: string;
  colorIndex: number;
}

export const MATCHING_PAIR_COLORS = [
  {
    name: 'blue',
    bg: 'bg-blue-500/15 dark:bg-blue-500/20',
    border: 'border-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-600 text-white',
    ring: 'ring-2 ring-blue-500/50',
  },
  {
    name: 'emerald',
    bg: 'bg-emerald-500/15 dark:bg-emerald-500/20',
    border: 'border-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-600 text-white',
    ring: 'ring-2 ring-emerald-500/50',
  },
  {
    name: 'amber',
    bg: 'bg-amber-500/15 dark:bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-600 text-white',
    ring: 'ring-2 ring-amber-500/50',
  },
  {
    name: 'purple',
    bg: 'bg-purple-500/15 dark:bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-600 text-white',
    ring: 'ring-2 ring-purple-500/50',
  },
  {
    name: 'rose',
    bg: 'bg-rose-500/15 dark:bg-rose-500/20',
    border: 'border-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-600 text-white',
    ring: 'ring-2 ring-rose-500/50',
  },
  {
    name: 'cyan',
    bg: 'bg-cyan-500/15 dark:bg-cyan-500/20',
    border: 'border-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-600 text-white',
    ring: 'ring-2 ring-cyan-500/50',
  },
  {
    name: 'orange',
    bg: 'bg-orange-500/15 dark:bg-orange-500/20',
    border: 'border-orange-500',
    text: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-600 text-white',
    ring: 'ring-2 ring-orange-500/50',
  },
];

const PlayQuiz = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);
  const [completedAnswers, setCompletedAnswers] = useState<QuizAnswer[]>([]);
  const [showRanglistaBtn, setShowRanglistaBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [earnedScore, setEarnedScore] = useState(0);
  const [isEvaluatingAi, setIsEvaluatingAi] = useState(false);
  const [evaluationSource, setEvaluationSource] = useState<'exact' | 'normalized' | 'ai' | null>(null);
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [showStartCountdown, setShowStartCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [matchingState, setMatchingState] = useState<{
    selectedSide: 'left' | 'right' | null;
    selectedId: string | null;
    userPairs: MatchingUserPair[];
    shuffledLeft: { id: string; text: string }[];
    shuffledRight: { id: string; text: string }[];
  }>({
    selectedSide: null,
    selectedId: null,
    userPairs: [],
    shuffledLeft: [],
    shuffledRight: [],
  });
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
  // Which slot in the queue we're currently on (monotonically increasing → unique DB key)
  const globalSubmarineAnswerIndex = useRef(0);
  const currentQIndexRef = useRef(-1);

  // Helper: generate a shuffled array of indices 0..n-1
  const shuffleIndices = (n: number): number[] => {
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // The real quiz question to display for submarine mode
  const submarineActualQIndex = submarineQueue[0] ?? 0;

  const participantId = sessionStorage.getItem('participant_id');
  const studentName = sessionStorage.getItem('student_name');

  useEffect(() => {
    if (!participantId) {
      navigate('/join');
      return;
    }
    fetchRoomData();
  }, [roomId]);

  const fetchRoomData = async () => {
    if (!roomId) return;

    try {
      const roomData = await getRoomById(roomId);
      if (!roomData) {
        toast.error('Szoba nem található');
        navigate('/');
        return;
      }

      setRoom(roomData);
      currentQIndexRef.current = roomData.current_question_index;

      const [quizData, partData] = await Promise.all([
        getQuizById(roomData.quiz_id),
        getRoomParticipants(roomId),
      ]);

      if (quizData) {
        setQuiz(quizData);
      } else {
        toast.error('Kvíz adatok nem tölthetők be');
      }

      if (partData) {
        setParticipants(partData);
      }
    } catch (err) {
      console.error('Error fetching room data:', err);
      toast.error('Hiba történt az adatok betöltésekor');
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription
  useEffect(() => {
    if (!roomId) return;

    const unsubRoom = subscribeToRoom(roomId, (updatedRoom) => {
      if (!updatedRoom) return;

      setRoom(prev => {
        if (!prev) return updatedRoom;

        if (updatedRoom.current_question_index !== currentQIndexRef.current) {
          currentQIndexRef.current = updatedRoom.current_question_index;
          setAnswered(false);
          setSelectedAnswer(null);
          setTextAnswer('');
          setAnswerCorrect(null);
          setEarnedScore(0);
          setQuestionStartTime(Date.now());
          setIsEvaluatingAi(false);
          setEvaluationSource(null);
          setAiReason(null);
          setMatchingSummary(null);

          if (quiz && quiz.questions) {
            const question = quiz.questions[updatedRoom.current_question_index];
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
          }
        }

        // Trigger countdown if status changes from 'waiting' to 'active'
        if (prev.status === 'waiting' && updatedRoom.status === 'active') {
          setShowStartCountdown(true);
          setCountdownValue(3);
          const cdInterval = setInterval(() => {
            setCountdownValue(v => {
              if (v <= 1) {
                clearInterval(cdInterval);
                setTimeout(() => setShowStartCountdown(false), 1000);
                return 0;
              }
              return v - 1;
            });
          }, 1000);
        }

        return updatedRoom;
      });
    });

    const unsubParts = subscribeToParticipants(roomId, (updatedParts) => {
      // Check if current participant was kicked
      const currentParticipant = updatedParts.find(p => p.id === participantId);
      if (currentParticipant && currentParticipant.is_active === false) {
        toast.error('Ki lettél téve a szobából');
        sessionStorage.removeItem('participant_id');
        sessionStorage.removeItem('student_name');
        sessionStorage.removeItem('student_avatar');
        navigate('/join');
        return;
      }
      setParticipants(updatedParts);
    });

    return () => {
      unsubRoom();
      unsubParts();
    };
  }, [roomId, participantId, quiz]);

  // Timer countdown
  useEffect(() => {
    if (!room || room.status !== 'active' || !quiz || showStartCountdown) return;
    const question = quiz.questions[room.current_question_index];
    if (!question) return;

    const timeLimit = question.timeLimit || room.time_limit_seconds || 15;
    setTimer(timeLimit);
    setQuestionStartTime(Date.now());

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [room?.current_question_index, room?.status, showStartCountdown]);

  // Initial matching setup
  useEffect(() => {
    if (quiz && room && room.status === 'active' && matchingState.shuffledLeft.length === 0) {
      const qIdx = room.game_mode === 'submarine' ? submarineActualQIndex : room.current_question_index;
      const question = quiz.questions[qIdx];
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
    }
  }, [quiz, room?.current_question_index, room?.status, matchingState.shuffledLeft.length]);

  // Auto-submit matching when timer expires
  useEffect(() => {
    if (timer === 0 && !answered && room?.status === 'active' && quiz && !showStartCountdown) {
      const qIdx = room.game_mode === 'submarine' ? submarineActualQIndex : room.current_question_index;
      const question = quiz.questions[qIdx];
      if (question?.type === 'matching') {
        submitAnswer();
      }
    }
  }, [timer, answered, room?.status, quiz, showStartCountdown]);

  // Initialize submarine queue when quiz loads in submarine mode
  useEffect(() => {
    if (!quiz || !room || room.game_mode !== 'submarine' || submarineQueue.length > 0) return;
    setSubmarineQueue(shuffleIndices(quiz.questions.length));
  }, [quiz, room?.game_mode]);

  // Check if already answered this question (non-submarine only)
  useEffect(() => {
    if (!room || !participantId || room.status !== 'active') return;
    if (room.game_mode === 'submarine') return;

    const checkExistingAnswer = async () => {
      const answers = await getRoomAnswers(room.id, room.session_number);
      const existing = answers.find(
        (a) => a.participant_id === participantId && a.question_index === room.current_question_index
      );

      if (existing) {
        setAnswered(true);
        setAnswerCorrect(existing.is_correct);
        setEarnedScore((existing as any).score || 0);
        if ((existing.answer as any)?.correctPairs !== undefined) {
          setMatchingSummary({
            correctPairs: (existing.answer as any).correctPairs,
            totalPairs: (existing.answer as any).totalPairs,
          });
        }
      }
    };
    checkExistingAnswer();
  }, [room?.current_question_index, participantId, room?.status, room?.game_mode]);

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
    if (!room || !roomId) return;
    
    try {
      await updateRoom(roomId, {
        submarine_boosts: (room.submarine_boosts || 0) + 1,
      });

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

  const submitAnswer = async (optionId?: string) => {
    if (!room || !quiz || !participantId || answered || isEvaluatingAi) return;

    const isSubmarine = room.game_mode === 'submarine';
    // For submarine: use the current front of the shuffled queue as the actual question
    const questionIndex = isSubmarine ? submarineActualQIndex : room.current_question_index;
    // Unique DB key: for submarine, use the global monotonic counter
    const dbQuestionIndex = isSubmarine ? globalSubmarineAnswerIndex.current : room.current_question_index;
    const question = quiz.questions[questionIndex];
    if (!question) return;

    let isCorrect = false;
    let answerData: Record<string, unknown> = {};

    // Freeze response time immediately when submit is triggered
    const timeTaken = Date.now() - questionStartTime;
    const timeLimitMs = (question.timeLimit || room.time_limit_seconds || 15) * 1000;

    let evalSource: 'exact' | 'normalized' | 'ai' | undefined = undefined;
    let aiExplanation: string | undefined = undefined;

    if ((question.type === 'multiple-choice' || question.type === 'true-false') && optionId) {
      const selectedOption = (question.options || []).find((o) => o.id === optionId);
      isCorrect = selectedOption?.isCorrect || false;
      answerData = { selectedOptionId: optionId };
      setSelectedAnswer(optionId);
    } else if (question.type === 'text-input') {
      const trimmed = textAnswer.trim();
      const isExact = trimmed.toLowerCase() === (question.correctAnswer || '').trim().toLowerCase();

      if (isExact) {
        isCorrect = true;
        evalSource = 'exact';
      } else if (isNormalizedMatch(trimmed, question.correctAnswer)) {
        isCorrect = true;
        evalSource = 'normalized';
      } else {
        setIsEvaluatingAi(true);
        try {
          const aiResult = await requestEvaluateAnswer({
            questionText: question.text,
            studentAnswer: trimmed,
            correctAnswer: question.correctAnswer || '',
            gradeLevel: quiz.gradeLevel,
          });
          isCorrect = Boolean(aiResult.isCorrect);
          evalSource = 'ai';
          aiExplanation = aiResult.reason;
        } catch (err) {
          console.error('Error during AI answer evaluation:', err);
          isCorrect = false;
          evalSource = 'ai';
          aiExplanation = 'AI kiértékelési hiba, alapértelmezetten elutasítva.';
        } finally {
          setIsEvaluatingAi(false);
        }
      }

      answerData = {
        text: trimmed,
        evaluation_source: evalSource,
        ai_reason: aiExplanation,
      };
    } else if (question.type === 'matching') {
      const totalPairs = question.pairs?.length || 0;
      const userPairs = matchingStateRef.current.userPairs;
      const correctPairs = userPairs.filter(p => p.leftId === p.rightId).length;
      isCorrect = totalPairs > 0 && correctPairs === totalPairs;

      let proportionalScore = 0;
      if (totalPairs > 0 && correctPairs > 0) {
        if (isSubmarine) {
          proportionalScore = Math.round(1000 * (correctPairs / totalPairs));
        } else {
          const maxPossible = calculateScore(true, timeTaken, timeLimitMs);
          proportionalScore = Math.round(maxPossible * (correctPairs / totalPairs));
        }
      }

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
    
    // Calculate final score
    const score = question.type === 'matching'
      ? (answerData.correctPairs ? (isSubmarine ? Math.round(1000 * ((answerData.correctPairs as number) / (answerData.totalPairs as number))) : Math.round(calculateScore(true, timeTaken, timeLimitMs) * ((answerData.correctPairs as number) / (answerData.totalPairs as number)))) : 0)
      : (isSubmarine ? (isCorrect ? 1000 : 0) : calculateScore(isCorrect, timeTaken, timeLimitMs));

    try {
      await submitQuizAnswer({
        room_id: room.id,
        participant_id: participantId,
        question_index: dbQuestionIndex,
        answer: answerData,
        is_correct: isCorrect,
        time_taken_ms: timeTaken,
        score,
        session_number: room.session_number,
        evaluation_source: evalSource,
        ai_reason: aiExplanation,
      });
    } catch (error) {
      toast.error('Hiba a válasz elküldésekor');
      return;
    }

    setAnswered(true);
    setAnswerCorrect(isCorrect);
    setEarnedScore(score);
    setEvaluationSource(evalSource || null);
    setAiReason(aiExplanation || null);

    // Submarine progress tracking for boost
    if (isSubmarine && isCorrect) {
      const newCorrectCount = submarineCorrectStore + 1;
      setSubmarineCorrectStore(newCorrectCount);
      if (newCorrectCount >= 3) {
        setShowBoostButton(true);
      }
    }

    // Auto progress logic
    if (room.control_mode === 'auto' || isSubmarine) {
      setTimeout(() => {
        if (isSubmarine) {
          // Advance the global answer index (unique DB key)
          globalSubmarineAnswerIndex.current += 1;
          // Pop the front of the queue; refill with a new shuffled batch if running low
          setSubmarineQueue(prev => {
            const next = prev.slice(1);
            if (next.length < 3) {
              return [...next, ...shuffleIndices(quiz.questions.length)];
            }
            return next;
          });
        } else {
          const nextIndex = (room.current_question_index + 1) % quiz.questions.length;
          currentQIndexRef.current = nextIndex;
          setRoom((prev) => prev ? { ...prev, current_question_index: nextIndex } : prev);
        }
        
        setAnswered(false);
        setSelectedAnswer(null);
        setTextAnswer('');
        setAnswerCorrect(null);
        setEarnedScore(0);
        setQuestionStartTime(Date.now());
        setIsEvaluatingAi(false);
        setEvaluationSource(null);
        setAiReason(null);
        setMatchingSummary(null);
      }, 2000);
    }
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
              <span>{participants.length} résztvevő</span>
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
            <div className="mb-6 rounded-2xl bg-card/95 backdrop-blur-md p-6 text-center shadow-xl border border-primary/20">
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

            {/* Answer Feedback */}
            {answered && (
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
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/20 backdrop-blur-sm border border-white/20">
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
              <div className="sticky top-0 z-30 -mx-4 mb-6 bg-background/80 p-4 backdrop-blur-md border-b">
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
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={!answered ? { scale: 1.02 } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      onClick={() => !answered && submitAnswer(option.id)}
                      disabled={answered}
                      className={`flex items-center gap-4 rounded-xl p-5 text-left text-lg font-bold text-primary-foreground transition-all ${color.bg} ${answered
                        ? isSelected
                          ? 'ring-4 ring-foreground/30'
                          : 'opacity-50'
                        : 'hover:brightness-110 active:brightness-90'
                        }`}
                    >
                      <span className="text-2xl">{color.icon}</span>
                      <MathRenderer text={option.text || `Válasz ${i + 1}`} />
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
                    placeholder="Írd be a választ..."
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={answered || isEvaluatingAi}
                    className="h-14 text-center text-xl font-bold"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && textAnswer.trim() && !answered && !isEvaluatingAi) {
                        submitAnswer();
                      }
                    }}
                  />
                  <Button
                    className="w-full h-12 text-lg font-bold"
                    onClick={() => submitAnswer()}
                    disabled={answered || isEvaluatingAi || !textAnswer.trim()}
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
                          whileHover={!answered ? { scale: 1.01 } : {}}
                          whileTap={!answered ? { scale: 0.99 } : {}}
                          onClick={() => handleItemClick('left', item.id)}
                          className={cn(
                            "relative w-full rounded-2xl p-4 text-center font-medium transition-all shadow-sm flex flex-col items-center justify-center min-h-[72px] border-2",
                            isSelected && "ring-4 ring-primary border-primary bg-primary/10 shadow-md",
                            !isSelected && pairColor && cn(pairColor.bg, pairColor.border, pairColor.ring),
                            !isSelected && !pairColor && "bg-card border-border hover:border-primary/50 text-card-foreground",
                            answered && pair && (isPairCorrect ? "border-quiz-green bg-quiz-green/15" : "border-destructive bg-destructive/15")
                          )}
                        >
                          {/* Pair number badge */}
                          {pair && !answered && (
                            <span className={cn(
                              "absolute -top-2.5 -left-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm",
                              pairColor?.badge
                            )}>
                              {pair.colorIndex + 1}. pár
                            </span>
                          )}

                          {/* Reveal badge */}
                          {answered && pair && (
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
                          {answered && pair && !isPairCorrect && correctRight && (
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
                          whileHover={!answered ? { scale: 1.01 } : {}}
                          whileTap={!answered ? { scale: 0.99 } : {}}
                          onClick={() => handleItemClick('right', item.id)}
                          className={cn(
                            "relative w-full rounded-2xl p-4 text-center font-medium transition-all shadow-sm flex flex-col items-center justify-center min-h-[72px] border-2",
                            isSelected && "ring-4 ring-primary border-primary bg-primary/10 shadow-md",
                            !isSelected && pairColor && cn(pairColor.bg, pairColor.border, pairColor.ring),
                            !isSelected && !pairColor && "bg-card border-border hover:border-primary/50 text-card-foreground",
                            answered && pair && (isPairCorrect ? "border-quiz-green bg-quiz-green/15" : "border-destructive bg-destructive/15")
                          )}
                        >
                          {/* Pair number badge */}
                          {pair && !answered && (
                            <span className={cn(
                              "absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm",
                              pairColor?.badge
                            )}>
                              {pair.colorIndex + 1}. pár
                            </span>
                          )}

                          {/* Reveal badge */}
                          {answered && pair && (
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
                {!answered && (
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
            {question.type === 'true-false' && (
              <div className="flex flex-1 gap-4 items-center justify-center">
                <motion.button
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (answered) return;
                    const opt = (question.options || []).find(o => o.text === 'Igaz');
                    if (opt) submitAnswer(opt.id);
                    else toast.error('Hiba: Igaz válaszlehetőség nem található');
                  }}
                  disabled={answered}
                  className={`flex-1 max-w-sm h-32 rounded-2xl text-2xl font-bold text-primary-foreground transition-all bg-quiz-blue ${answered
                    ? selectedAnswer === (question.options || []).find(o => o.text === 'Igaz')?.id
                      ? 'ring-4 ring-foreground/30'
                      : 'opacity-50'
                    : 'hover:brightness-110 active:brightness-90'
                    }`}
                >
                  Igaz
                </motion.button>
                <motion.button
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (answered) return;
                    const opt = (question.options || []).find(o => o.text === 'Hamis');
                    if (opt) submitAnswer(opt.id);
                    else toast.error('Hiba: Hamis válaszlehetőség nem található');
                  }}
                  disabled={answered}
                  className={`flex-1 max-w-sm h-32 rounded-2xl text-2xl font-bold text-primary-foreground transition-all bg-quiz-red ${answered
                    ? selectedAnswer === (question.options || []).find(o => o.text === 'Hamis')?.id
                      ? 'ring-4 ring-foreground/30'
                      : 'opacity-50'
                    : 'hover:brightness-110 active:brightness-90'
                    }`}
                >
                  Hamis
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-background to-[#030712]">
      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-500/15 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border/70 bg-card/85 backdrop-blur-md px-4 py-3 z-10 shadow-sm">
        {room.status === 'active' ? (
          <>
            <div className="text-sm text-muted-foreground">
              {room.current_question_index + 1}/{quiz.questions.length}
            </div>
            <div className={`flex items-center gap-2 font-display text-xl font-bold ${timer <= 5 ? 'text-destructive' : 'text-foreground'}`}>
              <Clock className="h-5 w-5" />
              {timer}s
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
