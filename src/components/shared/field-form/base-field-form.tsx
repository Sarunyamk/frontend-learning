// BaseTextField.tsx
'use client';

import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';

type BaseTextFieldProps = {
  label: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function BaseTextField({
  label,
  placeholder,
  description,
  error,
  required,
  disabled,
  ...props
}: BaseTextFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel>
        {label} {required && '*'}
      </FieldLabel>

      <Input

        placeholder={placeholder}
        aria-invalid={!!error}
        disabled={disabled}
        {...props}
      />

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && (
        <FieldDescription className="text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}
