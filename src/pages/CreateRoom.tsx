import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Play, Clock, Gamepad2, Infinity as LucideInfinity } from 'lucide-react';
import type { Quiz } from '@/types/quiz';
import { generateRoomCode } from '@/types/quiz';
import { getTeacherQuizzes, createRoom } from '@/services/db';

const CreateRoom = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [className, setClassName] = useState('');
  const [grade, setGrade] = useState('');
  const [notes, setNotes] = useState('');
  const [gameMode, setGameMode] = useState<'classic' | 'submarine'>('classic');
  const [gameDuration, setGameDuration] = useState(300); // 5 minutes in seconds
  const [timeLimit, setTimeLimit] = useState(15);
  const [timeLimitMode, setTimeLimitMode] = useState<'quiz_preset' | 'unified' | 'unlimited'>('quiz_preset');
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchQuizzes = async () => {
      try {
        const data = await getTeacherQuizzes(user.id);
        setQuizzes(data);
      } catch (err: any) {
        toast.error('Hiba a kvízek betöltésekor');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [user]);

  const handleCreate = async () => {
    if (!user || !selectedQuizId) {
      toast.error('Válassz ki egy kvízt!');
      return;
    }

    setCreating(true);
    const code = generateRoomCode();

    try {
      const newRoomId = await createRoom({
        teacher_id: user.id,
        quiz_id: selectedQuizId,
        code,
        class_name: className,
        grade,
        notes,
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
      setCreating(false);
      navigate(`/room/${newRoomId}`);
    } catch (err: any) {
      toast.error('Hiba a szoba létrehozásakor: ' + err.message);
      setCreating(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Betöltés...</p>
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
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Vissza
          </Button>
          <h1 className="font-display text-2xl font-bold">Szoba létrehozása</h1>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {/* Select Quiz */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kvíz kiválasztása</CardTitle>
            </CardHeader>
            <CardContent>
              {quizzes.length === 0 ? (
                <p className="text-muted-foreground">
                  Nincs kvízed. <a href="/quiz/new" className="text-primary underline">Hozz létre egyet!</a>
                </p>
              ) : (
                <RadioGroup value={selectedQuizId} onValueChange={setSelectedQuizId}>
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center space-x-3 rounded-lg border p-3">
                      <RadioGroupItem value={quiz.id} id={quiz.id} />
                      <label htmlFor={quiz.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground flex justify-between items-center">
                          <span>{quiz.questions.length} kérdés · {quiz.subject}</span>
                          <span className="text-xs opacity-70">
                            Mentve: {new Date(quiz.updated_at).toLocaleDateString('hu-HU')}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Room Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Szoba beállítások</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Osztály neve</Label>
                  <Input
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="pl. 5.A"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Évfolyam</Label>
                  <Input
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="pl. 5. osztály"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Megjegyzés</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Opcionális megjegyzés..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quiz Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Játék és Időbeállítások</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <RadioGroupItem value="quiz_preset" id="tl-preset-create" className="mt-0.5" />
                      <label htmlFor="tl-preset-create" className="cursor-pointer space-y-0.5 flex-1">
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
                        <RadioGroupItem value="unified" id="tl-unified-create" className="mt-0.5" />
                        <label htmlFor="tl-unified-create" className="cursor-pointer space-y-0.5 flex-1">
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
                      <RadioGroupItem value="unlimited" id="tl-unlimited-create" className="mt-0.5" />
                      <label htmlFor="tl-unlimited-create" className="cursor-pointer space-y-0.5 flex-1">
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
                        <div className="text-xs text-muted-foreground">Hagyományos közös kvíz élmény</div>
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
                        <div className={cn("font-semibold text-sm", gameMode === 'submarine' ? "text-primary font-semibold" : "")}>
                          Tengeralattjáró 🦈
                        </div>
                        <div className="text-xs text-muted-foreground">Közös menekülés a cápa elől (diákok saját tempóban)</div>
                      </label>
                    </div>
                  </RadioGroup>

                  {gameMode === 'submarine' && (
                    <div className="space-y-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3.5 animate-in fade-in slide-in-from-top-2 mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold">Küldetés időtartama:</div>
                          <div className="text-[11px] text-muted-foreground">A cápa sebessége ehhez igazodik</div>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {Math.floor(gameDuration / 60)} perc
                        </Badge>
                      </div>
                      <Input
                        type="range"
                        min={60}
                        max={600}
                        step={60}
                        value={gameDuration}
                        onChange={(e) => setGameDuration(parseInt(e.target.value))}
                        className="h-2 w-full appearance-none rounded-lg bg-primary/20"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={handleCreate} disabled={creating || !selectedQuizId}>
            <Play className="mr-2 h-5 w-5" />
            {creating ? 'Létrehozás...' : 'Szoba létrehozása'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
