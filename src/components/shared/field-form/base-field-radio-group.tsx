'use client';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

type BaseFieldRadioGroupProps = {
  label: string;
  options: readonly Option[];
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function BaseFieldRadioGroup({
  label,
  options,
  description,
  error,
  required,
  disabled,
  className,
  value,
  onValueChange,
}: BaseFieldRadioGroupProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel>
        {label} {required && '*'}
      </FieldLabel>

      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn('flex gap-4', className)}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RadioGroupItem value={option.value} aria-invalid={!!error} />
            <span>{option.label}</span>
          </label>
        ))}
      </RadioGroup>

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
