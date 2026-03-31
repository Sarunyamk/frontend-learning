'use client';

import { FormTextField } from '@/components/forms/form-text-field';
import { ImageDropzone } from '@/components/forms/image-dropzone';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  singleUploadSchema,
  type SingleUploadInput,
} from '@/lib/schemas/upload-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export function SingleUploadForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SingleUploadInput>({
    resolver: zodResolver(singleUploadSchema),
    defaultValues: {
      title: '',
      image: undefined,
    },
    mode: 'all',
  });

  function onSubmit(data: SingleUploadInput) {
    startTransition(async () => {
      // สร้าง FormData สำหรับส่งไฟล์ไป backend
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image);

      //? TODO: เปลี่ยนเป็น API จริง
      // แบบ Route Handler:
      //   await fetch('/api/upload', { method: 'POST', body: formData });
      // แบบ Server Action:
      //   await uploadImage(formData);

      // simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormTextField
          control={form.control}
          name="title"
          label="Title"
          placeholder="My photo"
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageDropzone
                  value={field.value ? [field.value] : []}
                  onChange={(files) => field.onChange(files[0] ?? undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Form>
  );
}
