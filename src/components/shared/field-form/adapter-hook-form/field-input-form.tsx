// FormTextField.tsx
'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseTextField } from '../base-field-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
};

export function BaseFormTextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type= 'text',
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <BaseTextField
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          description={description}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
