'use client';

import { FormSelect } from '@/components/forms/form-select';
import { FormTextField } from '@/components/forms/form-text-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MEMBER_ROLE_OPTIONS } from '@/constants/form.constant';
import {
  dynamicFormSchema,
  type DynamicFormInput,
} from '@/lib/schemas/dynamic-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const EMPTY_MEMBER = { name: '', email: '', role: '' as DynamicFormInput['members'][number]['role'] };
const MAX_MEMBERS = 5;

export function DynamicForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DynamicFormInput>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      teamName: '',
      members: [EMPTY_MEMBER],
    },
    mode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  function onSubmit() {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormTextField
          control={form.control}
          name="teamName"
          label="Team Name"
          placeholder="Frontend Team"
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Members ({fields.length}/{MAX_MEMBERS})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(EMPTY_MEMBER)}
              disabled={fields.length >= MAX_MEMBERS}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Member
            </Button>
          </div>

          {form.formState.errors.members?.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.members.root.message}
            </p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Member {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <FormTextField
                control={form.control}
                name={`members.${index}.name`}
                label="Name"
                placeholder="John Doe"
              />

              <FormTextField
                control={form.control}
                name={`members.${index}.email`}
                type="email"
                label="Email"
                placeholder="john@example.com"
              />

              <FormSelect
                control={form.control}
                name={`members.${index}.role`}
                label="Role"
                placeholder="Select a role"
                options={MEMBER_ROLE_OPTIONS}
              />
            </div>
          ))}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Create Team'}
        </Button>
      </form>
    </Form>
  );
}
