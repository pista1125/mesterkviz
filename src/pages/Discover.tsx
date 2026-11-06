import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Play, Search, Loader2, ArrowLeft, CopyPlus, Settings2, Ghost, Clock, Gamepad2, Infinity as LucideInfinity } from 'lucide-react';
import type { Quiz } from '@/types/quiz';
import { generateRoomCode } from '@/types/quiz';
import { getPublishedQuizzes, getAllProfiles, saveQuiz, createRoom } from '@/services/db';

type PublicQuiz = Quiz & {
  profiles?: { display_name: string | null } | null;
};

const Discover = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<PublicQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  // Quick Start State
  const [quickStartQuiz, setQuickStartQuiz] = useState<PublicQuiz | null>(null);
  const [gameMode, setGameMode] = useState<'classic' | 'submarine'>('classic');
  const [gameDuration, setGameDuration] = useState(300);
  const [timeLimit, setTimeLimit] = useState(15);
  const [timeLimitMode, setTimeLimitMode] = useState<'quiz_preset' | 'unified' | 'unlimited'>('quiz_preset');
  const [starting, setStarting] = useState(false);
  const [copying, setCopying] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchPublicQuizzes = async () => {
      try {
        const [published, profilesMap] = await Promise.all([
          getPublishedQuizzes(),
          getAllProfiles(),
        ]);

        // Filter out quizzes created by current user
        const otherQuizzes = published
          .filter((q) => q.teacher_id !== user.id)
          .map((q) => ({
            ...q,
            profiles: {
              display_name: profilesMap[q.teacher_id]?.display_name || 'Tanár',
            },
          }));

        setQuizzes(otherQuizzes);
      } catch (err: any) {
        console.error('Error fetching public quizzes:', err);
        toast.error('Hiba a kvízek betöltésekor: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicQuizzes();
  }, [user]);

  const handleCopyQuiz = async (quiz: PublicQuiz, e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setCopying(quiz.id);
    const { id, created_at, updated_at, is_published, published_at, teacher_id, profiles, ...clonedData } = quiz;
    
    try {
      const newQuizId = await saveQuiz({
        ...clonedData,
        teacher_id: user.id,
        is_published: false,
        title: `${quiz.title} (Másolat)`,
      });
      
      setCopying(null);
      toast.success('Kvíz sikeresen a sajátjaid közé másolva!');
      navigate(`/quiz/${newQuizId}/edit`);
    } catch (err: any) {
      setCopying(null);
      toast.error('Hiba a másoláskor: ' + err.message);
    }
  };

  const handleQuickStart = async () => {
    if (!user || !quickStartQuiz) return;

    setStarting(true);
    const code = generateRoomCode();

    try {
      const newRoomId = await createRoom({
        teacher_id: user.id,
        quiz_id: quickStartQuiz.id,
        code,
        class_name: quickStartQuiz.grade_level || '',
        grade: quickStartQuiz.grade_level || '',
        notes: '',
        control_mode: gameMode === 'submarine' ? 'auto' : 'manual',
        game_mode: gameMode,
        game_duration_seconds: gameDuration,
        submarine_boosts: 0,
        time_limit_mode: timeLimitMode,
        time_limit_seconds: timeLimitMode === 'unified' ? timeLimit : (timeLimitMode === 'unlimited' ? 0 : 15),
        has_time_limit: timeLimitMode !== 'unlimited',
        show_results_to_students: true,
        status: 'waiting',
        current_question_index: 0,
        session_number: 1,
        started_at: null,
        ended_at: null,
        created_at: new Date().toISOString(),
      });

      toast.success(`Szoba létrehozva! Kód: ${code}`);
      setStarting(false);
      setQuickStartQuiz(null);
      navigate(`/room/${newRoomId}`);
    } catch (err: any) {
      toast.error('Hiba az indításkor: ' + err.message);
      setStarting(false);
    }
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedGrade && q.grade_level !== selectedGrade) return false;

    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const creatorName = (q.profiles as any)?.display_name?.toLowerCase() || '';
    return (
      q.title.toLowerCase().includes(query) ||
      (q.description || '').toLowerCase().includes(query) ||
      (q.subject || '').toLowerCase().includes(query) ||
      ((q as any).topic || '').toLowerCase().includes(query) ||
      creatorName.includes(query)
    );
  });

  const quizzesByGrade = filteredQuizzes.reduce((acc, quiz) => {
    const grade = quiz.grade_level || 'Egyéb / Nincs megadva';
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(quiz);
    return acc;
  }, {} as Record<string, PublicQuiz[]>);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Publikus kvízek betöltése...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-[#030712]">
      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[500px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full" />
      <Navbar />
      <div className="container relative z-10 mx-auto px-4 py-8">
        
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Vissza a Vezérlőpultra
          </Button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
                <Search className="h-8 w-8 text-primary" />
                Felfedezés
              </h1>
              <p className="text-muted-foreground mt-1">Böngéssz és használj más tanárok által megosztott publikus kvízeket.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Keresés cím, téma vagy készítő szerint..."
                className="pl-9 bg-card backdrop-blur-sm border-primary/20 focus-visible:ring-primary shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Grade Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Szűrés évfolyam szerint
            </h3>
            {selectedGrade && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGrade(null)}
                className="h-7 text-xs"
              >
                Szűrés törlése
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {['Összes', '1. osztály', '2. osztály', '3. osztály', '4. osztály', '5. osztály', '6. osztály', '7. osztály', '8. osztály', '9. osztály', '10. osztály', '11. osztály', '12. osztály'].map((grade) => {
              const gradeValue = grade === 'Összes' ? null : grade;
              const isActive = selectedGrade === gradeValue;

              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(gradeValue)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-card hover:bg-accent border border-border/50 text-muted-foreground'}
                  `}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quizzes Grid */}
        <section className="mb-10">
          {filteredQuizzes.length === 0 ? (
            <Card className="border-dashed border-2 bg-transparent shadow-none w-full max-w-2xl mx-auto mt-10">
              <CardContent className="py-16 text-center flex flex-col items-center justify-center">
                <Ghost className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Nincsenek találatok</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedGrade ? 'Próbálj meg más keresési feltételeket megadni.' : 'Jelenleg nincs mások által publikált kvíz a rendszerben.'}
                </p>
                {(searchQuery || selectedGrade) && (
                  <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(''); setSelectedGrade(null); }}>
                    Szűrők törlése
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-10">
              {Object.entries(quizzesByGrade).sort().map(([grade, gradeQuizzes]) => (
                <div key={grade} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 text-sm font-bold shadow-sm">
                      {grade}
                    </Badge>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {gradeQuizzes.map((quiz) => (
                      <Card key={quiz.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 bg-card/60 backdrop-blur-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="mb-2 flex items-center justify-between gap-1">
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] uppercase font-bold tracking-tighter bg-accent/50 text-accent-foreground">
                              {(quiz as any).topic || quiz.subject || 'Egyéb'}
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground tabular-nums flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded-md">
                              {quiz.questions?.length || 0} kérdés
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-tight group-hover:text-primary transition-colors">
                            {quiz.title}
                          </CardTitle>
                          {quiz.description && (
                            <CardDescription className="line-clamp-2 text-xs mt-1">
                              {quiz.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col p-4 pt-2">
                          <div className="mt-auto mb-4 border-t pt-3 border-border/50">
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                              <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                                {(quiz.profiles as any)?.display_name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                              Készítette: <strong className="text-foreground/80 font-medium truncate max-w-[120px]">{(quiz.profiles as any)?.display_name || 'Ismeretlen'}</strong>
                            </p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1 ml-5">
                              Mentve: {new Date(quiz.updated_at).toLocaleString('hu-HU', { 
                                year: 'numeric', 
                                month: '2-digit', 
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2 pt-1 transition-opacity">
                            <Button
                              size="sm"
                              className="h-8 flex-1 text-xs bg-primary hover:bg-primary/90 shadow-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setQuickStartQuiz(quiz);
                              }}
                            >
                              <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
                              Indítás
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 px-2 text-xs border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors tooltip-trigger" 
                              title="Másolat mentése a kvízeim közé"
                              disabled={copying === quiz.id}
                              onClick={(e) => handleCopyQuiz(quiz, e)}
                            >
                              {copying === quiz.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CopyPlus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quick Start Dialog */}
      <Dialog open={!!quickStartQuiz} onOpenChange={(open) => !open && !starting && setQuickStartQuiz(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              Kvíz indítása: {quickStartQuiz?.title}
            </DialogTitle>
            <DialogDescription>
              Válaszd ki a beállításokat és a játékmódot a játék indításához. Ez egy publikus kvíz.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
            {/* Bal oldal: Időkorlát beállítások */}
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-3 flex flex-col justify-start">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <Label className="text-sm font-semibold">Időkorlát beállítása</Label>
              </div>

              <RadioGroup
                value={timeLimitMode}
                onValueChange={(v) => setTimeLimitMode(v as 'quiz_preset' | 'unified' | 'unlimited')}
                className="space-y-2.5 flex-1"
              >
                {/* 1. Kvíz szerinti idők */}
                <div
                  className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                    timeLimitMode === 'quiz_preset' ? 'border-primary/60 bg-primary/5 shadow-xs' : 'border-border/60 hover:bg-muted/40'
                  }`}
                  onClick={() => setTimeLimitMode('quiz_preset')}
                >
                  <RadioGroupItem value="quiz_preset" id="tl-preset-discover" className="mt-0.5" />
                  <label htmlFor="tl-preset-discover" className="cursor-pointer space-y-0.5 flex-1">
                    <div className="text-sm font-medium">Kvíz szerinti idők</div>
                    <p className="text-xs text-muted-foreground">
                      Minden kérdés a kvízben egyedileg beállított idejével fut.
                    </p>
                  </label>
                </div>

                {/* 2. Egységes időkorlát */}
                <div
                  className={`flex flex-col gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                    timeLimitMode === 'unified' ? 'border-primary/60 bg-primary/5 shadow-xs' : 'border-border/60 hover:bg-muted/40'
                  }`}
                  onClick={() => setTimeLimitMode('unified')}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="unified" id="tl-unified-discover" className="mt-0.5" />
                    <label htmlFor="tl-unified-discover" className="cursor-pointer space-y-0.5 flex-1">
                      <div className="text-sm font-medium">Egységes időkorlát</div>
                      <p className="text-xs text-muted-foreground">
                        Minden kérdésre egységesen az alábbi idő áll rendelkezésre:
                      </p>
                    </label>
                  </div>
                  {timeLimitMode === 'unified' && (
                    <div className="flex items-center gap-2 pl-7 pt-1" onClick={(e) => e.stopPropagation()}>
                      <Input
                        type="number"
                        min={5}
                        max={120}
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Math.max(5, Math.min(120, parseInt(e.target.value) || 15)))}
                        className="w-20 text-center font-bold h-8"
                      />
                      <span className="text-xs font-medium text-muted-foreground">másodperc / kérdés</span>
                    </div>
                  )}
                </div>

                {/* 3. Korlátlan idő */}
                <div
                  className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                    timeLimitMode === 'unlimited' ? 'border-primary/60 bg-primary/5 shadow-xs' : 'border-border/60 hover:bg-muted/40'
                  }`}
                  onClick={() => setTimeLimitMode('unlimited')}
                >
                  <RadioGroupItem value="unlimited" id="tl-unlimited-discover" className="mt-0.5" />
                  <label htmlFor="tl-unlimited-discover" className="cursor-pointer space-y-0.5 flex-1">
                    <div className="text-sm font-medium flex items-center gap-1.5">
                      <span>Korlátlan idő</span>
                      <LucideInfinity className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Nincs visszaszámlálás: a diákok bármennyi ideig gondolkodhatnak, a kérdéseket te lépteted.
                    </p>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Jobb oldal: Játékmód */}
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4 space-y-3 flex flex-col justify-start">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-primary" />
                <Label className="text-sm font-semibold">Játékmód</Label>
              </div>

              <RadioGroup value={gameMode} onValueChange={(v) => setGameMode(v as 'classic' | 'submarine')} className="space-y-2.5">
                <div
                  className={cn(
                    "flex items-start space-x-3 rounded-lg border p-3 cursor-pointer transition-all",
                    gameMode === 'classic' ? "border-primary/60 bg-primary/5 shadow-xs" : "border-border/60 hover:bg-muted/40"
                  )}
                  onClick={() => setGameMode('classic')}
                >
                  <RadioGroupItem value="classic" id="classic" className="mt-0.5" />
                  <label htmlFor="classic" className="flex-1 cursor-pointer space-y-0.5">
                    <div className="font-semibold text-sm">Klasszikus</div>
                    <div className="text-xs text-muted-foreground">Közös játék a kivetítőn, tanári kérdésvezérléssel</div>
                  </label>
                </div>

                <div
                  className={cn(
                    "flex items-start space-x-3 rounded-lg border p-3 cursor-pointer transition-all",
                    gameMode === 'submarine' ? "bg-primary/5 border-primary/60 shadow-xs" : "border-border/60 hover:bg-muted/40"
                  )}
                  onClick={() => setGameMode('submarine')}
                >
                  <RadioGroupItem value="submarine" id="submarine" className="mt-0.5" />
                  <label htmlFor="submarine" className="flex-1 cursor-pointer space-y-0.5">
                    <div className={cn("font-semibold text-sm", gameMode === 'submarine' ? "text-primary" : "")}>
                      Tengeralattjáró 🦈
                    </div>
                    <div className="text-xs text-muted-foreground">Közös menekülés a cápa elől (diákok saját tempóban haladnak)</div>
                  </label>
                </div>
              </RadioGroup>

              {gameMode === 'submarine' && (
                <div className="space-y-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3.5 animate-in fade-in slide-in-from-top-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold">Küldetés időtartama</div>
                      <div className="text-[11px] text-muted-foreground">Mennyi ideig tartson a küldetés?</div>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {Math.floor(gameDuration / 60)} perc
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {[180, 300, 480, 600].map((seconds) => (
                      <Button
                        key={seconds}
                        type="button"
                        variant={gameDuration === seconds ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-7 px-1.5"
                        onClick={() => setGameDuration(seconds)}
                      >
                        {seconds / 60}p
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => !starting && setQuickStartQuiz(null)} disabled={starting}>
              Mégse
            </Button>
            <Button onClick={handleQuickStart} disabled={starting} className="min-w-[120px]">
              {starting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Indítás...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  Játék indítása
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discover;
