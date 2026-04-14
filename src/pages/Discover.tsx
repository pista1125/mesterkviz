import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
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
import { Play, Search, Loader2, ArrowLeft, CopyPlus, Settings2, Ghost } from 'lucide-react';
import type { Quiz } from '@/types/quiz';
import { generateRoomCode } from '@/types/quiz';

type PublicQuiz = Quiz & {
  profiles?: { display_name: string | null } | null;
  // Supabase might return an array if relation is 1:N but here teacher_id -> profiles is N:1
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
  const [controlMode, setControlMode] = useState<'auto' | 'manual'>('auto');
  const [gameMode, setGameMode] = useState<'classic' | 'submarine'>('classic');
  const [gameDuration, setGameDuration] = useState(300);
  const [timeLimit, setTimeLimit] = useState(15);
  const [showResults, setShowResults] = useState(true);
  const [starting, setStarting] = useState(false);
  const [copying, setCopying] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchPublicQuizzes = async () => {
      // Fetch published quizzes not authored by the current user
      const { data, error } = await supabase
        .from('quizzes')
        .select('*, profiles!teacher_id(display_name)')
        .eq('is_published', true)
        .neq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Hiba a kvízek betöltésekor: ' + error.message);
      } else if (data) {
        setQuizzes(data as any[]);
      }
      setLoading(false);
    };

    fetchPublicQuizzes();
  }, [user]);

  const handleCopyQuiz = async (quiz: PublicQuiz, e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setCopying(quiz.id);
    const { id, created_at, updated_at, is_published, published_at, teacher_id, profiles, ...clonedData } = quiz;
    
    // Set current user as new teacher, and make it private by default
    const newQuiz = {
      ...clonedData,
      teacher_id: user.id,
      is_published: false,
      title: `${quiz.title} (Másolat)`
    };

    const { data, error } = await supabase.from('quizzes').insert(newQuiz).select('id').single();
    
    setCopying(null);
    if (error) {
      toast.error('Hiba a másoláskor: ' + error.message);
    } else {
      toast.success('Kvíz sikeresen a sajátjaid közé másolva!');
      // Navigate to edit the new quiz
      if (data?.id) {
        navigate(`/quiz/${data.id}/edit`);
      }
    }
  };

  const handleQuickStart = async () => {
    if (!user || !quickStartQuiz) return;

    setStarting(true);
    let code = generateRoomCode();
    let retries = 0;

    while (retries < 5) {
      const { error } = await supabase.from('rooms').insert({
        teacher_id: user.id,
        quiz_id: quickStartQuiz.id,
        code,
        class_name: quickStartQuiz.grade_level || '',
        grade: quickStartQuiz.grade_level || '',
        control_mode: controlMode,
        game_mode: gameMode,
        game_duration_seconds: gameDuration,
        time_limit_seconds: timeLimit,
        show_results_to_students: showResults,
        status: 'waiting',
        current_question_index: 0,
      });

      if (!error) {
        toast.success(`Szoba létrehozva! Kód: ${code}`);
        const { data: room } = await supabase
          .from('rooms')
          .select('id')
          .eq('code', code)
          .single();
        if (room) {
          navigate(`/room/${room.id}`);
        }
        setStarting(false);
        setQuickStartQuiz(null);
        return;
      }

      if (error.code === '23505') {
        code = generateRoomCode();
        retries++;
      } else {
        toast.error('Hiba az indításkor: ' + error.message);
        setStarting(false);
        return;
      }
    }
    toast.error('Nem sikerült egyedi kódot generálni.');
    setStarting(false);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        
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
                  {grade === 'Összes' ? 'Összes' : grade.split('.')[0]}
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
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              Kvíz indítása: {quickStartQuiz?.title}
            </DialogTitle>
            <DialogDescription>
              Válaszd ki a vezérlés módját mielőtt elindítod a játékot. Ez egy publikus kvíz.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column: Controls & Settings */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Kérdésvezérlés módja</Label>
                <RadioGroup value={controlMode} onValueChange={(v) => setControlMode(v as 'auto' | 'manual')}>
                  <div className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setControlMode('auto')}>
                    <RadioGroupItem value="auto" id="auto" />
                    <label htmlFor="auto" className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm">Automatikus</div>
                      <div className="text-[12px] text-muted-foreground">Diákok saját tempóban haladnak</div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setControlMode('manual')}>
                    <RadioGroupItem value="manual" id="manual" />
                    <label htmlFor="manual" className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm">Manuális</div>
                      <div className="text-[12px] text-muted-foreground">Tanár vezérli a kérdésváltást</div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time-limit" className="text-sm font-semibold">Időlimit/kérdés (mp)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value) || 15)}
                    min={5}
                    max={120}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-end gap-2 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="show-results" className="text-[12px] leading-tight cursor-pointer">Eredmények</Label>
                    <Switch
                      id="show-results"
                      checked={showResults}
                      onCheckedChange={setShowResults}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Game Modes */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Játékmód</Label>
                <RadioGroup value={gameMode} onValueChange={(v) => setGameMode(v as 'classic' | 'submarine')}>
                  <div className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setGameMode('classic')}>
                    <RadioGroupItem value="classic" id="classic" />
                    <label htmlFor="classic" className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm">Klasszikus</div>
                    </label>
                  </div>
                  <div className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors ${gameMode === 'submarine' ? 'bg-primary/5 border-primary/30' : 'hover:bg-accent/50'}`} onClick={() => setGameMode('submarine')}>
                    <RadioGroupItem value="submarine" id="submarine" />
                    <label htmlFor="submarine" className="flex-1 cursor-pointer">
                      <div className={`font-medium text-sm ${gameMode === 'submarine' ? 'text-primary' : ''}`}>Tengeralattjáró 🦈</div>
                      <div className="text-[10px] text-muted-foreground">Közös menekülés a cápa elől</div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {gameMode === 'submarine' && (
                <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-primary">Játékidő: {Math.floor(gameDuration / 60)} perc</Label>
                  </div>
                  <Input
                    type="range"
                    min={60}
                    max={600}
                    step={60}
                    value={gameDuration}
                    onChange={(e) => setGameDuration(parseInt(e.target.value))}
                    className="h-1.5 w-full appearance-none rounded-lg bg-primary/20"
                  />
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
