import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarData {
    character: string;
    accessory: string;
}

interface AvatarProps {
    avatar: AvatarData | null;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'h-10 w-10 text-2xl',
    md: 'h-16 w-16 text-4xl',
    lg: 'h-24 w-24 text-6xl',
    xl: 'h-32 w-32 text-8xl',
};

export const Avatar = ({ avatar, className, size = 'md' }: AvatarProps) => {
    const char = avatar?.character || '🐻';
    const acc = avatar?.accessory || 'none';

    return (
        <div className={cn(
            "relative flex items-center justify-center rounded-2xl bg-muted/50 border-2 border-muted shadow-inner overflow-hidden",
            sizeClasses[size],
            className
        )}>
            <span className="select-none">{char}</span>
            {acc !== 'none' && (
                <span className={cn(
                    "absolute select-none pointer-events-none",
                    size === 'sm' ? "-top-1 text-base" :
                        size === 'md' ? "-top-2 text-2xl" :
                            size === 'lg' ? "-top-4 text-4xl" : "-top-6 text-6xl"
                )}>
                    {acc}
                </span>
            )}
        </div>
    );
};
