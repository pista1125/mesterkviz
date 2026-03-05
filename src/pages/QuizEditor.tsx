import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { QuestionEditor } from '@/components/quiz/QuestionEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Plus, Save, ArrowLeft, Brain, Sparkles, Loader2, Search, Menu, X, ChevronRight, Hash, Trash2, AlertTriangle } from 'lucide-react';
import type { QuizQuestion, Quiz } from '@/types/quiz';
import { createEmptyQuestion } from '@/types/quiz';

const QuizEditor = () => {
  const { id } = useParams();
  const isEditing = id && id !== 'new';
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('matematika');
  const [topic, setTopic] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([createEmptyQuestion()]);
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!isEditing);
  const [generating, setGenerating] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  // Sidebar and navigation states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!isEditing || !user) {
      // Reset form for new quiz
      setTitle('');
      setDescription('');
      setSubject('matematika');
      setTopic('');
      setGradeLevel('');
      setQuestions([createEmptyQuestion()]);
      setIsPublished(false);
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        toast.error('Kvíz nem található');
        navigate('/dashboard');
        return;
      }

      setTitle(data.title);
      setDescription(data.description || '');
      setSubject(data.subject || 'matematika');
      setTopic((data as any).topic || '');
      setGradeLevel(data.grade_level || '');
      setQuestions((data.questions as unknown as QuizQuestion[]) || []);
      setIsPublished(data.is_published);
      setLoading(false);
    };

    fetchQuiz();
  }, [id, isEditing, user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    if (!title.trim()) {
      toast.error('Add meg a kvíz címét!');
      return;
    }
    if (questions.length === 0) {
      toast.error('Adj hozzá legalább egy kérdést!');
      return;
    }

    setSaving(true);

    const quizData = {
      teacher_id: user.id,
      title: title.trim(),
      description: description.trim(),
      subject,
      topic: topic.trim(),
      grade_level: gradeLevel,
      questions: JSON.parse(JSON.stringify(questions)),
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from('quizzes').update(quizData).eq('id', id!));
    } else {
      ({ error } = await supabase.from('quizzes').insert(quizData));
    }

    setSaving(false);

    if (error) {
      toast.error('Hiba a mentéskor: ' + error.message);
    } else {
      toast.success('Kvíz mentve!');
      if (!isEditing) {
        navigate('/dashboard');
      }
    }
  };

  const handleAIGenerate = async () => {
    if (!user) return;
    if (!aiPrompt.trim()) {
      toast.error('Add meg az AI promptot a generáláshoz!');
      return;
    }

    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('rapid-handler', {
        body: {
          subject,
          topic: aiPrompt.trim(),
          numQuestions: aiPrompt.match(/(\d+)\s*kérdés/)?.[1] ? parseInt(aiPrompt.match(/(\d+)\s*kérdés/)?.[1]!) : 5,
          gradeLevel
        },
      });

      if (error) {
        toast.error('Hiba az AI generálásnál: ' + error.message);
        setGenerating(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setGenerating(false);
        return;
      }

      if (data.title && !title) setTitle(data.title);
      if (data.description && !description) setDescription(data.description);

      const newQuestions = JSON.parse(JSON.stringify(data.questions)) as QuizQuestion[];

      // If we only have one empty question, replace it. Otherwise append.
      if (questions.length === 1 && !questions[0].text.trim() && questions[0].options.every(o => !o.text.trim())) {
        setQuestions(newQuestions);
      } else {
        setQuestions([...questions, ...newQuestions]);
      }

      toast.success('AI generált kérdések hozzáadva!');
    } catch (e) {
      toast.error('Váratlan hiba történt');
    } finally {
      setGenerating(false);
    }
  };

  const updateQuestion = (index: number, question: QuizQuestion) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? question : q)));
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const scrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const filteredQuestions = questions.filter((q, i) =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `kérdés ${i + 1}`.includes(searchQuery.toLowerCase())
  );

  if (authLoading || (loading && isEditing)) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Betöltés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* Sticky Secondary Header */}
      <div className="flex-none z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="hidden sm:flex">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Vissza
            </Button>
            <div className="flex items-center gap-2 overflow-hidden">
              <Badge variant="outline" className="hidden lg:inline-flex shrink-0">
                {isEditing ? 'Szerkesztés' : 'Új'}
              </Badge>
              <h1 className="font-display text-xs md:text-sm lg:text-base font-bold truncate flex-1 min-w-0 max-w-[150px] md:max-w-[400px]">
                {title || 'Névtelen kvíz'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')} className="hidden md:flex">
              Mégse
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 shadow-sm px-4 md:px-6">
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {saving ? 'Mentés...' : 'Mentés'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-card border-r transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${!isSidebarOpen && 'md:w-0 md:opacity-0 md:pointer-events-none'}
        `}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Kérdések ({questions.length})</h2>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Keresés a kérdések között..."
                  className="pl-9 h-9 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs h-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    const el = document.getElementById('ai-helper');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Brain className="mr-2 h-3.5 w-3.5" />
                  AI Segéd
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs h-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    const el = document.getElementById('quiz-metadata');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Hash className="mr-2 h-3.5 w-3.5" />
                  Kvíz adatai
                </Button>
                <div className="my-2 border-t" />
                {questions.map((q, index) => {
                  const isVisible = q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    `kérdés ${index + 1}`.includes(searchQuery.toLowerCase());
                  if (!isVisible && searchQuery) return null;

                  return (
                    <div
                      key={q.id}
                      className="flex items-center gap-1 group/item"
                    >
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start text-left h-auto py-2 px-3 hover:bg-primary/5 min-w-0"
                        onClick={() => scrollToQuestion(index)}
                      >
                        <div className="flex items-start gap-2 overflow-hidden w-full">
                          <Badge variant="secondary" className="shrink-0 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                            {index + 1}
                          </Badge>
                          <div className="flex flex-col items-start overflow-hidden flex-1 min-w-0">
                            <span className="text-xs font-medium truncate block w-full group-hover:text-primary transition-colors">
                              {q.text.length > 25 ? `${q.text.substring(0, 25)}...` : (q.text || 'Üres kérdés...')}
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase">{q.type}</span>
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuestionToDelete(index);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
                {searchQuery && !questions.some((q, i) =>
                  q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  `kérdés ${i + 1}`.includes(searchQuery.toLowerCase())
                ) && (
                    <p className="p-4 text-center text-xs text-muted-foreground">Nincs találat</p>
                  )}
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full text-xs" onClick={addQuestion}>
                    <Plus className="mr-1 h-3 w-3" />
                    Kérdés hozzáadása
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Toggle Button for Desktop */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`
            hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-50 h-14 w-6 items-center justify-center bg-card border border-l-0 rounded-r-md shadow-md transition-all duration-300 group
            ${isSidebarOpen ? 'translate-x-[287px]' : 'translate-x-0'}
            hover:bg-primary hover:text-white
          `}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 group-hover:animate-pulse" />}
        </button>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scroll-smooth pb-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-3xl space-y-6">
              {/* AI Helper section - ALWAYS VISIBLE */}
              <div id="ai-helper" className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm scroll-mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-bold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Segéd
                  </h2>
                  <Badge variant="outline" className="bg-background">Beta</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ai-assistant-input">Mit generáljon az AI? (Instrukciók)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ai-assistant-input"
                      placeholder="pl. 10 kérdés a törtekről 5. osztályos szinten..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="bg-background border-primary/30 focus-visible:ring-primary"
                    />
                    <Button
                      onClick={handleAIGenerate}
                      disabled={generating || !aiPrompt.trim()}
                      className="whitespace-nowrap"
                    >
                      {generating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {generating ? 'Generálás...' : 'Kérdések generálása'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quiz metadata */}
              <div id="quiz-metadata" className="rounded-xl border bg-card p-6 shadow-sm scroll-mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Kvíz címe</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="pl. Alapvető összeadás"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Leírás</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Rövid leírás a kvízről..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tantárgy</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                    <Label htmlFor="quiz-topic-input">Kvíz témaköre (Mentett adat)</Label>
                    <Input
                      id="quiz-topic-input"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="pl. Törtek, Összeadás..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Évfolyam</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
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
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                    <Label>Publikus (más tanárok is láthatják)</Label>
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Kérdések</h2>
                {questions.map((question, index) => (
                  <div key={question.id} id={`question-${index}`} className="scroll-mt-6">
                    <QuestionEditor
                      question={question}
                      index={index}
                      onChange={(q) => updateQuestion(index, q)}
                      onDelete={() => setQuestionToDelete(index)}
                    />
                  </div>
                ))}
                <div className="py-4">
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 hover:bg-accent transition-colors" onClick={addQuestion}>
                    <Plus className="mr-2 h-5 w-5" />
                    Új kérdés hozzáadása a kvízhez
                  </Button>
                </div>
              </div>

              {/* Save Bottom */}
              <div className="flex justify-end gap-3 pb-10">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Mégse
                </Button>
                <Button onClick={handleSave} disabled={saving} className="px-8 font-bold">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Mentés...' : 'Kvíz véglegesítése'}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={questionToDelete !== null} onOpenChange={(open) => !open && setQuestionToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Kérdés törlése
            </DialogTitle>
            <DialogDescription>
              Biztosan törlöd ezt a kérdést? Ezt a műveletet nem lehet visszavonni.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-between gap-2 mt-4">
            <Button variant="ghost" onClick={() => setQuestionToDelete(null)}>
              Mégse
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (questionToDelete !== null) {
                  deleteQuestion(questionToDelete);
                  setQuestionToDelete(null);
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Kérdés törlése
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizEditor;
