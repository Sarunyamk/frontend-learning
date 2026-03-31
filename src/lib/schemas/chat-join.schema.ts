import { z } from 'zod';

export const chatJoinSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required').trim(),
  nickname: z.string().min(1, 'Nickname is required').trim(),
});

export type ChatJoinInput = z.infer<typeof chatJoinSchema>;
