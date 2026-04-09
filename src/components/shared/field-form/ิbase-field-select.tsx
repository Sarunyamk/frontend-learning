'use client';

import {
  Field,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = {
  value: string;
  label: string;
};

type BaseSelectProps = {
  label: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options: readonly Option[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export function BaseFieldSelect({
  label,
  placeholder = 'Select an option',
  description,
  error,
  required,
  disabled,
  options,
  value,
  onValueChange,
}: BaseSelectProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel>
        {label} {required && '*'}
      </FieldLabel>

      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full" aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
