export type FormReadyToUseCode = {
  name: string;
  description: string;
  filePath: string;
  code: string;
  usageCode: string;
};

export const FORM_READY_TO_USE_CODES: readonly FormReadyToUseCode[] = [
  {
    name: 'FormTextField',
    description: 'Text input field — รับ control, name, label, placeholder, type',
    filePath: 'src/components/forms/form-text-field.tsx',
    code: `'use client';

import type { FieldPath, FieldValues, Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
};

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
}: FormTextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}`,
    usageCode: `<FormTextField
  control={form.control}
  name="email"
  label="Email"
  placeholder="you@example.com"
  type="email"
/>`,
  },
  {
    name: 'FormSelect',
    description: 'Select dropdown — รับ control, name, label, placeholder, options',
    filePath: 'src/components/forms/form-select.tsx',
    code: `'use client';

import type { FieldPath, FieldValues, Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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

type FormSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  options: readonly Option[];
};

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select an option',
  options,
}: FormSelectProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}`,
    usageCode: `const ROLE_OPTIONS = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
] as const;

<FormSelect
  control={form.control}
  name="role"
  label="Role"
  placeholder="Select role"
  options={ROLE_OPTIONS}
/>`,
  },
  {
    name: 'FormRadioGroup',
    description: 'Radio group — รับ control, name, label, options',
    filePath: 'src/components/forms/form-radio-group.tsx',
    code: `'use client';

import type { FieldPath, FieldValues, Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Option = {
  value: string;
  label: string;
};

type FormRadioGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: readonly Option[];
  className?: string;
};

export function FormRadioGroup<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  className = 'flex gap-4',
}: FormRadioGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className={className}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center gap-2"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="mt-0!">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}`,
    usageCode: `const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

<FormRadioGroup
  control={form.control}
  name="gender"
  label="Gender"
  options={GENDER_OPTIONS}
/>`,
  },
  {
    name: 'FormCheckboxGroup',
    description: 'Checkbox group — รับ control, name, label, options, columns',
    filePath: 'src/components/forms/form-checkbox-group.tsx',
    code: `'use client';

import type { FieldPath, FieldValues, Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

type Option = {
  value: string;
  label: string;
};

type FormCheckboxGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  options: readonly Option[];
  columns?: number;
};

export function FormCheckboxGroup<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  columns = 2,
}: FormCheckboxGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className={\`grid grid-cols-\${columns} gap-2\`}>
            {options.map((option) => (
              <FormField
                key={option.value}
                control={control}
                name={name}
                render={({ field }) => {
                  const values = (field.value as string[]) ?? [];
                  return (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={values.includes(option.value)}
                          onCheckedChange={(checked) => {
                            field.onChange(
                              checked
                                ? [...values, option.value]
                                : values.filter((v) => v !== option.value),
                            );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="mt-0!">{option.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
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

<FormCheckboxGroup
  control={form.control}
  name="skills"
  label="Skills"
  options={SKILL_OPTIONS}
  columns={2}
/>`,
  },
  {
    name: 'ImageDropzone',
    description: 'Drag & drop image upload — preview, validate type/size, remove',
    filePath: 'src/components/forms/image-dropzone.tsx',
    code: `// ดูโค้ดเต็มที่ src/components/forms/image-dropzone.tsx
// ใช้ร่วมกับ schema จาก src/lib/schemas/upload-form.schema.ts

type ImageDropzoneProps = {
  value: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;   // default: false
  maxFiles?: number;    // default: 1
  disabled?: boolean;   // default: false
};`,
    usageCode: `// ใน form component ใช้กับ Controller
<FormField
  control={form.control}
  name="images"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Images</FormLabel>
      <FormControl>
        <ImageDropzone
          value={field.value}
          onChange={field.onChange}
          multiple
          maxFiles={4}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`,
  },
] as const;
