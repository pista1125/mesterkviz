import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ThumbsUp, Smile, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendRoomReaction } from '@/services/db';

const REACTIONS = [
    { emoji: '❤️', icon: Heart, color: 'text-red-500' },
    { emoji: '👍', icon: ThumbsUp, color: 'text-blue-500' },
    { emoji: '😄', icon: Smile, color: 'text-yellow-500' },
    { emoji: '⭐', icon: Star, color: 'text-amber-500' },
    { emoji: '🔥', icon: Zap, color: 'text-orange-500' },
];

interface ReactionButtonProps {
    roomId: string;
    className?: string;
}

export const ReactionButton = ({ roomId, className }: ReactionButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const sendReaction = async (emoji: string) => {
        try {
            await sendRoomReaction(roomId, emoji);
        } catch (e) {
            console.error('Error sending reaction:', e);
        }
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-2 rounded-full bg-card p-2 shadow-xl border"
                    >
                        {REACTIONS.map((reac) => (
                            <Button
                                key={reac.emoji}
                                variant="ghost"
                                size="icon"
                                className={cn("h-12 w-12 rounded-full text-2xl hover:bg-muted", reac.color)}
                                onClick={() => sendReaction(reac.emoji)}
                            >
                                <reac.icon className="h-6 w-6" />
                            </Button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                    "h-16 w-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white/50 backdrop-blur-sm transition-all flex items-center justify-center",
                    isOpen
                        ? "bg-primary text-primary-foreground rotate-180"
                        : "bg-gradient-to-br from-primary via-primary/90 to-accent text-white"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Smile className={cn("h-8 w-8 transition-transform", isOpen && "scale-90")} />
            </motion.button>
        </div>
    );
};
