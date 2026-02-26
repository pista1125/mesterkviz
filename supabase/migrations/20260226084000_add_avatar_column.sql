-- Add avatar column to room_participants to store character and accessory info
ALTER TABLE public.room_participants ADD COLUMN avatar JSONB DEFAULT '{"character": "🐻", "accessory": "none"}'::jsonb;
