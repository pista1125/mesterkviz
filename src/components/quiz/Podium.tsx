import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { Avatar } from './Avatar';
import type { AvatarData, RoomParticipant } from '@/types/quiz';

interface Winner extends RoomParticipant {
    totalScore: number;
}

interface PodiumProps {
    winners: Winner[];
}

export const Podium = ({ winners }: PodiumProps) => {
    // We need at least 1 winner to show anything, but we handle up to 3
    const first = winners[0];
    const second = winners[1];
    const third = winners[2];

    const podiumVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 1.5, // Sequence: 3rd, 2nd, 1st
                duration: 0.8,
                ease: "easeOut" as const
            }
        })
    };

    const avatarVariants = {
        hidden: { scale: 0, rotate: -10 },
        visible: (i: number) => ({
            scale: 1,
            rotate: 0,
            transition: {
                delay: i * 1.5 + 0.4,
                type: "spring" as const,
                stiffness: 260,
                damping: 20
            }
        })
    };

    const labelVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: (i: number) => ({
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                delay: i * 1.5 + 0.8,
                duration: 0.5
            }
        })
    };

    return (
        <div className="flex flex-col items-center justify-end h-[450px] w-full max-w-4xl mx-auto px-4 overflow-hidden">
            <div className="flex items-end justify-center gap-2 sm:gap-6 w-full h-full pb-8">
                {/* 2nd Place */}
                {second && (
                    <div className="flex flex-col items-center order-1 w-1/3 max-w-[180px]">
                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={avatarVariants}
                            className="mb-4 relative"
                        >
                            <Avatar avatar={second.avatar as AvatarData} size="lg" className="border-4 border-slate-300 shadow-xl" />
                            <div className="absolute -top-3 -right-3 bg-slate-300 text-slate-800 rounded-full p-2 shadow-lg border-2 border-white">
                                <Medal className="h-5 w-5" />
                            </div>
                        </motion.div>
                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={labelVariants}
                            className="text-center mb-2"
                        >
                            <div className="font-display font-bold text-lg truncate whitespace-nowrap">{second.student_name}</div>
                            <div className="text-muted-foreground font-mono text-sm">{second.totalScore} pont</div>
                        </motion.div>
                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={podiumVariants}
                            className="w-full h-32 bg-gradient-to-b from-slate-300 to-slate-500 rounded-t-2xl shadow-2xl flex flex-col items-center justify-start pt-4"
                        >
                            <span className="text-4xl font-black text-slate-700/50">2</span>
                        </motion.div>
                    </div>
                )}

                {/* 1st Place */}
                {first && (
                    <div className="flex flex-col items-center order-2 w-1/3 max-w-[220px] z-10">
                        <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={avatarVariants}
                            className="mb-4 relative"
                        >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce">
                                <Trophy className="h-12 w-12 fill-current" />
                            </div>
                            <Avatar avatar={first.avatar as AvatarData} size="xl" className="border-4 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]" />
                            <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 rounded-full p-2 shadow-lg border-2 border-white">
                                <Star className="h-6 w-6 fill-current" />
                            </div>
                        </motion.div>
                        <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={labelVariants}
                            className="text-center mb-2"
                        >
                            <div className="font-display font-black text-2xl text-primary drop-shadow-sm">{first.student_name}</div>
                            <div className="text-primary/80 font-mono font-bold">{first.totalScore} pont</div>
                        </motion.div>
                        <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={podiumVariants}
                            className="w-full h-48 bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-600 rounded-t-2xl shadow-[0_10px_40px_rgba(217,119,6,0.4)] flex flex-col items-center justify-start pt-4 relative"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 rounded-t-2xl"></div>
                            <span className="text-6xl font-black text-yellow-900/30">1</span>
                        </motion.div>
                    </div>
                )}

                {/* 3rd Place */}
                {third && (
                    <div className="flex flex-col items-center order-3 w-1/3 max-w-[150px]">
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={avatarVariants}
                            className="mb-4 relative"
                        >
                            <Avatar avatar={third.avatar as AvatarData} size="md" className="border-4 border-orange-400 shadow-xl" />
                            <div className="absolute -top-2 -right-2 bg-orange-400 text-orange-900 rounded-full p-1.5 shadow-lg border-2 border-white">
                                <Medal className="h-4 w-4" />
                            </div>
                        </motion.div>
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={labelVariants}
                            className="text-center mb-2"
                        >
                            <div className="font-display font-medium text-base truncate whitespace-nowrap">{third.student_name}</div>
                            <div className="text-muted-foreground font-mono text-xs">{third.totalScore} pont</div>
                        </motion.div>
                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={podiumVariants}
                            className="w-full h-24 bg-gradient-to-b from-orange-400 to-orange-700 rounded-t-2xl shadow-xl flex flex-col items-center justify-start pt-2"
                        >
                            <span className="text-3xl font-black text-orange-900/40">3</span>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Background sparkle effect for 1st place */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 2 }}
                className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"
            />
        </div>
    );
};
