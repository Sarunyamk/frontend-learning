import { z } from 'zod';

export const quizCreateSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required').trim(),
});

export type QuizCreateInput = z.infer<typeof quizCreateSchema>;

export const quizJoinSchema = z.object({
  code: z.string().min(1, 'Room code is required').trim().toUpperCase(),
  nickname: z.string().min(1, 'Nickname is required').trim(),
});

export type QuizJoinInput = z.infer<typeof quizJoinSchema>;
