import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Crown, Sparkles } from 'lucide-react';
import { Avatar } from './Avatar';
import type { AvatarData, RoomParticipant } from '@/types/quiz';

interface Winner extends RoomParticipant {
  totalScore: number;
}

interface PodiumProps {
  winners: Winner[];
}

export const Podium = ({ winners }: PodiumProps) => {
  const first = winners[0];
  const second = winners[1];
  const third = winners[2];

  const hasMultiple = Boolean(second || third);

  const podiumVariants = {
    hidden: { opacity: 0, y: 40, scaleY: 0.4 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        delay: hasMultiple ? i * 1.0 : 0.2,
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    }),
  };

  const avatarVariants = {
    hidden: { scale: 0, y: 30, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        delay: hasMultiple ? i * 1.0 + 0.35 : 0.4,
        type: 'spring' as const,
        stiffness: 300,
        damping: 18,
      },
    }),
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: hasMultiple ? i * 1.0 + 0.55 : 0.6,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center justify-end select-none">
      {/* Dynamic Celebration Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[85%] h-[85%] bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.18)_0%,_rgba(37,99,235,0.08)_50%,_transparent_75%)] blur-2xl" />
      </div>

      <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto pt-2 pb-2">
        {/* 2nd Place (Silver) */}
        {second && (
          <div className="flex flex-col items-center order-1 w-1/3 max-w-[170px] z-10">
            {/* Avatar & Info */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={avatarVariants}
              className="mb-2 relative flex flex-col items-center"
            >
              <div className="relative">
                <Avatar
                  avatar={second.avatar as AvatarData}
                  size="md"
                  className="border-4 border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.5)]"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 rounded-full p-1.5 shadow-md border-2 border-white">
                  <Medal className="h-4 w-4" />
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={labelVariants}
              className="text-center mb-2 w-full px-1"
            >
              <div className="font-display font-bold text-sm sm:text-base text-slate-100 truncate">
                {second.student_name}
              </div>
              <div className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-slate-300/15 border border-slate-300/30 text-slate-300 font-mono text-xs font-bold">
                {second.totalScore} pont
              </div>
            </motion.div>

            {/* 3D Silver Pedestal */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={podiumVariants}
              className="w-full flex flex-col items-center origin-bottom"
            >
              {/* 3D Top Platform Ellipse */}
              <div className="w-full h-6 sm:h-8 rounded-[50%] bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 border-t-2 border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_8px_rgba(0,0,0,0.4)] -mb-3 sm:-mb-4 z-20 relative flex items-center justify-center">
                <div className="w-[84%] h-[68%] rounded-[50%] bg-gradient-to-r from-slate-300 via-white to-slate-300 border border-white/60 shadow-inner" />
              </div>

              {/* 3D Cylinder Front Pillar */}
              <div className="w-full h-24 sm:h-30 md:h-32 bg-gradient-to-r from-slate-600 via-slate-300 via-slate-100 via-slate-300 to-slate-700 rounded-b-2xl sm:rounded-b-3xl shadow-[0_12px_25px_rgba(100,116,139,0.35),inset_0_-4px_8px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col items-center justify-start pt-2.5 sm:pt-3 border-x border-b border-slate-400/40">
                {/* Vertical cylindrical highlight sheen */}
                <div className="absolute inset-y-0 left-1/4 w-6 sm:w-10 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                {/* 3D Embossed Number 2 */}
                <div className="relative font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter text-slate-800/80 drop-shadow-[0_2px_1px_rgba(255,255,255,0.6)] select-none">
                  2
                </div>
              </div>

              {/* Base Rim & Floor Shadow */}
              <div className="w-[90%] h-3 sm:h-4 rounded-[50%] bg-slate-900/40 -mt-2 z-10" />
              <div className="w-[110%] h-4 sm:h-5 rounded-[50%] bg-black/60 blur-md -mt-3 z-0" />
            </motion.div>
          </div>
        )}

        {/* 1st Place (Gold) */}
        {first && (
          <div
            className={`flex flex-col items-center order-2 z-20 ${
              hasMultiple ? 'w-1/3 max-w-[200px] sm:max-w-[220px]' : 'w-full max-w-[240px] sm:max-w-[270px]'
            }`}
          >
            {/* Avatar & Floating Crown */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={avatarVariants}
              className="mb-2 relative flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [-4, 2, -4], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="mb-1 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]"
              >
                <Crown className="h-8 w-8 sm:h-9 sm:w-9 fill-yellow-400" />
              </motion.div>

              <div className="relative">
                <Avatar
                  avatar={first.avatar as AvatarData}
                  size={hasMultiple ? 'lg' : 'xl'}
                  className="border-4 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.7)] ring-4 ring-yellow-400/30"
                />
                <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-br from-yellow-300 to-amber-500 text-yellow-950 rounded-full p-1.5 shadow-lg border-2 border-white animate-pulse">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={labelVariants}
              className="text-center mb-2 w-full px-1"
            >
              <div className="font-display font-black text-base sm:text-lg md:text-xl text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.5)] truncate">
                {first.student_name}
              </div>
              <div className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 font-mono text-xs sm:text-sm font-black shadow-sm">
                {first.totalScore} pont
              </div>
            </motion.div>

            {/* 3D Gold Pedestal */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={podiumVariants}
              className="w-full flex flex-col items-center origin-bottom"
            >
              {/* 3D Top Platform Ellipse */}
              <div className="w-full h-7 sm:h-9 rounded-[50%] bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-600 border-t-2 border-yellow-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_10px_rgba(0,0,0,0.4)] -mb-3.5 sm:-mb-4.5 z-20 relative flex items-center justify-center">
                <div className="w-[84%] h-[68%] rounded-[50%] bg-gradient-to-r from-yellow-300 via-amber-100 to-yellow-400 border border-white/60 shadow-inner flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600/40" />
                </div>
              </div>

              {/* 3D Cylinder Front Pillar */}
              <div className="w-full h-34 sm:h-42 md:h-46 bg-gradient-to-r from-amber-700 via-amber-400 via-yellow-200 via-amber-400 to-amber-800 rounded-b-2xl sm:rounded-b-3xl shadow-[0_16px_35px_rgba(217,119,6,0.4),inset_0_-4px_8px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center justify-start pt-3 sm:pt-4 border-x border-b border-amber-500/50">
                {/* Vertical cylindrical highlight sheen */}
                <div className="absolute inset-y-0 left-1/4 w-8 sm:w-14 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                {/* 3D Embossed Number 1 */}
                <div className="relative font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-amber-950/80 drop-shadow-[0_2px_1px_rgba(255,255,255,0.6)] select-none">
                  1
                </div>
              </div>

              {/* Base Rim & Floor Shadow */}
              <div className="w-[92%] h-4 sm:h-5 rounded-[50%] bg-amber-950/50 -mt-2.5 z-10" />
              <div className="w-[115%] h-5 sm:h-7 rounded-[50%] bg-black/70 blur-md -mt-3.5 z-0" />
            </motion.div>
          </div>
        )}

        {/* 3rd Place (Bronze) */}
        {third && (
          <div className="flex flex-col items-center order-3 w-1/3 max-w-[150px] z-10">
            {/* Avatar & Info */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={avatarVariants}
              className="mb-2 relative flex flex-col items-center"
            >
              <div className="relative">
                <Avatar
                  avatar={third.avatar as AvatarData}
                  size="sm"
                  className="sm:h-12 sm:w-12 border-4 border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                />
                <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-amber-400 to-amber-700 text-amber-950 rounded-full p-1 shadow-md border-2 border-white">
                  <Medal className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={labelVariants}
              className="text-center mb-2 w-full px-1"
            >
              <div className="font-display font-medium text-xs sm:text-sm text-slate-200 truncate">
                {third.student_name}
              </div>
              <div className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-amber-600/15 border border-amber-600/30 text-amber-300 font-mono text-[10px] sm:text-xs font-bold">
                {third.totalScore} pont
              </div>
            </motion.div>

            {/* 3D Bronze Pedestal */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={podiumVariants}
              className="w-full flex flex-col items-center origin-bottom"
            >
              {/* 3D Top Platform Ellipse */}
              <div className="w-full h-5 sm:h-7 rounded-[50%] bg-gradient-to-r from-amber-700 via-orange-200 to-amber-800 border-t-2 border-orange-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_3px_8px_rgba(0,0,0,0.4)] -mb-2.5 sm:-mb-3.5 z-20 relative flex items-center justify-center">
                <div className="w-[84%] h-[68%] rounded-[50%] bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 border border-white/50 shadow-inner" />
              </div>

              {/* 3D Cylinder Front Pillar */}
              <div className="w-full h-18 sm:h-22 md:h-26 bg-gradient-to-r from-amber-900 via-amber-600 via-orange-400 via-amber-600 to-amber-950 rounded-b-2xl sm:rounded-b-3xl shadow-[0_10px_20px_rgba(180,83,9,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)] relative overflow-hidden flex flex-col items-center justify-start pt-2 border-x border-b border-amber-600/40">
                <div className="absolute inset-y-0 left-1/4 w-5 sm:w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <div className="relative font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter text-amber-950/80 drop-shadow-[0_2px_1px_rgba(255,255,255,0.5)] select-none">
                  3
                </div>
              </div>

              {/* Base Rim & Floor Shadow */}
              <div className="w-[88%] h-3 rounded-[50%] bg-amber-950/40 -mt-1.5 z-10" />
              <div className="w-[105%] h-3.5 sm:h-4 rounded-[50%] bg-black/60 blur-md -mt-2.5 z-0" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
