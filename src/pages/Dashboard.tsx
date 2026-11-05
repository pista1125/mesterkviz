import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Plus,
  Play,
  Trash2,
  Edit,
  Copy,
  Users,
  Brain,
  Search,
  RefreshCw,
  Settings2,
  Loader2,
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  X,
  BookOpen,
} from 'lucide-react';
import type { Quiz, Room } from '@/types/quiz';
import { generateRoomCode } from '@/types/quiz';
import {
  getTeacherQuizzes,
  getTeacherRooms,
  deleteQuiz as removeQuizFromDb,
  createRoom,
  updateRoom,
  getRoomById,
  deleteParticipant,
  getRoomParticipants,
} from '@/services/db';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface EnrichedRoom extends Room {
  quiz_title: string;
  grade_level: string;
  topic: string;
  subject: string;
  participant_count: number;
  formatted_date: string;
}

const formatSubject = (s: string) => {
  if (!s || !s.trim()) return 'Egyéb';
  const clean = s.trim();
  const lower = clean.toLowerCase();
  if (lower === 'matematika') return 'Matematika';
  if (lower === 'magyar') return 'Magyar nyelv';
  if (lower === 'természettudomány' || lower === 'természettudomany') return 'Természettudomány';
  if (lower === 'történelem' || lower === 'tortenelem') return 'Történelem';
  if (lower === 'földrajz' || lower === 'foldrajz') return 'Földrajz';
  if (lower === 'informatika') return 'Informatika';
  if (lower === 'fizika') return 'Fizika';
  if (lower === 'kémia' || lower === 'kemia') return 'Kémia';
  if (lower === 'biológia' || lower === 'biologia' || lower === 'biosz') return 'Biológia';
  if (lower === 'angol') return 'Angol nyelv';
  if (lower === 'egyéb' || lower === 'egyeb') return 'Egyéb';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [rooms, setRooms] = useState<EnrichedRoom[]>([]);
  const [loading, setLoading] = useState(true);

  // Quizzes filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'updated-desc' | 'updated-asc' | 'questions-desc' | 'questions-asc'>('title-asc');
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  // Rooms filtering state
  const [roomSearchQuery, setRoomSearchQuery] = useState('');
  const [roomSelectedGrade, setRoomSelectedGrade] = useState<string | null>(null);
  const [roomSelectedSubject, setRoomSelectedSubject] = useState<string | null>(null);
  const [roomSelectedTopic, setRoomSelectedTopic] = useState<string | null>(null);
  const [roomStatusFilter, setRoomStatusFilter] = useState<'all' | 'waiting' | 'active' | 'completed'>('all');
  const [roomSortBy, setRoomSortBy] = useState<'newest' | 'oldest' | 'participants-desc' | 'title-asc'>('newest');

  // Quick Start State
  const [quickStartQuiz, setQuickStartQuiz] = useState<Quiz | null>(null);
  const [gameMode, setGameMode] = useState<'classic' | 'submarine'>('classic');
  const [gameDuration, setGameDuration] = useState(300);
  const [timeLimit, setTimeLimit] = useState(15);
  const [showResults, setShowResults] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [fetchedQuizzes, fetchedRooms] = await Promise.all([
          getTeacherQuizzes(user.id),
          getTeacherRooms(user.id),
        ]);

        setQuizzes(fetchedQuizzes);

        // Fetch participant counts for rooms in parallel
        const participantCounts = await Promise.all(
          fetchedRooms.map(async (r) => {
            try {
              const parts = await getRoomParticipants(r.id);
              return { id: r.id, count: parts.length };
            } catch {
              return { id: r.id, count: 0 };
            }
          })
        );
        const countMap = new Map(participantCounts.map((p) => [p.id, p.count]));

        // Map quiz details to rooms
        const quizMap = new Map(fetchedQuizzes.map((q) => [q.id, q]));
        const mappedRooms: EnrichedRoom[] = fetchedRooms.map((r) => {
          const q = quizMap.get(r.quiz_id);
          const rawDate = r.created_at || r.started_at;
          const formatted_date = rawDate
            ? new Date(rawDate).toLocaleString('hu-HU', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Nem ismert dátum';

          return {
            ...r,
            quiz_title: q?.title || 'Ismeretlen kvíz',
            grade_level: r.grade || q?.grade_level || 'Egyéb',
            topic: (q as any)?.topic || 'Általános / Nincs témakör',
            subject: formatSubject(q?.subject || 'egyéb'),
            participant_count: countMap.get(r.id) || 0,
            formatted_date,
          };
        });

        // Sort rooms by created_at desc
        mappedRooms.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
        setRooms(mappedRooms);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Hiba az adatok betöltésekor: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const deleteQuiz = async (id: string) => {
    try {
      await removeQuizFromDb(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      toast.success('Kvíz törölve');
    } catch (error: any) {
      toast.error('Hiba a törléskor: ' + error.message);
    }
  };

  const copyRoomCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Szobakód másolva: ' + code);
  };

  const restartRoom = async (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return;
    const newSession = ((room as any).session_number || 1) + 1;
    
    try {
      const participants = await getRoomParticipants(roomId);
      for (const p of participants) {
        await deleteDoc(doc(db, 'room_participants', p.id));
      }

      await updateRoom(roomId, {
        status: 'waiting',
        current_question_index: 0,
        started_at: null,
        ended_at: null,
        session_number: newSession,
      });

      setRooms((prev) =>
        prev.map((r) =>
          r.id === roomId
            ? { ...r, status: 'waiting' as const, session_number: newSession, participant_count: 0 }
            : r
        )
      );
      toast.success('Szoba újraindítva!');
    } catch (err: any) {
      toast.error('Hiba az újraindításkor: ' + err.message);
    }
  };

  const deleteRoom = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt a szobát? Az összes kapcsolódó eredmény is törlődni fog.')) return;

    try {
      await deleteDoc(doc(db, 'rooms', id));
      setRooms((prev) => prev.filter((r) => r.id !== id));
      toast.success('Szoba törölve');
    } catch (error: any) {
      toast.error('Hiba a törléskor');
    }
  };

  const deleteAllRooms = async () => {
    if (!confirm('Biztosan törlöd az ÖSSZES szobádat? Ez a művelet nem vonható vissza!')) return;

    try {
      for (const r of rooms) {
        await deleteDoc(doc(db, 'rooms', r.id));
      }
      setRooms([]);
      toast.success('Az összes szoba törölve');
    } catch (error: any) {
      toast.error('Hiba a tömeges törléskor');
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
        time_limit_seconds: timeLimit,
        show_results_to_students: showResults,
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

  const handleGradeChange = (grade: string | null) => {
    setSelectedGrade(grade);
    setSelectedTopic(null);
  };

  // QUIZZES FILTER LOGIC
  const availableSubjects = Array.from(
    new Set(
      quizzes
        .map((q) => formatSubject(q.subject?.trim() || ''))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'hu', { sensitivity: 'base' }));

  const gradeButtonOptions = [
    'Összes',
    ...[1, 2, 3, 4]
      .filter((n) => quizzes.some((q) => q.grade_level?.startsWith(`${n}.`)))
      .map((n) => `${n}. osztály`),
    '5. osztály',
    '6. osztály',
    '7. osztály',
    '8. osztály',
    '9. osztály',
    '10. osztály',
    '11. osztály',
    '12. osztály',
    'Egyéb',
  ];

  const availableTopics = Array.from(
    new Set(
      quizzes
        .filter((q) => {
          if (selectedGrade) {
            if (selectedGrade === 'Egyéb') {
              const gl = (q.grade_level || '').trim();
              if (gl && gl !== 'Egyéb' && !gl.toLowerCase().includes('egyéb')) return false;
            } else if (q.grade_level !== selectedGrade) {
              return false;
            }
          }
          if (selectedSubject && formatSubject(q.subject || '').toLowerCase() !== selectedSubject.toLowerCase()) {
            return false;
          }
          return true;
        })
        .map((q) => (q as any).topic || 'Általános / Nincs témakör')
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'hu', { numeric: true }));

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedGrade) {
      if (selectedGrade === 'Egyéb') {
        const gl = (q.grade_level || '').trim();
        if (gl && gl !== 'Egyéb' && !gl.toLowerCase().includes('egyéb')) return false;
      } else if (q.grade_level !== selectedGrade) {
        return false;
      }
    }
    if (selectedSubject) {
      if (formatSubject(q.subject || '').toLowerCase() !== selectedSubject.toLowerCase()) return false;
    }
    const quizTopic = (q as any).topic || 'Általános / Nincs témakör';
    if (selectedTopic && quizTopic !== selectedTopic) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.title.toLowerCase().includes(query) ||
      (q.description || '').toLowerCase().includes(query) ||
      (q.subject || '').toLowerCase().includes(query) ||
      quizTopic.toLowerCase().includes(query)
    );
  });

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    switch (sortBy) {
      case 'title-asc':
        return a.title.localeCompare(b.title, 'hu', { numeric: true, sensitivity: 'base' });
      case 'title-desc':
        return b.title.localeCompare(a.title, 'hu', { numeric: true, sensitivity: 'base' });
      case 'updated-desc':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      case 'updated-asc':
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      case 'questions-desc':
        return b.questions.length - a.questions.length;
      case 'questions-asc':
        return a.questions.length - b.questions.length;
      default:
        return 0;
    }
  });

  const quizzesByGrade = sortedQuizzes.reduce((acc, quiz) => {
    const rawGrade = (quiz.grade_level || '').trim();
    const grade = (!rawGrade || rawGrade === 'Egyéb' || rawGrade.toLowerCase().includes('egyéb'))
      ? 'Egyéb'
      : rawGrade;
    const topic = (quiz as any).topic || 'Általános / Nincs témakör';

    if (!acc[grade]) acc[grade] = {};
    if (!acc[grade][topic]) acc[grade][topic] = [];

    acc[grade][topic].push(quiz);
    return acc;
  }, {} as Record<string, Record<string, Quiz[]>>);

  // ROOMS FILTERING LOGIC
  const availableRoomGrades = Array.from(
    new Set(rooms.map((r) => r.grade_level).filter(Boolean))
  ).sort((a, b) => {
    if (a === 'Egyéb') return 1;
    if (b === 'Egyéb') return -1;
    return a.localeCompare(b, 'hu', { numeric: true });
  });

  const availableRoomSubjects = Array.from(
    new Set(
      rooms
        .map((r) => formatSubject(r.subject?.trim() || ''))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'hu', { sensitivity: 'base' }));

  const availableRoomTopics = Array.from(
    new Set(
      rooms
        .filter((r) => {
          if (roomSelectedGrade) {
            if (roomSelectedGrade === 'Egyéb') {
              if (r.grade_level !== 'Egyéb' && !r.grade_level.toLowerCase().includes('egyéb')) return false;
            } else if (r.grade_level !== roomSelectedGrade) {
              return false;
            }
          }
          if (roomSelectedSubject && r.subject.toLowerCase() !== roomSelectedSubject.toLowerCase()) {
            return false;
          }
          return true;
        })
        .map((r) => r.topic)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'hu', { numeric: true }));

  const filteredRooms = rooms.filter((r) => {
    if (roomSelectedGrade) {
      if (roomSelectedGrade === 'Egyéb') {
        if (r.grade_level !== 'Egyéb' && !r.grade_level.toLowerCase().includes('egyéb')) return false;
      } else if (r.grade_level !== roomSelectedGrade) {
        return false;
      }
    }
    if (roomSelectedSubject && r.subject.toLowerCase() !== roomSelectedSubject.toLowerCase()) {
      return false;
    }
    if (roomSelectedTopic && r.topic !== roomSelectedTopic) return false;
    if (roomStatusFilter !== 'all' && r.status !== roomStatusFilter) return false;
    if (!roomSearchQuery) return true;
    const q = roomSearchQuery.toLowerCase();
    return (
      r.code.toLowerCase().includes(q) ||
      r.quiz_title.toLowerCase().includes(q) ||
      (r.class_name || '').toLowerCase().includes(q) ||
      r.grade_level.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      r.subject.toLowerCase().includes(q)
    );
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (roomSortBy) {
      case 'newest':
        return (b.created_at || '').localeCompare(a.created_at || '');
      case 'oldest':
        return (a.created_at || '').localeCompare(b.created_at || '');
      case 'participants-desc':
        return b.participant_count - a.participant_count;
      case 'title-asc':
        return a.quiz_title.localeCompare(b.quiz_title, 'hu', { numeric: true });
      default:
        return 0;
    }
  });

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
        {/* Top Header Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground drop-shadow-sm">Vezérlőpult</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" asChild>
              <Link to="/quiz/new">
                <Plus className="mr-1.5 h-4 w-4" />
                Új kvíz
              </Link>
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link to="/room/new">
                <Play className="mr-1.5 h-4 w-4" />
                Szoba létrehozása
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 shadow-sm" asChild>
              <Link to="/discover">
                <Search className="mr-1.5 h-4 w-4" />
                Publikus kvízek
              </Link>
            </Button>
          </div>
        </div>

        {/* Tabs Switcher for Quizzes and Rooms */}
        <Tabs defaultValue="quizzes" className="w-full">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3">
            <TabsList className="grid w-full sm:w-72 grid-cols-2 h-9 p-1 bg-muted/60 rounded-lg">
              <TabsTrigger
                value="quizzes"
                className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
              >
                <Brain className="h-3.5 w-3.5 text-primary" />
                <span>Kvízeim ({quizzes.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="rooms"
                className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
              >
                <Users className="h-3.5 w-3.5 text-secondary" />
                <span>Szobáim ({rooms.length})</span>
              </TabsTrigger>
            </TabsList>

            <span className="text-xs text-muted-foreground self-start sm:self-auto">
              Összesen {quizzes.length} db kvíz és {rooms.length} db aktív vagy korábbi szoba
            </span>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: QUIZZES CONTENT */}
          {/* ========================================================= */}
          <TabsContent value="quizzes" className="mt-0 focus-visible:outline-none">
            {/* Filter Bar for Quizzes */}
            <div className="mb-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 shadow-xs space-y-3.5">
              {/* Row 1: Grade Filters with 'Egyéb' */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  Évfolyam:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {gradeButtonOptions.map((grade) => {
                    const gradeValue = grade === 'Összes' ? null : grade;
                    const isActive = selectedGrade === gradeValue;
                    return (
                      <button
                        key={grade}
                        onClick={() => handleGradeChange(gradeValue)}
                        className={`
                          px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer
                          ${isActive
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm scale-105'
                            : 'bg-background hover:bg-accent border border-border/50 text-muted-foreground'}
                        `}
                      >
                        {grade}
                      </button>
                    );
                  })}
                </div>

                {/* Reset Filters button */}
                {(selectedGrade || selectedTopic || selectedSubject) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedGrade(null);
                      setSelectedTopic(null);
                      setSelectedSubject(null);
                    }}
                    className="h-7 text-xs text-muted-foreground hover:text-foreground ml-auto gap-1"
                  >
                    <X className="h-3.5 w-3.5" />
                    Szűrés törlése
                  </Button>
                )}
              </div>

              {/* Row 2: Subject & Topic Selects */}
              <div className="flex flex-wrap items-center gap-4 pt-2.5 border-t border-border/40">
                {/* Tantárgy Select */}
                {availableSubjects.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      Tantárgy:
                    </span>
                    <Select
                      value={selectedSubject || 'all'}
                      onValueChange={(val) => {
                        setSelectedSubject(val === 'all' ? null : val);
                        setSelectedTopic(null);
                      }}
                    >
                      <SelectTrigger className="w-52 bg-background border-border/80 text-xs h-8">
                        <SelectValue placeholder="Összes tantárgy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs font-medium">
                          Összes tantárgy ({quizzes.length} db)
                        </SelectItem>
                        {availableSubjects.map((subj) => {
                          const count = quizzes.filter(
                            (q) => formatSubject(q.subject || '').toLowerCase() === subj.toLowerCase()
                          ).length;
                          return (
                            <SelectItem key={subj} value={subj} className="text-xs">
                              {subj} ({count} db)
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Témakör Select */}
                {availableTopics.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Témakör:</span>
                    <Select
                      value={selectedTopic || 'all'}
                      onValueChange={(val) => setSelectedTopic(val === 'all' ? null : val)}
                    >
                      <SelectTrigger className="w-64 bg-background border-border/80 text-xs h-8">
                        <SelectValue placeholder="Összes témakör" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs font-medium">
                          Összes témakör ({quizzes.filter((q) => {
                            if (selectedGrade) {
                              if (selectedGrade === 'Egyéb') {
                                const gl = (q.grade_level || '').trim();
                                if (gl && gl !== 'Egyéb' && !gl.toLowerCase().includes('egyéb')) return false;
                              } else if (q.grade_level !== selectedGrade) {
                                return false;
                              }
                            }
                            if (selectedSubject && (q.subject || '').trim().toLowerCase() !== selectedSubject.toLowerCase()) {
                              return false;
                            }
                            return true;
                          }).length} db)
                        </SelectItem>
                        {availableTopics.map((top) => {
                          const count = quizzes.filter((q) => {
                            if (selectedGrade) {
                              if (selectedGrade === 'Egyéb') {
                                const gl = (q.grade_level || '').trim();
                                if (gl && gl !== 'Egyéb' && !gl.toLowerCase().includes('egyéb')) return false;
                              } else if (q.grade_level !== selectedGrade) {
                                return false;
                              }
                            }
                            if (selectedSubject && (q.subject || '').trim().toLowerCase() !== selectedSubject.toLowerCase()) {
                              return false;
                            }
                            return ((q as any).topic || 'Általános / Nincs témakör') === top;
                          }).length;

                          return (
                            <SelectItem key={top} value={top} className="text-xs">
                              {top} ({count} db)
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Active Filter Badges */}
                {selectedSubject && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs font-normal">
                    Tantárgy: {formatSubject(selectedSubject)}
                  </Badge>
                )}
                {selectedTopic && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs font-normal">
                    Témakör: {selectedTopic}
                  </Badge>
                )}
              </div>
            </div>

            {/* My Quizzes List */}
            <section className="mb-10">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-foreground">Kvízeim</h2>
                  <Badge variant="outline" className="text-xs font-mono font-semibold">
                    {sortedQuizzes.length} / {quizzes.length} db
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-60">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Kvíz keresése..."
                      className="pl-9"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                    <SelectTrigger className="w-56 bg-card border-border/80 shadow-sm">
                      <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                      <SelectValue placeholder="Rendezés..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title-asc">Név szerint (1-9, A-Z)</SelectItem>
                      <SelectItem value="title-desc">Név szerint (Z-A, 9-1)</SelectItem>
                      <SelectItem value="updated-desc">Legújabb elöl</SelectItem>
                      <SelectItem value="updated-asc">Legrégebbi elöl</SelectItem>
                      <SelectItem value="questions-desc">Kérdések (több → kevesebb)</SelectItem>
                      <SelectItem value="questions-asc">Kérdések (kevesebb → több)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filteredQuizzes.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">
                      {searchQuery || selectedGrade || selectedSubject || selectedTopic
                        ? 'Nincs találat a megadott keresési és szűrési feltételekre.'
                        : 'Még nincsenek kvízeid. Hozd létre az elsőt!'}
                    </p>
                    {!searchQuery && !selectedGrade && !selectedSubject && !selectedTopic && (
                      <Button className="mt-4" asChild>
                        <Link to="/quiz/new">
                          <Plus className="mr-2 h-4 w-4" />
                          Kvíz létrehozása
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-10">
                  {Object.entries(quizzesByGrade)
                    .sort(([gradeA], [gradeB]) => {
                      if (gradeA === 'Egyéb') return 1;
                      if (gradeB === 'Egyéb') return -1;
                      return gradeA.localeCompare(gradeB, 'hu', { numeric: true });
                    })
                    .map(([grade, topics]) => (
                    <div key={grade} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Badge variant="default" className="bg-primary px-4 py-1.5 text-sm font-bold shadow-sm">
                          {grade}
                        </Badge>
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
                      </div>

                      <div className="space-y-8 pl-2 sm:pl-4">
                        {Object.entries(topics)
                          .sort(([topicA], [topicB]) => topicA.localeCompare(topicB, 'hu', { numeric: true }))
                          .map(([topicName, topicQuizzes]) => (
                          <div key={topicName} className="space-y-3">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                              {topicName}
                              <span className="text-xs font-normal lowercase">({topicQuizzes.length} db)</span>
                            </h4>

                            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                              {topicQuizzes.map((quiz) => (
                                <Card key={quiz.id} className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/40 bg-card/50 backdrop-blur-sm border-muted/60">
                                  <CardHeader className="p-3 pb-1">
                                    <div className="mb-1 flex items-center justify-between gap-1">
                                      <Badge
                                        variant={quiz.is_published ? 'default' : 'secondary'}
                                        className="h-4 px-1 text-[10px] uppercase font-bold tracking-tighter"
                                      >
                                        {quiz.is_published ? 'Pub' : 'Priv'}
                                      </Badge>
                                      <span className="text-[10px] text-muted-foreground tabular-nums">
                                        {quiz.questions.length} Q
                                      </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                                      {quiz.title}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex-1 p-3 pt-1">
                                    <div className="mb-2">
                                      <div className="flex items-center gap-1.5">
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-muted/40 font-medium">
                                          {formatSubject(quiz.subject)}
                                        </Badge>
                                      </div>
                                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                                        Mentve: {new Date(quiz.updated_at).toLocaleString('hu-HU', { 
                                          year: 'numeric', 
                                          month: '2-digit', 
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between gap-1 pt-1 opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        className="h-7 flex-1 px-2 text-[11px] bg-primary/90 hover:bg-primary"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setQuickStartQuiz(quiz);
                                        }}
                                      >
                                        <Play className="mr-1 h-3 w-3 fill-current" />
                                        Indítás
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-7 flex-1 px-2 text-[11px]" asChild>
                                        <Link to={`/quiz/${quiz.id}/edit`}>
                                          <Edit className="mr-1 h-3 w-3" />
                                          Szerk.
                                        </Link>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setQuizToDelete(quiz.id);
                                        }}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          {/* ========================================================= */}
          {/* TAB 2: ROOMS CONTENT (WITH SUBJECT & GRADE & TOPIC FILTERS) */}
          {/* ========================================================= */}
          <TabsContent value="rooms" className="mt-0 focus-visible:outline-none">
            {/* Filter Bar for Rooms */}
            <div className="mb-6 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm p-4 shadow-xs space-y-3.5">
              {/* Row 1: Grade Filters with 'Egyéb' */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  Évfolyam:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      setRoomSelectedGrade(null);
                      setRoomSelectedTopic(null);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      roomSelectedGrade === null
                        ? 'bg-primary text-primary-foreground font-semibold shadow-sm scale-105'
                        : 'bg-background hover:bg-accent border border-border/50 text-muted-foreground'
                    }`}
                  >
                    Összes
                  </button>
                  {availableRoomGrades.map((grade) => {
                    const isActive = roomSelectedGrade === grade;
                    return (
                      <button
                        key={grade}
                        onClick={() => {
                          setRoomSelectedGrade(grade);
                          setRoomSelectedTopic(null);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm scale-105'
                            : 'bg-background hover:bg-accent border border-border/50 text-muted-foreground'
                        }`}
                      >
                        {grade}
                      </button>
                    );
                  })}
                </div>

                {/* Reset button if any filter active */}
                {(roomSelectedGrade || roomSelectedTopic || roomSelectedSubject || roomSearchQuery || roomStatusFilter !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRoomSelectedGrade(null);
                      setRoomSelectedTopic(null);
                      setRoomSelectedSubject(null);
                      setRoomSearchQuery('');
                      setRoomStatusFilter('all');
                    }}
                    className="h-7 text-xs text-muted-foreground hover:text-foreground ml-auto gap-1"
                  >
                    <X className="h-3.5 w-3.5" />
                    Szűrés törlése
                  </Button>
                )}
              </div>

              {/* Row 2: Subject & Topic & Status & Search & Sort */}
              <div className="flex flex-wrap items-center gap-3 pt-2.5 border-t border-border/40">
                {/* Room Subject Filter */}
                {availableRoomSubjects.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      Tantárgy:
                    </span>
                    <Select
                      value={roomSelectedSubject || 'all'}
                      onValueChange={(val) => {
                        setRoomSelectedSubject(val === 'all' ? null : val);
                        setRoomSelectedTopic(null);
                      }}
                    >
                      <SelectTrigger className="w-48 bg-background border-border/80 text-xs h-8">
                        <SelectValue placeholder="Összes tantárgy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs font-medium">
                          Összes tantárgy ({rooms.length} db)
                        </SelectItem>
                        {availableRoomSubjects.map((subj) => {
                          const count = rooms.filter(
                            (r) => formatSubject(r.subject || '').toLowerCase() === subj.toLowerCase()
                          ).length;
                          return (
                            <SelectItem key={subj} value={subj} className="text-xs">
                              {subj} ({count} db)
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Room Topic Select */}
                {availableRoomTopics.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">Témakör:</span>
                    <Select
                      value={roomSelectedTopic || 'all'}
                      onValueChange={(val) => setRoomSelectedTopic(val === 'all' ? null : val)}
                    >
                      <SelectTrigger className="w-52 bg-background border-border/80 text-xs h-8">
                        <SelectValue placeholder="Összes témakör" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs font-medium">
                          Összes témakör
                        </SelectItem>
                        {availableRoomTopics.map((top) => {
                          const count = rooms.filter((r) => {
                            if (roomSelectedGrade) {
                              if (roomSelectedGrade === 'Egyéb') {
                                if (r.grade_level !== 'Egyéb' && !r.grade_level.toLowerCase().includes('egyéb')) return false;
                              } else if (r.grade_level !== roomSelectedGrade) {
                                return false;
                              }
                            }
                            if (roomSelectedSubject && r.subject.toLowerCase() !== roomSelectedSubject.toLowerCase()) {
                              return false;
                            }
                            return r.topic === top;
                          }).length;
                          return (
                            <SelectItem key={top} value={top} className="text-xs">
                              {top} ({count} db)
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Státusz:</span>
                  <div className="flex items-center rounded-lg border bg-background/50 p-0.5 text-xs">
                    {(['all', 'waiting', 'active', 'completed'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setRoomStatusFilter(status)}
                        className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                          roomStatusFilter === status
                            ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {status === 'all' ? 'Mind' : status === 'waiting' ? 'Várakozik' : status === 'active' ? 'Aktív' : 'Befejezett'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-48 sm:w-56 ml-auto">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={roomSearchQuery}
                    onChange={(e) => setRoomSearchQuery(e.target.value)}
                    placeholder="Kód vagy kvíz keresése..."
                    className="pl-8 text-xs h-8 bg-background"
                  />
                </div>

                {/* Sort Dropdown */}
                <Select value={roomSortBy} onValueChange={(val: any) => setRoomSortBy(val)}>
                  <SelectTrigger className="w-48 bg-card border-border/80 shadow-xs text-xs h-8">
                    <ArrowUpDown className="mr-1.5 h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <SelectValue placeholder="Rendezés..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest" className="text-xs">Legújabb szoba elöl</SelectItem>
                    <SelectItem value="oldest" className="text-xs">Legrégebbi szoba elöl</SelectItem>
                    <SelectItem value="participants-desc" className="text-xs">Legtöbb résztvevő</SelectItem>
                    <SelectItem value="title-asc" className="text-xs">Kvíz címe (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* My Rooms List */}
            <section className="mb-10">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold text-foreground">Szobáim</h2>
                  <Badge variant="outline" className="text-xs font-mono font-semibold">
                    {sortedRooms.length} / {rooms.length} db
                  </Badge>
                </div>

                {rooms.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 text-xs h-8"
                    onClick={deleteAllRooms}
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Összes törlése
                  </Button>
                )}
              </div>

              {sortedRooms.length === 0 ? (
                <Card className="border-border/60">
                  <CardContent className="py-12 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Users className="h-6 w-6" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                      {rooms.length === 0
                        ? 'Még nincsenek szobáid. Indíts egy új szobát valamelyik kvízedből!'
                        : 'Nincs találat a kiválasztott szűrési feltételekre.'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedRooms.map((room) => {
                    const isWaiting = room.status === 'waiting';
                    const isActive = room.status === 'active';
                    const isCompleted = room.status === 'completed';

                    return (
                      <Card
                        key={room.id}
                        className={`relative group flex flex-col justify-between overflow-hidden border transition-all duration-200 hover:shadow-lg ${
                          isActive
                            ? 'border-emerald-500/50 bg-gradient-to-b from-card to-emerald-950/10 shadow-emerald-500/5'
                            : isWaiting
                            ? 'border-amber-500/40 bg-gradient-to-b from-card to-amber-950/10'
                            : 'border-border/80 bg-card/60 backdrop-blur-sm'
                        }`}
                      >
                        <CardHeader className="p-4 pb-2">
                          {/* Top Row: Code & Status Badge */}
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xl font-black tracking-wider text-primary">
                                {room.code}
                              </span>
                              <button
                                onClick={() => copyRoomCode(room.code)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                                title="Szobakód másolása"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <Badge
                              variant={isActive ? 'default' : isWaiting ? 'outline' : 'secondary'}
                              className={`text-[11px] font-bold px-2 py-0.5 flex items-center gap-1 ${
                                isActive
                                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                                  : isWaiting
                                  ? 'border-amber-500/60 text-amber-500 bg-amber-500/10'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {isActive ? (
                                <>
                                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                  <span>Aktív</span>
                                </>
                              ) : isWaiting ? (
                                <>
                                  <Clock className="h-3 w-3" />
                                  <span>Várakozik</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span>Befejezett</span>
                                </>
                              )}
                            </Badge>
                          </div>

                          {/* Quiz Title */}
                          <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {room.quiz_title}
                          </CardTitle>

                          {/* Category Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                            <Badge variant="outline" className="text-[10px] bg-muted/60 font-semibold">
                              {room.grade_level}
                            </Badge>
                            {room.subject && (
                              <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20 font-medium">
                                {formatSubject(room.subject)}
                              </Badge>
                            )}
                            {room.topic && room.topic !== 'Általános / Nincs témakör' && (
                              <Badge variant="secondary" className="text-[10px] text-muted-foreground font-normal max-w-[150px] truncate" title={room.topic}>
                                {room.topic}
                              </Badge>
                            )}
                            {room.session_number > 1 && (
                              <Badge variant="outline" className="text-[10px] border-primary/40 text-primary">
                                {room.session_number}. menet
                              </Badge>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="p-4 pt-2 space-y-3">
                          {/* Rich Metadata Section */}
                          <div className="space-y-1.5 pt-2 border-t border-border/50 text-xs text-muted-foreground">
                            {/* Participants Count */}
                            <div className="flex items-center gap-2">
                              <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="font-semibold text-foreground">
                                {room.participant_count > 0
                                  ? `${room.participant_count} diák vett részt`
                                  : 'Még nincs résztvevő'}
                              </span>
                            </div>

                            {/* Started / Created Date */}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span>Indítva: {room.formatted_date}</span>
                            </div>

                            {/* Class name / notes if present */}
                            {room.class_name && room.class_name !== room.grade_level && (
                              <div className="text-[11px] text-muted-foreground/80 italic truncate">
                                Osztály: {room.class_name}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-2">
                            <Button size="sm" variant="default" className="flex-1 text-xs h-8 shadow-xs" asChild>
                              <Link to={`/room/${room.id}`}>
                                <Play className="mr-1.5 h-3 w-3 fill-current" />
                                Vezérlés
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs h-8" asChild>
                              <Link to={`/results/${room.id}`}>
                                Eredmények
                              </Link>
                            </Button>
                            {isCompleted && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2 text-xs"
                                onClick={() => restartRoom(room.id)}
                                title="Szoba újraindítása"
                              >
                                <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => deleteRoom(room.id)}
                              title="Szoba törlése"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Start Modal Dialog */}
      <Dialog open={!!quickStartQuiz} onOpenChange={(open) => !open && !starting && setQuickStartQuiz(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              Kvíz indítása: {quickStartQuiz?.title}
            </DialogTitle>
            <DialogDescription>
              Válaszd ki a játékmódot és a beállításokat a játék indításához.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-3">
            {/* Game Modes */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Játékmód</Label>
              <RadioGroup value={gameMode} onValueChange={(v) => setGameMode(v as 'classic' | 'submarine')}>
                <div
                  className={cn(
                    "flex items-center space-x-3 rounded-lg border p-3.5 cursor-pointer transition-colors",
                    gameMode === 'classic' ? "border-primary bg-primary/5" : "hover:bg-accent/50"
                  )}
                  onClick={() => setGameMode('classic')}
                >
                  <RadioGroupItem value="classic" id="classic" />
                  <label htmlFor="classic" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-sm">Klasszikus</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Közös játék a kivetítőn, tanári kérdésvezérléssel</div>
                  </label>
                </div>
                <div
                  className={cn(
                    "flex items-center space-x-3 rounded-lg border p-3.5 cursor-pointer transition-colors",
                    gameMode === 'submarine' ? "bg-primary/5 border-primary" : "hover:bg-accent/50"
                  )}
                  onClick={() => setGameMode('submarine')}
                >
                  <RadioGroupItem value="submarine" id="submarine" />
                  <label htmlFor="submarine" className="flex-1 cursor-pointer">
                    <div className={cn("font-semibold text-sm", gameMode === 'submarine' ? "text-primary" : "")}>Tengeralattjáró 🦈</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Közös menekülés a cápa elől (diákok saját tempóban haladnak)</div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {gameMode === 'submarine' && (
              <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Játék időtartama</div>
                    <div className="text-xs text-muted-foreground">Mennyi ideig tartson a tengeralattjáró küldetés?</div>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {Math.floor(gameDuration / 60)} perc
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[180, 300, 480, 600].map((seconds) => (
                    <Button
                      key={seconds}
                      type="button"
                      variant={gameDuration === seconds ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setGameDuration(seconds)}
                    >
                      {seconds / 60} perc
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Time limit & Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <Label htmlFor="timelimit" className="text-sm font-semibold">
                  Időlimit kérdésenként
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="timelimit"
                    type="number"
                    min={5}
                    max={120}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Math.max(5, Math.min(120, parseInt(e.target.value) || 15)))}
                    className="w-24 text-center font-bold"
                  />
                  <span className="text-xs text-muted-foreground">másodperc</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="results" className="text-xs font-semibold cursor-pointer">
                    Eredmények mutatása
                  </Label>
                  <p className="text-[11px] text-muted-foreground">Diákok látják a helyes választ</p>
                </div>
                <Switch
                  id="results"
                  checked={showResults}
                  onCheckedChange={setShowResults}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setQuickStartQuiz(null)}
              disabled={starting}
            >
              Mégse
            </Button>
            <Button
              onClick={handleQuickStart}
              disabled={starting}
              className="gap-2 font-bold"
            >
              {starting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Indítás folyamatban...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  Szoba indítása
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Quiz Confirmation Dialog */}
      <Dialog open={!!quizToDelete} onOpenChange={(open) => !open && setQuizToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Kvíz törlése
            </DialogTitle>
            <DialogDescription>
              Biztosan törölni szeretnéd ezt a kvízt? Ez a művelet nem vonható vissza, és az összes kapcsolódó kérdés törlődik.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setQuizToDelete(null)}>
              Mégse
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (quizToDelete) {
                  deleteQuiz(quizToDelete);
                  setQuizToDelete(null);
                }
              }}
            >
              Kvíz törlése
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
