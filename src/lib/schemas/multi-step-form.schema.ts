import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Invalid email format'),
});

export const addressSchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
});

export const preferencesSchema = z.object({
  role: z.enum(['developer', 'designer', 'manager', 'other'], {
    message: 'Please select a role',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender',
  }),
  activities: z
    .array(z.enum(['reading', 'gaming', 'cooking', 'traveling']))
    .min(1, 'Please select at least one activity'),
});

export const multiStepFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...addressSchema.shape,
  ...preferencesSchema.shape,
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
export type MultiStepFormInput = z.infer<typeof multiStepFormSchema>;
