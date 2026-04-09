'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldRadioGroup } from '../base-field-radio-group';

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
  className?: string;
};

export function FieldFormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
  description,
  required,
  className,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <BaseFieldRadioGroup
          label={label}
          options={options}
          description={description}
          required={required}
          className={className}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
