import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Play, Trash2, Edit, Copy, Users, Brain, Search, RefreshCw } from 'lucide-react';
import type { Quiz, Room } from '@/types/quiz';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [rooms, setRooms] = useState<(Room & { quiz_title?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [quizRes, roomRes] = await Promise.all([
        supabase.from('quizzes').select('*').eq('teacher_id', user.id).order('created_at', { ascending: false }),
        supabase.from('rooms').select('*, quizzes(title)').eq('teacher_id', user.id).order('created_at', { ascending: false }),
      ]);

      if (quizRes.data) {
        setQuizzes(quizRes.data.map((q: any) => ({ ...q, questions: q.questions as any })));
      }
      if (roomRes.data) {
        setRooms(roomRes.data.map((r: any) => ({
          ...r,
          quiz_title: r.quizzes?.title || 'Ismeretlen kvíz',
        })));
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const deleteQuiz = async (id: string) => {
    const { error } = await supabase.from('quizzes').delete().eq('id', id);
    if (error) {
      toast.error('Hiba a törléskor');
    } else {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      toast.success('Kvíz törölve');
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
    await supabase.from('room_participants').update({ is_active: false }).eq('room_id', roomId);
    await supabase.from('rooms').update({
      status: 'waiting',
      current_question_index: 0,
      started_at: null,
      ended_at: null,
      session_number: newSession,
    }).eq('id', roomId);
    setRooms((prev) => prev.map((r) => r.id === roomId ? { ...r, status: 'waiting' as const } : r));
    toast.success('Szoba újraindítva!');
  };

  const deleteRoom = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt a szobát? Az összes kapcsolódó eredmény is törlődni fog.')) return;

    const { error } = await supabase.from('rooms').delete().eq('id', id);
    if (error) {
      toast.error('Hiba a törléskor');
    } else {
      setRooms((prev) => prev.filter((r) => r.id !== id));
      toast.success('Szoba törölve');
    }
  };

  const deleteAllRooms = async () => {
    if (!confirm('Biztosan törlöd az ÖSSZES szobádat? Ez a művelet nem vonható vissza!')) return;

    const { error } = await supabase.from('rooms').delete().eq('teacher_id', user?.id);
    if (error) {
      toast.error('Hiba a tömeges törléskor');
    } else {
      setRooms([]);
      toast.success('Az összes szoba törölve');
    }
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.title.toLowerCase().includes(query) ||
      (q.description || '').toLowerCase().includes(query) ||
      (q.subject || '').toLowerCase().includes(query) ||
      ((q as any).topic || '').toLowerCase().includes(query)
    );
  });

  const quizzesByGrade = filteredQuizzes.reduce((acc, quiz) => {
    const grade = quiz.grade_level || 'Egyéb / Nincs megadva';
    const topic = (quiz as any).topic || 'Általános / Nincs témakör';

    if (!acc[grade]) acc[grade] = {};
    if (!acc[grade][topic]) acc[grade][topic] = [];

    acc[grade][topic].push(quiz);
    return acc;
  }, {} as Record<string, Record<string, Quiz[]>>);

  const roomsByClass = rooms.reduce((acc, room) => {
    const className = room.class_name || 'Osztály nélküli';
    if (!acc[className]) acc[className] = [];
    acc[className].push(room);
    return acc;
  }, {} as Record<string, (Room & { quiz_title?: string })[]>);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Vezérlőpult</h1>
          <p className="text-muted-foreground">Kezeld a kvízeidet és szobáidat</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/quiz/new">
              <Plus className="mr-2 h-4 w-4" />
              Új kvíz
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/room/new">
              <Play className="mr-2 h-4 w-4" />
              Szoba létrehozása
            </Link>
          </Button>
        </div>

        {/* My Quizzes */}
        <section className="mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-foreground">Kvízeim</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kvíz keresése..."
                className="pl-9"
              />
            </div>
          </div>

          {filteredQuizzes.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  {searchQuery ? 'Nincs találat.' : 'Még nincsenek kvízeid. Hozd létre az elsőt!'}
                </p>
                {!searchQuery && (
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
              {Object.entries(quizzesByGrade).sort().map(([grade, topics]) => (
                <div key={grade} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="bg-primary px-4 py-1.5 text-sm font-bold shadow-sm">
                      {grade}
                    </Badge>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
                  </div>

                  <div className="space-y-8 pl-2 sm:pl-4">
                    {Object.entries(topics).sort().map(([topicName, topicQuizzes]) => (
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
                                <div className="mb-3">
                                  <p className="line-clamp-1 text-[11px] text-muted-foreground italic">
                                    {quiz.subject}
                                  </p>
                                </div>
                                <div className="mt-auto flex items-center justify-between gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                      deleteQuiz(quiz.id);
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

        {/* My Rooms */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">Szobáim</h2>
            {rooms.length > 0 && (
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={deleteAllRooms}>
                <Trash2 className="mr-2 h-4 w-4" />
                Összes törlése
              </Button>
            )}
          </div>
          {rooms.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">Még nincsenek szobáid.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(roomsByClass).map(([className, classRooms]) => (
                <div key={className} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-border"></div>
                    <Badge variant="outline" className="px-3 py-1 font-display text-sm font-bold bg-muted/50">
                      {className}
                    </Badge>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {classRooms.map((room) => (
                      <Card key={room.id} className="transition-shadow hover:shadow-md relative group">
                        <CardHeader className="pb-3 pr-10">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <span className="font-mono text-primary">{room.code}</span>
                                <button onClick={() => copyRoomCode(room.code)} className="text-muted-foreground hover:text-foreground">
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                              </CardTitle>
                              <CardDescription>{room.quiz_title}</CardDescription>
                            </div>
                            <Badge
                              variant={room.status === 'active' ? 'default' : room.status === 'completed' ? 'secondary' : 'outline'}
                            >
                              {room.status === 'waiting' ? 'Várakozik' : room.status === 'active' ? 'Aktív' : 'Befejezett'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-3 text-sm text-muted-foreground">
                            {room.grade && <span>{room.grade} evfolyam</span>}
                            {room.notes && <span> · {room.notes}</span>}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/room/${room.id}`}>
                                <Users className="mr-1 h-3 w-3" />
                                Kezelés
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/results/${room.id}`}>Eredmények</Link>
                            </Button>
                            {room.status === 'completed' && (
                              <Button size="sm" variant="ghost" onClick={() => restartRoom(room.id)}>
                                <RefreshCw className="mr-1 h-3 w-3" />
                                Újraindítás
                              </Button>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-6 right-6 h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                            onClick={() => deleteRoom(room.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
    </div>
  );
};

export default Dashboard;
