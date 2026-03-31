import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const imageFileSchema = z
  .instanceof(File, { message: 'Please select an image' })
  .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
    message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: 'Only .jpg, .png, and .webp formats are supported',
  });

export const singleUploadSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  image: imageFileSchema,
});

export const multiUploadSchema = z.object({
  albumName: z.string().min(2, 'Album name must be at least 2 characters'),
  images: z
    .array(imageFileSchema)
    .min(1, 'At least one image is required')
    .max(4, 'Maximum 4 images allowed'),
});

export type SingleUploadInput = z.infer<typeof singleUploadSchema>;
export type MultiUploadInput = z.infer<typeof multiUploadSchema>;

export { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES };
