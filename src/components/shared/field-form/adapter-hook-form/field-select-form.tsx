'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldSelect } from '../ิbase-field-select';

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  options: readonly Option[];
  required?: boolean;
};

export function FieldFormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  options,
  required,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <BaseFieldSelect
          label={label}
          placeholder={placeholder}
          description={description}
          options={options}
          required={required}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
