'use client';

import { FormTextField } from '@/components/shared/forms/form-text-field';
import { ImageDropzone } from '@/components/shared/forms/image-dropzone';
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
  multiUploadSchema,
  type MultiUploadInput,
} from '@/lib/schemas/upload-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

const MAX_IMAGES = 4;

export function MultiUploadForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<MultiUploadInput>({
    resolver: zodResolver(multiUploadSchema),
    defaultValues: {
      albumName: '',
      images: [],
    },
    mode: 'all',
  });

  function onSubmit(data: MultiUploadInput) {
    startTransition(async () => {
      // สร้าง FormData สำหรับส่งหลายไฟล์ไป backend
      const formData = new FormData();
      formData.append('albumName', data.albumName);
      // append หลายไฟล์ด้วย key เดียวกัน — backend รับเป็น array
      data.images.forEach((file) => formData.append('images', file));

      //? TODO: เปลี่ยนเป็น API จริง
      // แบบ Route Handler:
      //   await fetch('/api/upload/album', { method: 'POST', body: formData });
      // แบบ Server Action:
      //   await uploadAlbum(formData);

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
          name="albumName"
          label="Album Name"
          placeholder="Summer vacation"
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Images ({(field.value as File[]).length}/{MAX_IMAGES})
              </FormLabel>
              <FormControl>
                <ImageDropzone
                  value={field.value as File[]}
                  onChange={field.onChange}
                  multiple
                  maxFiles={MAX_IMAGES}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Uploading...' : 'Upload Album'}
        </Button>
      </form>
    </Form>
  );
}
