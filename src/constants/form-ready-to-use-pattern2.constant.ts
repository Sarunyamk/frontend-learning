import { CodeSection } from '@/types/share-code-section.type';
import { FormReadyToUseCode } from './form-ready-to-use-pattern1.constant';

export const FORM_READY_TO_USE_CODES_PATTERN2: readonly FormReadyToUseCode[] = [
  {
    name: 'BaseTextField + BaseFormTextField (Adapter Pattern)',
    description:
      'Text input field แบบแยก UI และ form logic — รองรับ reuse และ scale ได้',
    filePath: 'src/components/forms/base-form-text-field.tsx',
    code: `'use client';

// ==========================
// BaseTextField (UI Layer)
// ==========================
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

// ==========================
// BaseFormTextField (Adapter)
// ==========================
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
  type = 'text',
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
}`,
    usageCode: `<BaseFormTextField
  control={form.control}
  name="email"
  label="Email"
  placeholder="you@example.com"
  type="email"
/>`,
  },
  {
    name: 'BaseFieldSelect + FieldFormSelect (Adapter Pattern)',
    description:
      'Select dropdown แบบแยก UI และ form logic — รองรับ reuse และ scale ได้',
    filePath: 'src/components/forms/field-form-select.tsx',
    code: `'use client';

// ==========================
// BaseFieldSelect (UI Layer)
// ==========================
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

// ==========================
// FieldFormSelect (Adapter)
// ==========================
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldSelect } from '../base-field-select';

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
}`,
    usageCode: `const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
] as const;

<FieldFormSelect
  control={form.control}
  name="role"
  label="Role"
  placeholder="Select role"
  options={ROLE_OPTIONS}
/>`,
  },
  {
    name: 'BaseFieldRadioGroup + FieldFormRadioGroup (Adapter Pattern)',
    description:
      'Radio group แบบแยก UI และ form logic — รองรับ reuse และ scale ได้',
    filePath: 'src/components/forms/field-form-radio-group.tsx',
    code: `'use client';

// ==========================
// BaseFieldRadioGroup (UI Layer)
// ==========================
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
        <FieldDescription className="text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}

// ==========================
// FieldFormRadioGroup (Adapter)
// ==========================
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldRadioGroup } from '../base-field-radio-group';

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
}`,
    usageCode: `const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

<FieldFormRadioGroup
  control={form.control}
  name="gender"
  label="Gender"
  options={GENDER_OPTIONS}
/>`,
  },
  {
    name: 'BaseFieldCheckboxGroup + FieldFormCheckboxGroup (Adapter Pattern)',
    description:
      'Checkbox group แบบแยก UI และ form logic — รองรับ multi-select และ dynamic columns',
    filePath: 'src/components/forms/field-form-checkbox-group.tsx',
    code: `'use client';

// ==========================
// BaseFieldCheckboxGroup (UI Layer)
// ==========================
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
          gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\`,
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
        <FieldDescription className="text-red-500">
          {error}
        </FieldDescription>
      )}
    </Field>
  );
}

// ==========================
// FieldFormCheckboxGroup (Adapter)
// ==========================
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BaseFieldCheckboxGroup } from '../base-field-checkbox';

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
}`,
    usageCode: `const SKILL_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
] as const;

<FieldFormCheckboxGroup
  control={form.control}
  name="skills"
  label="Skills"
  options={SKILL_OPTIONS}
  columns={2}
/>`,
  },
] as const;

export const FORM_INSTALL_SECTIONS_PATTERN2: readonly CodeSection[] = [
  {
    title: '1. Install shadcn/ui',
    description: 'ติดตั้ง library สำหรับ component',
    language: 'bash',
    code: `pnpm dlx shadcn@latest add input field select radio-group checkbox`,
  },
  {
    title: '2. Install Zod',
    description: 'ติดตั้ง library สำหรับ validation',
    language: 'bash',
    code: `pnpm add zod`,
  },
  {
    title: '3. Install React Hook Form',
    description: 'ติดตั้ง library สำหรับ form handling',
    language: 'bash',
    code: `pnpm add react-hook-form @hookform/resolvers`,
  },
  {
    title: '4. ตัวอย่างการใช้งาน',
    description: 'ตัวอย่างการใช้งาน React Hook Form + Zod validation',
    language: 'tsx',
    code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { BaseFormTextField } from '@/components/forms/base-form-text-field';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormInput = z.infer<typeof schema>;

export default function ExampleForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  function onSubmit(data: FormInput) {
    startTransition(async () => {
      // 👉 call API หรือ server action
      // await login(data);

      form.reset();
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BaseFormTextField
        control={form.control}
        name="email"
        type="email"
        label="Email"
        placeholder="john@example.com"
      />

      <BaseFormTextField
        control={form.control}
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}`,
  },
];
