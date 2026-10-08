import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserCircle } from 'lucide-react';
import { getStudentSessionId } from '@/types/quiz';
import type { Room, AvatarData } from '@/types/quiz';
import { AvatarSelector } from '@/components/quiz/AvatarSelector';
import { findActiveRoomByCode, joinRoomParticipant } from '@/services/db';

const JoinRoom = () => {
  const { code: urlCode } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(urlCode || '');
  const [name, setName] = useState('');
  const [room, setRoom] = useState<Room | null>(null);
  const [joining, setJoining] = useState(false);
  const [step, setStep] = useState<'code' | 'name' | 'avatar'>(!urlCode ? 'code' : 'name');
  const [avatar, setAvatar] = useState<AvatarData>({ character: '🐻', accessory: 'none' });

  useEffect(() => {
    if (urlCode) {
      findRoom(urlCode);
    }
  }, [urlCode]);

  const findRoom = async (roomCode: string) => {
    try {
      const foundRoom = await findActiveRoomByCode(roomCode);
      if (!foundRoom) {
        toast.error('Szoba nem található vagy már lezárult.');
        setStep('code');
        return;
      }

      setRoom(foundRoom);
      setStep('name');
    } catch (err: any) {
      toast.error('Hiba a szoba keresésekor: ' + err.message);
      setStep('code');
    }
  };

  const handleCodeSubmit = () => {
    if (code.length !== 6) {
      toast.error('A szobakód 6 számjegyből áll');
      return;
    }
    findRoom(code);
  };

  const handleJoin = async (overrideAvatar?: AvatarData) => {
    if (!room || !name.trim()) {
      toast.error('Add meg a neved!');
      return;
    }

    setJoining(true);
    const sessionId = getStudentSessionId();
    const finalAvatar = overrideAvatar || avatar;

    try {
      const participant = await joinRoomParticipant(
        room.id,
        name.trim(),
        sessionId,
        finalAvatar
      );

      sessionStorage.setItem('participant_id', participant.id);
      sessionStorage.setItem('student_name', name.trim());
      sessionStorage.setItem('student_avatar', JSON.stringify(finalAvatar));
      setJoining(false);
      navigate(`/play/${room.id}`);
    } catch (err: any) {
      setJoining(false);
      toast.error('Nem sikerült csatlakozni: ' + err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-[#030712] p-4">
      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
      <Card className="w-full max-w-md shadow-2xl border-border/80 relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-background border p-1.5 border-primary/20 shadow-sm overflow-hidden">
            <img src="/favicon.ico" alt="KvízMester" className="h-full w-full object-contain" />
          </div>
          <CardTitle className="font-display text-2xl">KvízMester</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'code' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-center block">Szobakód megadása</Label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(v);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCodeSubmit()}
                  className="text-center text-3xl font-bold tracking-[0.3em] font-display h-16"
                  maxLength={6}
                />
              </div>
              <Button className="w-full" size="lg" onClick={handleCodeSubmit} disabled={code.length !== 6}>
                Tovább
              </Button>
            </div>
          )}

          {step === 'name' && (
            <div className="space-y-4">
              {room && (
                <div className="rounded-lg bg-muted p-3 text-center">
                  <div className="text-sm text-muted-foreground">Szoba</div>
                  <div className="font-display text-lg font-bold tracking-widest text-primary">{room.code}</div>
                </div>
              )}
              <div className="space-y-2">
                <Label>Mi a neved?</Label>
                <Input
                  type="text"
                  placeholder="Írd be a neved..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  className="text-lg"
                  maxLength={30}
                  autoFocus
                />
              </div>
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                onClick={() => setStep('avatar')}
                disabled={joining || !name.trim()}
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Avatár választása
              </Button>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => { setStep('code'); setRoom(null); }}>
                Másik szobakód
              </Button>
            </div>
          )}

          {step === 'avatar' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="sm" onClick={() => setStep('name')} className="p-0 h-auto">
                  Vissza
                </Button>
                <div className="text-sm font-medium">Lépés 3/3 - Avatár választása</div>
              </div>
              <AvatarSelector
                onSelect={(selectedAvatar) => {
                  setAvatar(selectedAvatar);
                  handleJoin(selectedAvatar);
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinRoom;
