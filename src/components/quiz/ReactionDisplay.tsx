import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToReactions } from '@/services/db';

interface Reaction {
    id: string;
    emoji: string;
    x: number;
}

interface ReactionDisplayProps {
    roomId: string;
}

export const ReactionDisplay = ({ roomId }: ReactionDisplayProps) => {
    const [reactions, setReactions] = useState<Reaction[]>([]);

    useEffect(() => {
        const unsubscribe = subscribeToReactions(roomId, (payload) => {
            const newReaction = {
                id: payload.id || Math.random().toString(36).substr(2, 9),
                emoji: payload.emoji,
                x: Math.random() * 80 + 10, // 10% to 90% of width
            };

            setReactions((prev) => [...prev, newReaction]);

            // Remove reaction after animation
            setTimeout(() => {
                setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
            }, 4000);
        });

        return () => {
            unsubscribe();
        };
    }, [roomId]);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {reactions.map((reaction) => (
                    <motion.div
                        key={reaction.id}
                        initial={{ y: '100vh', opacity: 0, x: `${reaction.x}vw`, scale: 0.5 }}
                        animate={{
                            y: '-10vh',
                            opacity: [0, 1, 1, 0],
                            x: `${reaction.x + (Math.random() * 10 - 5)}vw`,
                            scale: [0.5, 1.5, 1.5, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 4, ease: 'easeOut' }}
                        className="absolute text-5xl md:text-7xl"
                    >
                        {reaction.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
