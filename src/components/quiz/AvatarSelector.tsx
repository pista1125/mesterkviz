import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarData } from './Avatar';
import { Check } from 'lucide-react';

const CHARACTERS = ['🐻', '🐱', '🐶', '🦊', '🦁', '🐵', '🐼', '🐨', '🐯', '🐙', '🦖', '🦄'];
const ACCESSORIES = ['none', '🎩', '👑', '🎓', '👓', '🕶️', '🎄', '🎃', '🎀', '🎧', '🍦', '🥞', '🍕'];

interface AvatarSelectorProps {
    onSelect: (avatar: AvatarData) => void;
    initialAvatar?: AvatarData;
}

export const AvatarSelector = ({ onSelect, initialAvatar }: AvatarSelectorProps) => {
    const [avatar, setAvatar] = useState<AvatarData>(initialAvatar || { character: '🐻', accessory: 'none' });

    const handleCharSelect = (char: string) => {
        const newAvatar = { ...avatar, character: char };
        setAvatar(newAvatar);
    };

    const handleAccSelect = (acc: string) => {
        const newAvatar = { ...avatar, accessory: acc };
        setAvatar(newAvatar);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4">
                <Avatar avatar={avatar} size="lg" className="ring-4 ring-primary/20 ring-offset-4" />
                <p className="mt-4 text-sm text-muted-foreground font-medium">Ez lesz az avatárod a játékban!</p>
            </div>

            <Tabs defaultValue="character" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="character">Karakter</TabsTrigger>
                    <TabsTrigger value="accessory">Kiegészítő</TabsTrigger>
                </TabsList>

                <TabsContent value="character" className="mt-4">
                    <div className="grid grid-cols-4 gap-2">
                        {CHARACTERS.map((char) => (
                            <Button
                                key={char}
                                variant={avatar.character === char ? "default" : "outline"}
                                className="h-14 text-2xl relative"
                                onClick={() => handleCharSelect(char)}
                            >
                                {char}
                                {avatar.character === char && (
                                    <Check className="absolute top-1 right-1 h-3 w-3 text-primary-foreground" />
                                )}
                            </Button>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="accessory" className="mt-4">
                    <div className="grid grid-cols-4 gap-2">
                        {ACCESSORIES.map((acc) => (
                            <Button
                                key={acc}
                                variant={avatar.accessory === acc ? "default" : "outline"}
                                className="h-14 text-2xl relative"
                                onClick={() => handleAccSelect(acc)}
                            >
                                {acc === 'none' ? '❌' : acc}
                                {avatar.accessory === acc && (
                                    <Check className="absolute top-1 right-1 h-3 w-3 text-primary-foreground" />
                                )}
                            </Button>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <Button className="w-full mt-2" size="lg" onClick={() => onSelect(avatar)}>
                Kész!
            </Button>
        </div>
    );
};
