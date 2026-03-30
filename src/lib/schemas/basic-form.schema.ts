import { z } from 'zod';

export const basicFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type BasicFormInput = z.infer<typeof basicFormSchema>;
