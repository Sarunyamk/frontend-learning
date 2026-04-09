'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldCheckboxGroup } from '../base-field-checkbox';

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: readonly Option[];
  description?: string;
  required?: boolean;
  columns?: number;
};

export function FieldFormCheckboxGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  description,
  required,
  columns,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <BaseFieldCheckboxGroup
          label={label}
          options={options}
          description={description}
          required={required}
          columns={columns}
          value={(field.value as string[]) ?? []}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
