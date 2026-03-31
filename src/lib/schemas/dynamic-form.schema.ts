import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email format'),
  role: z.enum(['developer', 'designer', 'manager', 'qa'], {
    message: 'Please select a role',
  }),
});

export const dynamicFormSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  members: z
    .array(memberSchema)
    .min(1, 'At least one member is required')
    .max(5, 'Maximum 5 members allowed'),
});

export type MemberInput = z.infer<typeof memberSchema>;
export type DynamicFormInput = z.infer<typeof dynamicFormSchema>;
