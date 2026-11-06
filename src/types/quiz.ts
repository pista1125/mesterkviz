export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface AvatarData {
  character: string;
  accessory: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'matching' | 'true-false';
  text: string;
  imageUrl?: string;
  options: QuizOption[];
  correctAnswer?: string;
  pairs?: MatchingPair[];
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  teacher_id: string;
  title: string;
  description: string;
  subject: string;
  grade_level: string;
  topic?: string;
  questions: QuizQuestion[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  teacher_id: string;
  quiz_id: string;
  code: string;
  status: 'waiting' | 'active' | 'completed';
  class_name: string;
  grade: string;
  notes: string;
  control_mode: 'auto' | 'manual';
  game_mode: 'classic' | 'submarine';
  submarine_boosts: number;
  game_duration_seconds: number;
  time_limit_seconds: number;
  has_time_limit?: boolean;
  time_limit_mode?: 'quiz_preset' | 'unified' | 'unlimited';
  show_results_to_students?: boolean;
  current_question_index: number;
  session_number: number;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}

export interface RoomParticipant {
  id: string;
  room_id: string;
  student_name: string;
  student_session_id: string;
  joined_at: string;
  is_active: boolean;
  avatar?: AvatarData;
}

export interface QuizAnswer {
  id: string;
  room_id: string;
  participant_id: string;
  question_index: number;
  actual_question_index?: number;
  question_id?: string;
  answer: Record<string, unknown>;
  is_correct: boolean | null;
  time_taken_ms: number | null;
  score: number;
  session_number: number;
  answered_at: string;
  evaluation_source?: 'exact' | 'normalized' | 'ai';
  ai_reason?: string;
}

// Helper to generate a student session ID
export const getStudentSessionId = (): string => {
  let id = sessionStorage.getItem('student_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('student_session_id', id);
  }
  return id;
};

// Helper to generate a new question
export const createEmptyQuestion = (): QuizQuestion => ({
  id: crypto.randomUUID(),
  type: 'multiple-choice',
  text: '',
  options: [
    { id: crypto.randomUUID(), text: '', isCorrect: true },
    { id: crypto.randomUUID(), text: '', isCorrect: false },
    { id: crypto.randomUUID(), text: '', isCorrect: false },
    { id: crypto.randomUUID(), text: '', isCorrect: false },
  ],
  timeLimit: 15,
});

// Helper to normalize any partial / AI-generated question
export const normalizeQuestion = (q: Partial<QuizQuestion>): QuizQuestion => {
  const type = q.type || 'multiple-choice';
  let options = Array.isArray(q.options) ? q.options.map(o => ({
    id: o.id || crypto.randomUUID(),
    text: o.text || '',
    isCorrect: !!o.isCorrect,
  })) : [];
  let pairs = Array.isArray(q.pairs) ? q.pairs.map(p => ({
    id: p.id || crypto.randomUUID(),
    left: p.left || '',
    right: p.right || '',
  })) : [];

  if (type === 'true-false') {
    if (options.length !== 2 || !options.some(o => o.text === 'Igaz')) {
      const isTrueCorrect = q.correctAnswer?.toLowerCase().includes('igaz') ||
                            options.find(o => o.isCorrect)?.text === 'Igaz' ||
                            true;
      options = [
        { id: crypto.randomUUID(), text: 'Igaz', isCorrect: isTrueCorrect },
        { id: crypto.randomUUID(), text: 'Hamis', isCorrect: !isTrueCorrect },
      ];
    }
  } else if (type === 'multiple-choice') {
    if (options.length === 0) {
      options = [
        { id: crypto.randomUUID(), text: '', isCorrect: true },
        { id: crypto.randomUUID(), text: '', isCorrect: false },
        { id: crypto.randomUUID(), text: '', isCorrect: false },
        { id: crypto.randomUUID(), text: '', isCorrect: false },
      ];
    }
  }

  let imageUrl = q.imageUrl || '';
  if (imageUrl && (imageUrl.startsWith('<svg') || imageUrl.includes('<svg'))) {
    const svgMatch = imageUrl.match(/<svg[\s\S]*<\/svg>/i);
    const svgCode = svgMatch ? svgMatch[0] : imageUrl;
    imageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
  }

  return {
    id: q.id || crypto.randomUUID(),
    type,
    text: q.text || '',
    imageUrl,
    options,
    correctAnswer: q.correctAnswer || '',
    pairs,
    timeLimit: q.timeLimit || 15,
  };
};

// Generate a 6-digit room code
export const generateRoomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Quiz answer color mapping (Kahoot-style)
export const ANSWER_COLORS = [
  { bg: 'bg-quiz-red', hover: 'hover:bg-quiz-red/90', icon: '▲' },
  { bg: 'bg-quiz-blue', hover: 'hover:bg-quiz-blue/90', icon: '◆' },
  { bg: 'bg-quiz-yellow', hover: 'hover:bg-quiz-yellow/90', icon: '●' },
  { bg: 'bg-quiz-green', hover: 'hover:bg-quiz-green/90', icon: '■' },
] as const;


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

export const isRoomUnlimitedTime = (
  room?: Pick<Room, 'time_limit_mode' | 'has_time_limit' | 'time_limit_seconds'> | null
): boolean => {
  if (!room) return false;
  if (room.time_limit_mode === 'unlimited') return true;
  if (room.has_time_limit === false) return true;
  if (room.time_limit_seconds === 0) return true;
  return false;
};

export const getQuestionEffectiveTimeLimit = (
  room?: Pick<Room, 'time_limit_mode' | 'has_time_limit' | 'time_limit_seconds'> | null,
  question?: Pick<QuizQuestion, 'timeLimit'> | null
): number => {
  if (!room) return question?.timeLimit || 15;
  if (isRoomUnlimitedTime(room)) return 999;

  // Unified mode forces all questions to use room.time_limit_seconds
  if (room.time_limit_mode === 'unified' && room.time_limit_seconds && room.time_limit_seconds > 0) {
    return room.time_limit_seconds;
  }

  // Quiz preset mode (or legacy default) respects each question's individual time limit
  return question?.timeLimit || (room.time_limit_seconds && room.time_limit_seconds > 0 ? room.time_limit_seconds : 15);
};
