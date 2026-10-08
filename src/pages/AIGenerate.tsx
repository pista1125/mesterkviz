import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Brain, Sparkles, Loader2, Plus } from 'lucide-react';
import { requestGenerateQuiz } from '@/services/ai';
import { saveQuiz, getAllTopicsByGrade } from '@/services/db';

import { normalizeQuestion } from '@/types/quiz';

const AIGenerate = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('matematika');
  const [topic, setTopic] = useState('');
  const [isCustomTopic, setIsCustomTopic] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [topicsByGrade, setTopicsByGrade] = useState<Record<string, string[]>>({});
  const [numQuestions, setNumQuestions] = useState(5);
  const [gradeLevel, setGradeLevel] = useState('');
  const [includeTrueFalse, setIncludeTrueFalse] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await getAllTopicsByGrade();
        setTopicsByGrade(data);
      } catch (err) {
        console.error('Failed to load topics in AIGenerate:', err);
      }
    };
    loadTopics();
  }, []);

  if (!authLoading && !user) {
    navigate('/auth');
    return null;
  }

  const handleGradeChange = (newGrade: string) => {
    setGradeLevel(newGrade);
    setIsCustomTopic(false);
    setCustomTopicInput('');

    if (!newGrade) {
      setTopic('');
      return;
    }

    const newGradeTopics = topicsByGrade[newGrade] || [];
    if (topic && !newGradeTopics.includes(topic)) {
      setTopic('');
    }
  };

  const availableTopics = Array.from(
    new Set([
      ...(gradeLevel ? (topicsByGrade[gradeLevel] || []) : []),
      ...(gradeLevel && topic && !isCustomTopic ? [topic] : []),
    ])
  ).sort((a, b) => a.localeCompare(b, 'hu', { numeric: true, sensitivity: 'base' }));

  const handleGenerate = async () => {
    if (!user) return;
    if (!gradeLevel) {
      toast.error('Előbb válassz évfolyamot!');
      return;
    }
    const finalTopic = isCustomTopic ? customTopicInput.trim() : topic.trim();
    if (!finalTopic) {
      toast.error('Válassz vagy adj meg egy témakört!');
      return;
    }

    setGenerating(true);

    try {
      const data = await requestGenerateQuiz({
        subject,
        topic: finalTopic,
        numQuestions,
        gradeLevel,
        includeTrueFalse,
      });

      const normalizedQuestions = (data.questions || []).map(normalizeQuestion);

      // Save quiz to Firestore database
      await saveQuiz({
        teacher_id: user.id,
        title: data.title || `${finalTopic} kvíz`,
        description: data.description || '',
        subject,
        topic: finalTopic,
        grade_level: gradeLevel,
        questions: normalizedQuestions,
        is_published: false,
      });

      toast.success('Kvíz sikeresen generálva és mentve!');
      navigate('/dashboard');
    } catch (e: any) {
      toast.error(e?.message || 'Váratlan hiba történt a generáláskor');
    } finally {
      setGenerating(false);
    }
  };

  if (authLoading) {
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
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Kvízgenerátor
          </h1>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Kvíz generálása AI-val
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tantárgy</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="matematika">Matematika</option>
                    <option value="magyar">Magyar nyelv</option>
                    <option value="természettudomány">Természettudomány</option>
                    <option value="történelem">Történelem</option>
                    <option value="földrajz">Földrajz</option>
                    <option value="informatika">Informatika</option>
                    <option value="angol">Angol nyelv</option>
                    <option value="egyéb">Egyéb</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai-grade-select" className="flex items-center gap-1.5">
                    Évfolyam <span className="text-primary font-semibold">*</span>
                  </Label>
                  <select
                    id="ai-grade-select"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={gradeLevel}
                    onChange={(e) => handleGradeChange(e.target.value)}
                  >
                    <option value="">Válassz évfolyamot...</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={`${i + 1}. osztály`}>
                        {i + 1}. osztály
                      </option>
                    ))}
                    <option value="Egyéb">Egyéb</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-topic-select" className="flex items-center gap-2">
                    Témakör *
                    {gradeLevel && (
                      <Badge variant="secondary" className="text-xs font-normal">
                        {gradeLevel}
                      </Badge>
                    )}
                  </Label>
                  {gradeLevel && !isCustomTopic && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomTopic(true);
                        setCustomTopicInput('');
                        setTopic('');
                      }}
                      className="text-xs text-primary hover:underline flex items-center gap-1 font-medium transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" /> Új témakör rögzítése
                    </button>
                  )}
                </div>

                {!gradeLevel ? (
                  <div>
                    <select
                      id="ai-topic-select"
                      disabled
                      className="flex h-10 w-full rounded-md border border-input/40 bg-muted/30 px-3 py-2 text-sm text-muted-foreground cursor-not-allowed opacity-60"
                      value=""
                      onChange={() => {}}
                    >
                      <option value="">🔒 Előbb válassz évfolyamot a témakörök megjelenítéséhez...</option>
                    </select>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      A témakörök a kiválasztott évfolyamhoz kapcsolódnak. Kérlek, először válaszd ki a fenti évfolyamot!
                    </p>
                  </div>
                ) : isCustomTopic ? (
                  <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 space-y-2.5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Új témakör megadása ({gradeLevel})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomTopic(false);
                          setCustomTopicInput('');
                          setTopic('');
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Vissza a meglévő témakörökhöz
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="ai-custom-topic-input"
                        value={customTopicInput}
                        onChange={(e) => {
                          setCustomTopicInput(e.target.value);
                          setTopic(e.target.value);
                        }}
                        placeholder={`pl. Törtek, Hatványozás, Geometria (${gradeLevel})...`}
                        autoFocus
                        className="bg-background border-primary/40 focus-visible:ring-primary"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setIsCustomTopic(false);
                          setCustomTopicInput('');
                          setTopic('');
                        }}
                      >
                        Mégse
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <select
                      id="ai-topic-select"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={topic}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__NEW__') {
                          setIsCustomTopic(true);
                          setCustomTopicInput('');
                          setTopic('');
                        } else {
                          setTopic(val);
                        }
                      }}
                    >
                      <option value="">
                        {availableTopics.length > 0
                          ? `-- Válassz témakört (${availableTopics.length} elérhető) --`
                          : `-- Még nincs mentett témakör ehhez az évfolyamhoz --`}
                      </option>
                      {availableTopics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                      <option value="__NEW__" className="font-semibold text-primary">
                        ➕ Új témakör rögzítése...
                      </option>
                    </select>
                    {availableTopics.length === 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Ehhez az évfolyamhoz még nem rögzítettek témakört.{' '}
                        <button
                          type="button"
                          className="text-primary underline font-medium"
                          onClick={() => {
                            setIsCustomTopic(true);
                            setCustomTopicInput('');
                            setTopic('');
                          }}
                        >
                          Kattints ide új témakör megadásához!
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Kérdések száma</Label>
                <Input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 5)))}
                  min={1}
                  max={20}
                />
              </div>

              <div className="flex items-center space-x-2 rounded-md border p-3">
                <input
                  type="checkbox"
                  id="includeTrueFalse"
                  checked={includeTrueFalse}
                  onChange={(e) => setIncludeTrueFalse(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="includeTrueFalse" className="cursor-pointer">
                  Igaz/Hamis kérdések bevonása
                </Label>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleGenerate}
                disabled={generating || !gradeLevel || !(isCustomTopic ? customTopicInput.trim() : topic.trim())}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generálás folyamatban...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Kvíz generálása
                  </>
                )}
              </Button>

              {generating && (
                <p className="text-center text-sm text-muted-foreground">
                  Az AI éppen generálja a kvízt, ez néhány másodpercig tarthat...
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGenerate;
