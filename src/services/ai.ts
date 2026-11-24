export interface GenerateQuizParams {
  subject: string;
  topic: string;
  numQuestions: number;
  gradeLevel?: string;
  selectedTypes?: string[];
  includeTrueFalse?: boolean;
  generateSvg?: boolean;
}

import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '@/integrations/firebase/config';

export interface QuotaInfo {
  used: number;
  limit: number;
  remaining: number;
}

export interface GeneratedQuizResponse {
  title: string;
  description: string;
  questions: any[];
  quota?: QuotaInfo;
}

/** A keret elfogyását jelző hiba (HTTP 429) – a felület ez alapján tiltja a gombot. */
export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaExceededError';
  }
}

export interface MyAiQuota extends QuotaInfo {
  month: string;
  isAdmin: boolean;
  adminNeedsVerification: boolean;
}

export const getMyAiQuota = async (): Promise<MyAiQuota> => {
  const fn = httpsCallable<void, MyAiQuota>(functions, 'getAiQuota');
  const res = await fn();
  return res.data;
};

export const requestGenerateQuiz = async (params: GenerateQuizParams): Promise<GeneratedQuizResponse> => {
  const FUNCTION_URL = import.meta.env.VITE_FIREBASE_GENERATE_QUIZ_URL ||
    'https://europe-west1-mesterkviz-f52ce.cloudfunctions.net/generateQuiz';

  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.isAnonymous) {
    throw new Error('Az AI generáláshoz jelentkezz be tanári fiókkal.');
  }
  const idToken = await currentUser.getIdToken();

  // Format selected types
  let selectedTypes = params.selectedTypes;
  if (!selectedTypes && params.includeTrueFalse !== undefined) {
    selectedTypes = params.includeTrueFalse
      ? ['multiple-choice', 'true-false', 'text-input']
      : ['multiple-choice', 'text-input'];
  }

  const response = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      subject: params.subject,
      topic: params.topic,
      numQuestions: params.numQuestions,
      gradeLevel: params.gradeLevel,
      selectedTypes,
      generateSvg: params.generateSvg ?? false,
    }),
  });

  if (!response.ok) {
    let errorMsg = `Hiba a kvíz generálásakor (${response.status})`;
    try {
      const errJson = await response.json();
      if (errJson?.error) errorMsg = errJson.error;
    } catch {
      // ignore
    }
    if (response.status === 429) throw new QuotaExceededError(errorMsg);
    throw new Error(errorMsg);
  }

  const data = await response.json();
  if (data?.error) {
    throw new Error(data.error);
  }

  return data as GeneratedQuizResponse;
};


export interface EvaluateAnswerParams {
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  gradeLevel?: string;
}

export interface EvaluateAnswerResponse {
  isCorrect: boolean;
  reason?: string;
}

export const requestEvaluateAnswer = async (
  params: EvaluateAnswerParams
): Promise<EvaluateAnswerResponse> => {
  const FUNCTION_URL =
    import.meta.env.VITE_FIREBASE_EVALUATE_ANSWER_URL ||
    'https://europe-west1-mesterkviz-f52ce.cloudfunctions.net/evaluateAnswer';

  // Időkorlát: hidegindítás vagy lassú OpenAI esetén se ragadjon be a diák
  // "AI ellenőrzi..." állapotban.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`evaluateAnswer request failed with status ${response.status}`);
      return { isCorrect: false, reason: 'AI kiértékelési hiba' };
    }

    const data = await response.json();
    return {
      isCorrect: Boolean(data?.isCorrect),
      reason: data?.reason || '',
    };
  } catch (err) {
    console.error('Error calling evaluateAnswer function:', err);
    const timedOut = err instanceof DOMException && err.name === 'AbortError';
    return {
      isCorrect: false,
      reason: timedOut ? 'Az AI ellenőrzés túl sokáig tartott' : 'Hálózati hiba az AI kiértékelés során',
    };
  } finally {
    clearTimeout(timeoutId);
  }
};
