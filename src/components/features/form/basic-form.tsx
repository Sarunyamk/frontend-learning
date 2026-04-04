'use client';

import { FormTextField } from '@/components/shared/forms/form-text-field';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  basicFormSchema,
  type BasicFormInput,
} from '@/lib/schemas/basic-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function BasicForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<BasicFormInput>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode:'all'
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
          name="name"
          label="Name"
          placeholder="John Doe"
          description="Your full name"
        />

        <FormTextField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          description="We'll never share your email"
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
