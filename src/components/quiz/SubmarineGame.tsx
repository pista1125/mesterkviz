import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, AlertTriangle, Trophy, XCircle } from 'lucide-react';
import type { Room, RoomParticipant } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface SubmarineGameProps {
  room: Room;
  participants: RoomParticipant[];
  onEnd: () => void;
}

export const SubmarineGame: React.FC<SubmarineGameProps> = ({ room, participants, onEnd }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalDuration = room.game_duration_seconds || 300;
  const initialSafety = 60; // 1 minute
  
  // Calculate current safety time based on boosts and elapsed time
  const currentSafety = useMemo(() => {
    const boostTime = (room.submarine_boosts || 0) * 10;
    const safety = initialSafety + boostTime - elapsedTime;
    return Math.max(0, safety);
  }, [room.submarine_boosts, elapsedTime]);

  const isGameOver = currentSafety <= 0;
  const isVictory = elapsedTime >= totalDuration && !isGameOver;

  // Timer for elapsed time
  useEffect(() => {
    if (room.status !== 'active' || isGameOver || isVictory) return;

    const startTime = room.started_at ? new Date(room.started_at).getTime() : Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000);
      setElapsedTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [room.status, room.started_at, isGameOver, isVictory]);

  // Handle game over logic
  useEffect(() => {
    if (isGameOver && room.status === 'active') {
      const autoEnd = async () => {
        await supabase.from('rooms').update({ 
          status: 'completed', 
          ended_at: new Date().toISOString() 
        }).eq('id', room.id);
      };
      autoEnd();
    }
  }, [isGameOver, room.id, room.status]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / (totalDuration + 1) * 0); // Placeholder to avoid negative
    const displaySecs = Math.max(0, seconds);
    const minsActual = Math.floor(displaySecs / 60);
    const secsActual = displaySecs % 60;
    return `${minsActual}:${secsActual.toString().padStart(2, '0')}`;
  };

  // Progress percentage (0 to 100)
  const gameProgress = Math.min(100, (elapsedTime / totalDuration) * 100);
  
  // Visual positions (0 to 100% of viewport width)
  // Submarine stays in a steady position on the right
  const subPos = 75; 
  // Shark approaches from the left based on safety distance
  // If safety is 60m (max), shark is far away (diff of ~50%)
  // If safety is 0m, shark is touching the sub
  const safetyOffset = (currentSafety / 60) * 50; 
  const sharkPos = Math.max(5, subPos - 15 - safetyOffset);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-4 ring-slate-800">
      {/* Deep Sea Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1s] ease-linear"
        style={{ 
          backgroundImage: 'url("/game/submarine-bg.png")',
          transform: `scale(1.1) translateX(${-gameProgress * 0.1}%)`
        }}
      />
      
      {/* Bubbles Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/40"
            initial={{ y: '110%', x: `${Math.random() * 100}%` }}
            animate={{ y: '-10%', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* UI Overlay - Top */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md border border-white/10">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="font-display font-bold text-white tracking-widest">{formatTime(totalDuration - elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md border border-white/10">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-display font-bold text-white">{room.submarine_boosts} BOOST</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <div className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-8 py-3 backdrop-blur-md transition-all ${
            currentSafety < 20 ? 'animate-pulse border-red-500 bg-red-500/30' : 'border-blue-500/30 bg-black/60'
          }`}>
            <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Cápa távolsága</span>
            <span className={`font-display text-5xl font-black ${
              currentSafety < 20 ? 'text-red-500' : 'text-white'
            }`}>
              {Math.floor(currentSafety)}m
            </span>
          </div>
        </div>
      </div>

      {/* Main Animation Area */}
      <div className="relative flex h-full w-full items-center px-12">
        <motion.div
          className="absolute z-10"
          animate={{ 
            left: `${sharkPos}%`,
            y: [0, -20, 0],
            rotate: [2, 0, -2, 2]
          }}
          transition={{
            left: { duration: 1.5, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ 
            width: '35%', 
            maxWidth: '500px'
          }}
        >
          <img 
            src="/game/shark.png" 
            alt="Shark" 
            className="h-auto w-full" 
            style={{ 
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
        </motion.div>

        {/* Submarine */}
        <motion.div
          className="absolute z-10"
          animate={{ 
            left: `${subPos}%`,
            y: [-10, 10, -10],
            rotate: [1, -2, 1]
          }}
          transition={{
            left: { duration: 1, ease: "easeOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ 
            width: '20%', 
            maxWidth: '280px'
          }}
        >
          <div className="relative">
            <img 
              src="/game/submarine.png" 
              alt="Submarine" 
              className="h-auto w-full" 
              style={{ 
                mixBlendMode: 'screen',
                filter: 'brightness(1.2) contrast(1.1)'
              }}
            />
            <motion.div 
              className="absolute -left-1 top-1/2 h-6 w-3 bg-yellow-400 blur-md rounded-full"
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.8, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-10 left-12 right-12 z-20">
        <div className="relative h-6 w-full rounded-full bg-black/60 p-1 backdrop-blur-sm overflow-hidden border border-white/20">
          <motion.div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${gameProgress}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
          <div className="absolute right-0 top-0 flex h-full items-center pr-3">
            <Trophy className="h-4 w-4 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
          </div>
        </div>
        <div className="mt-3 flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-white/50">
          <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> RAJT</span>
          <span className="flex items-center gap-1">SZABADSÁG <Trophy className="h-3 w-3" /></span>
        </div>
      </div>

      {/* Danger Overlay */}
      <AnimatePresence>
        {currentSafety < 15 && !isGameOver && !isVictory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 z-30 bg-red-600 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Victory / Defeat Screens */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, backdropFilter: "blur(12px)" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: 5 }}
            >
              <XCircle className="mb-8 h-40 w-40 text-red-500 drop-shadow-[0_0_50px_rgba(239,68,68,0.7)]" />
            </motion.div>
            <h2 className="mb-4 font-display text-8xl font-black text-white tracking-tighter">GAME OVER</h2>
            <p className="text-3xl font-medium text-red-300">A cápa vacsorája lettetek! 🦈</p>
            <Button size="lg" className="mt-16 bg-red-600 hover:bg-red-700 text-white font-bold h-16 px-12 text-xl rounded-2xl" onClick={onEnd}>
              Eredmények megtekintése
            </Button>
          </motion.div>
        )}

        {isVictory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, scale: 1, backdropFilter: "blur(12px)" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-600/90 p-8 text-center"
          >
             <motion.div
              animate={{ y: [-20, 0, -20], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Trophy className="mb-8 h-40 w-40 text-yellow-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.8)]" />
            </motion.div>
            <h2 className="mb-4 font-display text-8xl font-black text-white tracking-tighter">GYŐZELEM!</h2>
            <p className="text-3xl font-medium text-blue-50">Sikerült elmenekülni a mélységbe! 🌊</p>
            <Button size="lg" className="mt-16 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black h-16 px-12 text-xl rounded-2xl" onClick={onEnd}>
              MUTASD A RANGLISTÁT!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
