import {
  addressSchema,
  MultiStepFormInput,
  personalInfoSchema,
  preferencesSchema,
} from '@/lib/schemas/multi-step-form.schema';

export const STEPS = [
  { title: 'Personal Info', schema: personalInfoSchema },
  { title: 'Address', schema: addressSchema },
  { title: 'Preferences', schema: preferencesSchema },
] as const;

export const STEP_FIELDS: Record<number, (keyof MultiStepFormInput)[]> = {
  0: ['firstName', 'lastName', 'email'],
  1: ['address', 'city', 'zipCode'],
  2: ['role', 'gender', 'activities'],
};

export const ROLE_OPTIONS = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'other', label: 'Other' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
] as const;

export const ACTIVITY_OPTIONS = [
  { value: 'reading', label: 'Reading' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'traveling', label: 'Traveling' },
] as const;
