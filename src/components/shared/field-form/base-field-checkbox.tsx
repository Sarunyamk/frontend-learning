'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

type Option = {
  value: string;
  label: string;
};

type BaseFieldCheckboxGroupProps = {
  label: string;
  options: readonly Option[];
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  columns?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
};

export function BaseFieldCheckboxGroup({
  label,
  options,
  description,
  error,
  required,
  disabled,
  columns = 2,
  value = [],
  onChange,
}: BaseFieldCheckboxGroupProps) {
  const handleToggle = (checked: boolean, optionValue: string) => {
    if (!onChange) return;

    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>
        {label} {required && '*'}
      </FieldLabel>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={(checked) =>
                handleToggle(!!checked, option.value)
              }
              disabled={disabled}
              aria-invalid={!!error}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}

      {error && (
        <FieldDescription className="text-red-500">{error}</FieldDescription>
      )}
    </Field>
  );
}
