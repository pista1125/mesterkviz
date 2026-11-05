export interface GenerateQuizParams {
  subject: string;
  topic: string;
  numQuestions: number;
  gradeLevel?: string;
  selectedTypes?: string[];
  includeTrueFalse?: boolean;
}

export interface GeneratedQuizResponse {
  title: string;
  description: string;
  questions: any[];
}

export const requestGenerateQuiz = async (params: GenerateQuizParams): Promise<GeneratedQuizResponse> => {
  const FUNCTION_URL = import.meta.env.VITE_FIREBASE_GENERATE_QUIZ_URL ||
    'https://europe-west1-mesterkviz-f52ce.cloudfunctions.net/generateQuiz';

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
    },
    body: JSON.stringify({
      subject: params.subject,
      topic: params.topic,
      numQuestions: params.numQuestions,
      gradeLevel: params.gradeLevel,
      selectedTypes,
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

  try {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
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
    return { isCorrect: false, reason: 'Hálózati hiba az AI kiértékelés során' };
  }
};
