import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  Download,
  Trophy,
  CheckCircle2,
  XCircle,
  History,
  Users,
  HelpCircle,
  Clock,
  BarChart3,
  Check,
  FileSpreadsheet,
  ChevronDown,
  ChevronsUpDown,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/quiz/Avatar';
import { Podium } from '@/components/quiz/Podium';
import { MathRenderer } from '@/components/quiz/MathRenderer';
import { isNormalizedMatch } from '@/lib/textNormalization';
import type { Room, Quiz, QuizQuestion, RoomParticipant, QuizAnswer } from '@/types/quiz';
import { getRoomById, getQuizById, getRoomParticipants, getRoomAnswers } from '@/services/db';

const QUESTION_TYPE_LABELS: Record<string, string> = {
  'multiple-choice': 'Feleletválasztós',
  'text-input': 'Szöveges válasz',
  'matching': 'Párosítás',
  'true-false': 'Igaz / Hamis',
};

// Compact SVG Circular Progress Chart for questions
const CircularScore: React.FC<{ correct: number; total: number; size?: number }> = ({
  correct,
  total,
  size = 38,
}) => {
  if (total === 0) {
    return (
      <div
        className="rounded-full bg-muted/60 border border-border/50 flex items-center justify-center text-[10px] text-muted-foreground font-mono shrink-0"
        style={{ width: size, height: size }}
        title="Még nem érkezett válasz"
      >
        0%
      </div>
    );
  }

  const percent = Math.round((correct / total) * 100);
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const correctStroke = (percent / 100) * circumference;

  const color = percent >= 70 ? '#22c55e' : percent >= 40 ? '#eab308' : '#ef4444';

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      title={`${correct} / ${total} jó válasz (${percent}%)`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(239, 68, 68, 0.25)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - correctStroke}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-[10px] font-black font-mono tracking-tight" style={{ color }}>
        {percent}%
      </span>
    </div>
  );
};

const Results = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [allParticipants, setAllParticipants] = useState<RoomParticipant[]>([]);
  const [allAnswers, setAllAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [resultsTab, setResultsTab] = useState<'students' | 'questions'>('students');

  // State for collapsible views
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (!roomData) {
          navigate('/');
          return;
        }

        setRoom(roomData);
        setSelectedSession(roomData.session_number);

        const [quizData, partData, ansData] = await Promise.all([
          getQuizById(roomData.quiz_id),
          getRoomParticipants(roomId),
          getRoomAnswers(roomId),
        ]);

        if (quizData) setQuiz(quizData);
        if (partData) setAllParticipants(partData);
        if (ansData) setAllAnswers(ansData);
      } catch (err: any) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId, navigate]);

  // Resolves the actual question index in quiz.questions for any answer (handles submarine & classic modes)
  const getAnswerQuestionIndex = (ans: QuizAnswer, questions: QuizQuestion[]): number => {
    if (typeof (ans as any).actual_question_index === 'number' && (ans as any).actual_question_index >= 0) {
      return (ans as any).actual_question_index;
    }
    if ((ans as any).question_id) {
      const idx = questions.findIndex((q) => q.id === (ans as any).question_id);
      if (idx !== -1) return idx;
    }
    const rawAns: any = ans.answer;
    if (typeof rawAns?.actualQuestionIndex === 'number' && rawAns.actualQuestionIndex >= 0) {
      return rawAns.actualQuestionIndex;
    }
    if (rawAns?.questionId) {
      const idx = questions.findIndex((q) => q.id === rawAns.questionId);
      if (idx !== -1) return idx;
    }
    // Match by option id
    const pickedId = rawAns?.selectedOptionId || rawAns?.optionId || rawAns?.id;
    if (pickedId) {
      const foundIdx = questions.findIndex((q) => q.options?.some((o) => o.id === pickedId));
      if (foundIdx !== -1) return foundIdx;
    }
    // Match by matching pairs
    if (rawAns?.pairs && Array.isArray(rawAns.pairs) && rawAns.pairs.length > 0) {
      const pairId = rawAns.pairs[0]?.leftId || rawAns.pairs[0]?.id;
      if (pairId) {
        const foundIdx = questions.findIndex((q) => q.pairs?.some((p) => p.id === pairId));
        if (foundIdx !== -1) return foundIdx;
      }
    }
    // Match by text answer
    if (rawAns?.text && typeof rawAns.text === 'string') {
      const txt = rawAns.text.trim().toLowerCase();
      const foundIdx = questions.findIndex((q) =>
        q.type === 'text-input' && (
          q.correctAnswer?.trim().toLowerCase() === txt ||
          isNormalizedMatch(rawAns.text, q.correctAnswer)
        )
      );
      if (foundIdx !== -1) return foundIdx;
    }
    return ans.question_index;
  };

  // Helper to determine if an answer chose a specific option
  const isOptionPicked = (
    ans: QuizAnswer,
    opt: { id?: string; text?: string; isCorrect?: boolean },
    q: QuizQuestion
  ): boolean => {
    const rawAns: any = ans.answer;
    if (!rawAns || rawAns.timeout) return false;

    const pickedId = rawAns?.selectedOptionId || rawAns?.optionId || rawAns?.id;
    if (pickedId && opt.id && pickedId === opt.id) return true;
    if (rawAns?.selectedOptionText && opt.text && rawAns.selectedOptionText.trim() === opt.text.trim()) return true;
    if (rawAns?.text && opt.text && typeof rawAns.text === 'string' && rawAns.text.trim() === opt.text.trim()) return true;
    if (typeof rawAns === 'string') {
      if (opt.id && rawAns === opt.id) return true;
      if (opt.text && rawAns.trim() === opt.text.trim()) return true;
    }
    // Fallback: if student answered correctly and this is the only correct option in question
    if (ans.is_correct && opt.isCorrect && q.options?.filter((o) => o.isCorrect).length === 1 && !pickedId) {
      return true;
    }
    return false;
  };

  // Get unique session numbers
  const sessions = Array.from(new Set(allAnswers.map((a) => (a as any).session_number || 1))).sort((a, b) => b - a);

  // Student results per session with sanitized time calculation
  const getStudentResults = (sessionNum: number) => {
    const sessionAnswers = allAnswers.filter((a) => ((a as any).session_number || 1) === sessionNum);
    const participantIds = new Set(sessionAnswers.map((a) => a.participant_id));
    const sessionParticipants = allParticipants.filter((p) => participantIds.has(p.id));

    return sessionParticipants.map((p) => {
      const studentAnswers = sessionAnswers.filter((a) => a.participant_id === p.id);
      const correct = studentAnswers.filter((a) => a.is_correct).length;
      const total = quiz?.questions.length || 0;
      const totalScore = studentAnswers.reduce((sum, a) => sum + ((a as any).score || 0), 0);

      // Sanitize time: filter out unreasonable timestamp values (e.g. epoch times > 5 minutes)
      const validTimes = studentAnswers
        .map((a) => a.time_taken_ms)
        .filter((t): t is number => typeof t === 'number' && t > 50 && t < 300000);

      const avgTime = validTimes.length > 0
        ? Math.round(validTimes.reduce((sum, t) => sum + t, 0) / validTimes.length / 1000 * 10) / 10
        : 0;

      return {
        ...p,
        correct,
        total,
        totalScore,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
        avgTime,
        answered: studentAnswers.length,
      };
    }).sort((a, b) => b.totalScore - a.totalScore || a.avgTime - b.avgTime);
  };

  // Helper to get formatted answer string
  const formatStudentAnswer = (q: QuizQuestion, rawAns: any): string => {
    if (!rawAns) return 'Nem válaszolt';
    if (rawAns.timeout) return 'Lejárt az idő';
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      if (rawAns.selectedOptionText) return rawAns.selectedOptionText;
      const optId = rawAns.selectedOptionId || rawAns.optionId || rawAns.id;
      const opt = q.options?.find((o) => o.id === optId);
      if (opt) return opt.text;
      if (typeof rawAns.text === 'string' && rawAns.text) return rawAns.text;
      if (typeof rawAns === 'string') return rawAns;
      return 'Kijelölt opció';
    }
    if (q.type === 'text-input') {
      return rawAns.text || rawAns.value || (typeof rawAns === 'string' ? rawAns : '–');
    }
    if (q.type === 'matching') {
      const pairs = rawAns.pairs;
      if (Array.isArray(pairs)) {
        return `${rawAns.correctPairs ?? pairs.filter((p: any) => p.isCorrect).length} / ${rawAns.totalPairs ?? pairs.length} helyes pár`;
      }
      return 'Párosítás beküldve';
    }
    return typeof rawAns === 'string' ? rawAns : '–';
  };

  // Export CSV by Students
  const exportStudentsCSV = (sessionNum: number) => {
    if (!quiz) return;
    const sessionAnswers = allAnswers.filter((a) => ((a as any).session_number || 1) === sessionNum);

    const headers = ['Név', 'Kérdés #', 'Kérdés', 'Válasz', 'Helyes?', 'Pontszám', 'Idő (mp)', 'Időpont'];
    const rows = sessionAnswers.map((ans) => {
      const participant = allParticipants.find((p) => p.id === ans.participant_id);
      const actualIdx = getAnswerQuestionIndex(ans, quiz.questions);
      const question = quiz.questions[actualIdx];
      const answerText = question ? formatStudentAnswer(question, ans.answer) : '';
      const safeTimeSec = ans.time_taken_ms && ans.time_taken_ms < 300000
        ? (ans.time_taken_ms / 1000).toFixed(1)
        : '';

      return [
        `"${(participant?.student_name || '').replace(/"/g, '""')}"`,
        actualIdx + 1,
        `"${(question?.text || '').replace(/"/g, '""')}"`,
        `"${answerText.replace(/"/g, '""')}"`,
        ans.is_correct ? 'Igen' : 'Nem',
        ans.score || 0,
        safeTimeSec,
        ans.answered_at || '',
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eredmenyek-resztvevok-${room?.code}-session${sessionNum}.csv`;
    a.click();
  };

  // Export CSV by Questions
  const exportQuestionsCSV = (sessionNum: number) => {
    if (!quiz) return;
    const sessionAnswers = allAnswers.filter((a) => ((a as any).session_number || 1) === sessionNum);
    const totalStudents = currentSessionResults.length;

    const headers = ['#', 'Kérdés', 'Típus', 'Helyes válaszok', 'Összes válasz', 'Sikeresség %', 'Átlag idő (mp)'];
    const rows = quiz.questions.map((q, idx) => {
      const qAnswers = sessionAnswers.filter((a) => getAnswerQuestionIndex(a, quiz.questions) === idx);
      const correctCount = qAnswers.filter((a) => a.is_correct).length;
      const totalAnswers = qAnswers.length;
      const successRate = totalAnswers > 0 ? Math.round((correctCount / totalAnswers) * 100) : 0;

      const validTimes = qAnswers
        .map((a) => a.time_taken_ms)
        .filter((t): t is number => typeof t === 'number' && t > 50 && t < 300000);
      const avgTimeSec = validTimes.length > 0
        ? (validTimes.reduce((sum, t) => sum + t, 0) / validTimes.length / 1000).toFixed(1)
        : '0';

      return [
        idx + 1,
        `"${q.text.replace(/"/g, '""')}"`,
        QUESTION_TYPE_LABELS[q.type] || q.type,
        correctCount,
        `${totalAnswers} / ${totalStudents}`,
        `${successRate}%`,
        avgTimeSec,
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eredmenyek-kerdesek-${room?.code}-session${sessionNum}.csv`;
    a.click();
  };

  const isTeacher = user && room && user.id === room.teacher_id;
  const currentSessionResults = selectedSession ? getStudentResults(selectedSession) : [];
  const currentSessionAnswers = selectedSession
    ? allAnswers.filter((a) => ((a as any).session_number || 1) === selectedSession)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Betöltés...</p>
        </div>
      </div>
    );
  }

  if (!room || !quiz) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-[#030712]">
      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[500px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full" />
      <Navbar />
      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(isTeacher ? '/dashboard' : '/')}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Vissza
            </Button>
            <h1 className="font-display text-2xl font-bold">Kvíz Eredmények</h1>
          </div>

          {/* CSV Export Buttons for Teachers */}
          {isTeacher && selectedSession && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportStudentsCSV(selectedSession)}
                className="text-xs h-9"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Diákok CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportQuestionsCSV(selectedSession)}
                className="text-xs h-9"
              >
                <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Kérdések CSV
              </Button>
            </div>
          )}
        </div>

        {/* Summary Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="py-6 text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary truncate px-2">{quiz.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">Kvíz neve</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="py-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{currentSessionResults.length}</div>
              <p className="mt-1 text-sm text-muted-foreground">Résztvevő diák</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="py-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{quiz.questions.length}</div>
              <p className="mt-1 text-sm text-muted-foreground">Összes kérdés</p>
            </CardContent>
          </Card>
        </div>

        {/* Session selector */}
        {sessions.length > 1 && (
          <div className="mb-6">
            <Tabs value={String(selectedSession)} onValueChange={(v) => setSelectedSession(Number(v))}>
              <TabsList className="bg-muted/60 p-1">
                {sessions.map((s) => (
                  <TabsTrigger key={s} value={String(s)} className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    {s}. menet
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Top 3 Podium (Only on Students tab) */}
        {resultsTab === 'students' && currentSessionResults.length > 0 && (
          <div className="mb-8">
            <Podium winners={currentSessionResults.slice(0, 3) as any} />
          </div>
        )}

        {/* Main Results Card with Tabs: Students vs Questions */}
        <Card className="border-border/70 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold">Részletes Eredmények</CardTitle>
                <CardDescription>
                  Elemezd az eredményeket a résztvevő diákok vagy a feltett kérdések szerint
                </CardDescription>
              </div>

              {/* View Selector Tabs */}
              <Tabs value={resultsTab} onValueChange={(v) => setResultsTab(v as any)} className="w-auto">
                <TabsList className="grid grid-cols-2 w-full sm:w-[320px] bg-muted/80">
                  <TabsTrigger value="students" className="flex items-center gap-1.5 text-xs font-semibold">
                    <Users className="h-4 w-4" />
                    <span>Résztvevők ({currentSessionResults.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="flex items-center gap-1.5 text-xs font-semibold">
                    <HelpCircle className="h-4 w-4" />
                    <span>Kérdések ({quiz.questions.length})</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            {/* TAB 1: PARTICIPANTS TAB WITH EXPANDABLE STUDENT DETAILS */}
            {resultsTab === 'students' && (
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Név</TableHead>
                      <TableHead className="text-center">Helyes válaszok</TableHead>
                      <TableHead className="text-center">Összpontszám</TableHead>
                      <TableHead className="text-center">Százalék</TableHead>
                      <TableHead className="text-center">Átlag idő</TableHead>
                      <TableHead className="w-12 text-center">Részletek</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSessionResults.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                          Ebben a menetben még nem érkezett beküldött válasz.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentSessionResults.map((student, i) => {
                        const isExpanded = expandedStudentId === student.id;

                        return (
                          <React.Fragment key={student.id}>
                            <TableRow
                              onClick={() => setExpandedStudentId((prev) => (prev === student.id ? null : student.id))}
                              className="cursor-pointer hover:bg-muted/30 transition-colors"
                            >
                              <TableCell className="font-bold text-center">{i + 1}.</TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2.5">
                                  <Avatar avatar={student.avatar as any} size="sm" className="h-8 w-8" />
                                  <span className="font-semibold">{student.student_name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="inline-flex items-center justify-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>{student.correct} / {student.total}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="inline-flex items-center justify-center gap-1 font-bold text-primary">
                                  <Trophy className="h-4 w-4" />
                                  <span>{student.totalScore}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant={student.percentage >= 70 ? 'default' : student.percentage >= 40 ? 'secondary' : 'destructive'}
                                  className="font-bold px-2.5 py-0.5"
                                >
                                  {student.percentage}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center text-muted-foreground font-mono text-xs">
                                {student.avgTime > 0 ? `${student.avgTime}s` : '–'}
                              </TableCell>
                              <TableCell className="text-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedStudentId((prev) => (prev === student.id ? null : student.id));
                                  }}
                                  title={isExpanded ? 'Részletek elrejtése' : 'Részletes válaszok megtekintése'}
                                >
                                  <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180 text-primary')} />
                                </Button>
                              </TableCell>
                            </TableRow>

                            {/* Expanded Panel for Student's individual answers */}
                            {isExpanded && (
                              <TableRow className="bg-muted/15 border-b border-border/60 hover:bg-muted/15">
                                <TableCell colSpan={7} className="p-3 sm:p-5">
                                  <div className="space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                                      <div className="flex items-center gap-2">
                                        <Avatar avatar={student.avatar as any} size="sm" className="h-6 w-6" />
                                        <span className="font-bold text-sm text-foreground">{student.student_name} részletes válaszai</span>
                                      </div>
                                      <div className="text-xs font-semibold text-muted-foreground">
                                        {student.correct} helyes / {student.total} kérdésből ({student.percentage}%)
                                      </div>
                                    </div>

                                    <div className="grid gap-2.5 sm:grid-cols-2">
                                      {quiz.questions.map((q, qIdx) => {
                                        const sAnswer = currentSessionAnswers.find(
                                          (a) => a.participant_id === student.id && getAnswerQuestionIndex(a, quiz.questions) === qIdx
                                        );

                                        const isAnswered = Boolean(sAnswer);
                                        const isCorrect = Boolean(sAnswer?.is_correct);
                                        const isTimeout = Boolean((sAnswer?.answer as any)?.timeout);
                                        const ansText = sAnswer ? formatStudentAnswer(q, sAnswer.answer) : 'Nem válaszolt';
                                        const timeSec = sAnswer?.time_taken_ms && sAnswer.time_taken_ms < 300000
                                          ? (sAnswer.time_taken_ms / 1000).toFixed(1)
                                          : null;

                                        let correctText = '';
                                        if (q.type === 'multiple-choice' || q.type === 'true-false') {
                                          correctText = q.options?.find((o) => o.isCorrect)?.text || '';
                                        } else if (q.type === 'text-input') {
                                          correctText = q.correctAnswer || '';
                                        }

                                        return (
                                          <div
                                            key={q.id || qIdx}
                                            className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-2 transition-all ${
                                              !isAnswered || isTimeout
                                                ? 'border-border/40 bg-muted/10 opacity-75'
                                                : isCorrect
                                                ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20'
                                                : 'border-rose-500/40 bg-rose-500/5 dark:bg-rose-950/20'
                                            }`}
                                          >
                                            <div className="flex items-start justify-between gap-2">
                                              <div className="font-semibold text-foreground/95 line-clamp-2">
                                                <span className="font-mono text-muted-foreground mr-1.5 font-bold">{qIdx + 1}.</span>
                                                <MathRenderer text={q.text} />
                                              </div>
                                              {isAnswered && !isTimeout ? (
                                                isCorrect ? (
                                                  <Badge variant="outline" className="shrink-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 gap-1 text-[11px] font-bold">
                                                    <CheckCircle2 className="h-3 w-3" /> Helyes
                                                  </Badge>
                                                ) : (
                                                  <Badge variant="outline" className="shrink-0 bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 gap-1 text-[11px] font-bold">
                                                    <XCircle className="h-3 w-3" /> Hibás
                                                  </Badge>
                                                )
                                              ) : (
                                                <Badge variant="outline" className="shrink-0 text-muted-foreground text-[10px]">
                                                  {isTimeout ? 'Lejárt idő' : 'Nem válaszolt'}
                                                </Badge>
                                              )}
                                            </div>

                                            <div className="space-y-1 pt-1.5 border-t border-border/30">
                                              <div className="flex items-center justify-between gap-2 text-[11px]">
                                                <span className="text-muted-foreground">Diák válasza:</span>
                                                <span className="font-bold text-foreground truncate max-w-[220px]" title={ansText}>
                                                  {ansText}
                                                </span>
                                              </div>
                                              {!isCorrect && correctText && (
                                                <div className="flex items-center justify-between gap-2 text-[11px] text-emerald-600 dark:text-emerald-400">
                                                  <span className="font-medium">Helyes megoldás:</span>
                                                  <span className="font-bold truncate max-w-[220px]" title={correctText}>
                                                    {correctText}
                                                  </span>
                                                </div>
                                              )}
                                              {timeSec && (
                                                <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground font-mono">
                                                  <span>Válaszidő:</span>
                                                  <span>{timeSec}s</span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* TAB 2: QUESTIONS TAB - COLLAPSIBLE ACCORDION WITH CIRCULAR SCORE */}
            {resultsTab === 'questions' && (
              <div className="space-y-4">
                {/* Expand / Collapse All Controls */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <div className="text-xs text-muted-foreground font-medium">
                    Kattints egy kérdésre a válaszlehetőségek és az egyéni diákválaszok kibontásához:
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedQuestions(quiz.questions.map((_, i) => `q-${i}`))}
                      className="text-xs h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Maximize2 className="mr-1 h-3.5 w-3.5" />
                      Összes kinyitása
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedQuestions([])}
                      className="text-xs h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Minimize2 className="mr-1 h-3.5 w-3.5" />
                      Összes becsukása
                    </Button>
                  </div>
                </div>

                <Accordion
                  type="multiple"
                  value={expandedQuestions}
                  onValueChange={setExpandedQuestions}
                  className="space-y-3"
                >
                  {quiz.questions.map((q, qIdx) => {
                    // Match answers specifically for this question
                    const qAnswers = currentSessionAnswers.filter((a) => getAnswerQuestionIndex(a, quiz.questions) === qIdx);
                    const correctCount = qAnswers.filter((a) => a.is_correct).length;
                    const incorrectCount = qAnswers.length - correctCount;
                    const totalStudents = currentSessionResults.length;
                    const successRate = qAnswers.length > 0 ? Math.round((correctCount / qAnswers.length) * 100) : 0;

                    // Average time for this specific question
                    const validTimes = qAnswers
                      .map((a) => a.time_taken_ms)
                      .filter((t): t is number => typeof t === 'number' && t > 50 && t < 300000);
                    const qAvgTime = validTimes.length > 0
                      ? Math.round(validTimes.reduce((sum, t) => sum + t, 0) / validTimes.length / 1000 * 10) / 10
                      : 0;

                    return (
                      <AccordionItem
                        key={q.id || qIdx}
                        value={`q-${qIdx}`}
                        className="border border-border/80 rounded-xl overflow-hidden shadow-xs bg-card/60 backdrop-blur-sm"
                      >
                        {/* Collapsed Header / Trigger */}
                        <AccordionTrigger className="hover:no-underline py-3 px-4 hover:bg-muted/30 transition-colors">
                          <div className="flex flex-1 flex-wrap items-center justify-between gap-3 text-left mr-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Badge variant="outline" className="font-bold font-mono text-xs bg-background shrink-0">
                                #{qIdx + 1}
                              </Badge>

                              {/* Compact circular score diagram */}
                              <CircularScore correct={correctCount} total={qAnswers.length} size={36} />

                              <div className="font-semibold text-sm text-foreground truncate max-w-[260px] sm:max-w-[420px] md:max-w-[540px]">
                                <MathRenderer text={q.text} />
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0 ml-auto">
                              <Badge variant="secondary" className="text-[11px] hidden sm:inline-flex">
                                {QUESTION_TYPE_LABELS[q.type] || q.type}
                              </Badge>

                              {qAvgTime > 0 && (
                                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {qAvgTime}s
                                </span>
                              )}

                              <Badge
                                variant={successRate >= 70 ? 'default' : successRate >= 40 ? 'secondary' : 'destructive'}
                                className="font-bold text-xs px-2.5 py-0.5"
                              >
                                {correctCount} / {qAnswers.length} jó válasz ({successRate}%)
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>

                        {/* Expanded Content: Question details, option breakdown & student choices */}
                        <AccordionContent className="pt-2 pb-5 px-5 border-t border-border/40 space-y-4">
                          {/* Full Question Text */}
                          <div className="text-base font-semibold leading-relaxed text-foreground pt-1">
                            <MathRenderer text={q.text} />
                          </div>

                          {/* Optional Question Image */}
                          {q.imageUrl && (
                            <div className="max-w-md rounded-lg overflow-hidden border">
                              <img src={q.imageUrl} alt="Kérdés ábra" className="w-full h-auto object-cover max-h-48" />
                            </div>
                          )}

                          {/* Dual color progress bar: green (correct) vs red (incorrect) */}
                          <div className="p-3 rounded-xl bg-muted/20 border border-border/50">
                            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex">
                              {qAnswers.length > 0 ? (
                                <>
                                  <div
                                    className="h-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${(correctCount / qAnswers.length) * 100}%` }}
                                    title={`${correctCount} helyes válasz`}
                                  />
                                  <div
                                    className="h-full bg-rose-500 transition-all duration-500"
                                    style={{ width: `${(incorrectCount / qAnswers.length) * 100}%` }}
                                    title={`${incorrectCount} helytelen válasz`}
                                  />
                                </>
                              ) : (
                                <div className="h-full bg-muted-foreground/20 w-full" />
                              )}
                            </div>
                            <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5 font-medium">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{correctCount} helyes ({successRate}%)</span>
                              <span>{qAnswers.length} / {totalStudents} diák válaszolt</span>
                              <span className="text-rose-600 dark:text-rose-400 font-bold">{incorrectCount} hibás ({100 - successRate}%)</span>
                            </div>
                          </div>

                          {/* Options Breakdown for Multiple Choice & True/False */}
                          {q.type === 'multiple-choice' || q.type === 'true-false' ? (
                            <div className="space-y-2">
                              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Válaszlehetőségek és diákok választásai:
                              </div>
                              <div className="grid gap-2.5 sm:grid-cols-2">
                                {q.options?.map((opt, optIdx) => {
                                  const pickedCount = qAnswers.filter((a) => isOptionPicked(a, opt, q)).length;
                                  const pickPercent = qAnswers.length > 0
                                    ? Math.round((pickedCount / qAnswers.length) * 100)
                                    : 0;

                                  return (
                                    <div
                                      key={opt.id || optIdx}
                                      className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                                        opt.isCorrect
                                          ? 'border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-950/30 ring-1 ring-emerald-500/30'
                                          : 'border-border/60 bg-muted/20'
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 font-medium text-sm">
                                          {opt.isCorrect && (
                                            <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                                            </div>
                                          )}
                                          <MathRenderer text={opt.text} />
                                        </div>
                                        {opt.isCorrect && (
                                          <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-bold">
                                            Helyes válasz
                                          </Badge>
                                        )}
                                      </div>

                                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1.5 border-t border-border/40">
                                        <span className="font-medium">{pickedCount} diák jelölte</span>
                                        <span className="font-bold text-foreground">{pickPercent}%</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : q.type === 'text-input' ? (
                            <div className="rounded-xl border p-3.5 bg-muted/20 space-y-2">
                              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                <span>Helyes válasz / megoldás:</span>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold text-xs">
                                  {q.correctAnswer || '–'}
                                </Badge>
                              </div>
                            </div>
                          ) : q.type === 'matching' ? (
                            <div className="space-y-2">
                              <div className="text-xs font-semibold text-muted-foreground">Helyes párok:</div>
                              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                {q.pairs?.map((p, pIdx) => (
                                  <div key={p.id || pIdx} className="p-2.5 rounded-lg border bg-muted/20 text-xs flex items-center justify-between gap-2">
                                    <span className="font-medium"><MathRenderer text={p.left} /></span>
                                    <span className="text-muted-foreground">⇄</span>
                                    <span className="font-bold text-primary"><MathRenderer text={p.right} /></span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {/* Student Answers for this specific question */}
                          <div className="space-y-2 pt-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Diákok válaszai erre a kérdésre ({qAnswers.length} válasz):
                            </div>
                            {qAnswers.length === 0 ? (
                              <p className="text-xs text-muted-foreground py-2">Még nem érkezett válasz erre a kérdésre.</p>
                            ) : (
                              <div className="space-y-1.5">
                                {qAnswers.map((ans) => {
                                  const participant = allParticipants.find((p) => p.id === ans.participant_id);
                                  const formattedAns = formatStudentAnswer(q, ans.answer);
                                  const timeSec = ans.time_taken_ms && ans.time_taken_ms < 300000
                                    ? (ans.time_taken_ms / 1000).toFixed(1)
                                    : null;

                                  return (
                                    <div
                                      key={ans.id}
                                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                                        ans.is_correct
                                          ? 'bg-emerald-500/5 border-emerald-500/25'
                                          : 'bg-rose-500/5 border-rose-500/25'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar avatar={participant?.avatar as any} size="sm" className="h-6 w-6 text-xs" />
                                        <span className="font-semibold text-foreground">{participant?.student_name || 'Ismeretlen'}</span>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        <span className="font-medium max-w-[200px] truncate text-foreground/90" title={formattedAns}>
                                          {formattedAns}
                                        </span>
                                        {timeSec && (
                                          <span className="text-muted-foreground text-[11px] font-mono">
                                            {timeSec}s
                                          </span>
                                        )}
                                        {ans.is_correct ? (
                                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 text-[11px] font-bold">
                                            <CheckCircle2 className="h-3 w-3" /> Helyes
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 gap-1 text-[11px] font-bold">
                                            <XCircle className="h-3 w-3" /> Helytelen
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
