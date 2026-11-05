import { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { Avatar } from '@/components/quiz/Avatar';
import { Podium } from '@/components/quiz/Podium';
import { MathRenderer } from '@/components/quiz/MathRenderer';
import type { Room, Quiz, QuizQuestion, RoomParticipant, QuizAnswer } from '@/types/quiz';
import { getRoomById, getQuizById, getRoomParticipants, getRoomAnswers } from '@/services/db';

const QUESTION_TYPE_LABELS: Record<string, string> = {
  'multiple-choice': 'Feleletválasztós',
  'text-input': 'Szöveges válasz',
  'matching': 'Párosítás',
  'true-false': 'Igaz / Hamis',
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
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      const optId = rawAns.selectedOptionId || rawAns.optionId || rawAns.id;
      const opt = q.options?.find((o) => o.id === optId);
      if (opt) return opt.text;
      if (typeof rawAns.text === 'string') return rawAns.text;
      return 'Kijelölt opció';
    }
    if (q.type === 'text-input') {
      return rawAns.text || rawAns.value || (typeof rawAns === 'string' ? rawAns : '–');
    }
    if (q.type === 'matching') {
      const pairs = rawAns.pairs;
      if (Array.isArray(pairs)) {
        return `${pairs.length} pár bejelölve`;
      }
      if (typeof pairs === 'object' && pairs !== null) {
        return `${Object.keys(pairs).length} pár bejelölve`;
      }
      return 'Párosítás beküldve';
    }
    return typeof rawAns === 'string' ? rawAns : '–';
  };

  // Export CSV by Students
  const exportStudentsCSV = (sessionNum: number) => {
    const sessionAnswers = allAnswers.filter((a) => ((a as any).session_number || 1) === sessionNum);

    const headers = ['Név', 'Kérdés #', 'Kérdés', 'Válasz', 'Helyes?', 'Pontszám', 'Idő (mp)', 'Időpont'];
    const rows = sessionAnswers.map((ans) => {
      const participant = allParticipants.find((p) => p.id === ans.participant_id);
      const question = quiz?.questions[ans.question_index];
      const answerText = question ? formatStudentAnswer(question, ans.answer) : '';
      const safeTimeSec = ans.time_taken_ms && ans.time_taken_ms < 300000
        ? (ans.time_taken_ms / 1000).toFixed(1)
        : '';

      return [
        `"${(participant?.student_name || '').replace(/"/g, '""')}"`,
        ans.question_index + 1,
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
      const qAnswers = sessionAnswers.filter((a) => a.question_index === idx);
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

        {/* Top 3 Podium (Only on Students tab or top) */}
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
            {/* TAB 1: PARTICIPANTS TAB */}
            {resultsTab === 'students' && (
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="w-14 text-center">#</TableHead>
                      <TableHead>Név</TableHead>
                      <TableHead className="text-center">Helyes válaszok</TableHead>
                      <TableHead className="text-center">Összpontszám</TableHead>
                      <TableHead className="text-center">Százalék</TableHead>
                      <TableHead className="text-center">Átlag idő</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentSessionResults.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Ebben a menetben még nem érkezett beküldött válasz.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentSessionResults.map((student, i) => (
                        <TableRow key={student.id} className="hover:bg-muted/30">
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
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* TAB 2: QUESTIONS TAB */}
            {resultsTab === 'questions' && (
              <div className="space-y-6">
                {quiz.questions.map((q, qIdx) => {
                  const qAnswers = currentSessionAnswers.filter((a) => a.question_index === qIdx);
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
                    <Card key={q.id || qIdx} className="border border-border/80 shadow-xs overflow-hidden">
                      {/* Question Header */}
                      <CardHeader className="bg-muted/20 pb-3 pt-4 px-5 border-b border-border/50">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-bold font-mono text-xs bg-background">
                              {qIdx + 1}. Kérdés
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {QUESTION_TYPE_LABELS[q.type] || q.type}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Average time */}
                            {qAvgTime > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <span>Átlag: {qAvgTime}s</span>
                              </div>
                            )}

                            {/* Success badge */}
                            <Badge
                              variant={successRate >= 70 ? 'default' : successRate >= 40 ? 'secondary' : 'destructive'}
                              className="font-bold text-xs px-2.5 py-1"
                            >
                              {correctCount} / {qAnswers.length} jó válasz ({successRate}%)
                            </Badge>
                          </div>
                        </div>

                        {/* Dual color progress bar: green (correct) vs red (incorrect) */}
                        <div className="mt-3">
                          <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex">
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
                          <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                            <span>{correctCount} helyes ({successRate}%)</span>
                            <span>{qAnswers.length} / {totalStudents} diák válaszolt</span>
                            <span>{incorrectCount} hibás ({100 - successRate}%)</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-5 space-y-4">
                        {/* Question Text with KaTeX renderer */}
                        <div className="text-base font-semibold leading-relaxed text-foreground">
                          <MathRenderer text={q.text} />
                        </div>

                        {/* Optional Question Image */}
                        {q.imageUrl && (
                          <div className="max-w-md rounded-lg overflow-hidden border">
                            <img src={q.imageUrl} alt="Kérdés ábra" className="w-full h-auto object-cover max-h-48" />
                          </div>
                        )}

                        {/* Question Breakdown by Type */}
                        {q.type === 'multiple-choice' || q.type === 'true-false' ? (
                          <div className="grid gap-2 sm:grid-cols-2 pt-1">
                            {q.options?.map((opt, optIdx) => {
                              // Count how many students chose this option
                              const pickedCount = qAnswers.filter((a) => {
                                const rawAns: any = a.answer;
                                const pickedId = rawAns?.selectedOptionId || rawAns?.optionId || rawAns?.id;
                                return pickedId === opt.id || rawAns?.text === opt.text;
                              }).length;

                              const pickPercent = qAnswers.length > 0
                                ? Math.round((pickedCount / qAnswers.length) * 100)
                                : 0;

                              return (
                                <div
                                  key={opt.id || optIdx}
                                  className={`p-3 rounded-xl border flex flex-col justify-between gap-2 transition-all ${
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
                                      <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                                        Helyes válasz
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
                                    <span>{pickedCount} diák jelölte</span>
                                    <span className="font-bold">{pickPercent}%</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : q.type === 'text-input' ? (
                          <div className="rounded-xl border p-3.5 bg-muted/20 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                              <span>Helyes válasz / megoldás:</span>
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold">
                                {q.correctAnswer || '–'}
                              </Badge>
                            </div>
                          </div>
                        ) : q.type === 'matching' ? (
                          <div className="space-y-2 pt-1">
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

                        {/* Collapsible Accordion: Diákok részletes válaszai erre a kérdésre */}
                        <Accordion type="single" collapsible className="w-full pt-1">
                          <AccordionItem value={`answers-${qIdx}`} className="border-border/50">
                            <AccordionTrigger className="text-xs font-medium text-muted-foreground hover:text-foreground py-2">
                              <span>Diákok válaszai erre a kérdésre ({qAnswers.length} válasz)</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              {qAnswers.length === 0 ? (
                                <p className="text-xs text-muted-foreground py-2">Még nem érkezett válasz erre a kérdésre.</p>
                              ) : (
                                <div className="space-y-1.5 pt-2">
                                  {qAnswers.map((ans) => {
                                    const participant = allParticipants.find((p) => p.id === ans.participant_id);
                                    const formattedAns = formatStudentAnswer(q, ans.answer);
                                    const timeSec = ans.time_taken_ms && ans.time_taken_ms < 300000
                                      ? (ans.time_taken_ms / 1000).toFixed(1)
                                      : null;

                                    return (
                                      <div
                                        key={ans.id}
                                        className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                                          ans.is_correct
                                            ? 'bg-emerald-500/5 border-emerald-500/20'
                                            : 'bg-rose-500/5 border-rose-500/20'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Avatar avatar={participant?.avatar as any} size="sm" className="h-6 w-6 text-xs" />
                                          <span className="font-semibold">{participant?.student_name || 'Ismeretlen'}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                          <span className="font-medium max-w-[200px] truncate" title={formattedAns}>
                                            {formattedAns}
                                          </span>
                                          {timeSec && (
                                            <span className="text-muted-foreground text-[11px] font-mono">
                                              {timeSec}s
                                            </span>
                                          )}
                                          {ans.is_correct ? (
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 text-[11px]">
                                              <CheckCircle2 className="h-3 w-3" /> Helyes
                                            </Badge>
                                          ) : (
                                            <Badge variant="outline" className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 gap-1 text-[11px]">
                                              <XCircle className="h-3 w-3" /> Helytelen
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
