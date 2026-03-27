import { z } from 'zod';

/**
 * Client-side environment variables — ต้องขึ้นต้นด้วย NEXT_PUBLIC_
 *  ใช้ได้ทั้ง Server และ Client Components
 */
const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.url().min(1, 'NEXT_PUBLIC_BASE_URL is required'),
  // NEXT_PUBLIC_GA_ID: z.string().optional().default(''),
  // NEXT_PUBLIC_BUILD_TIME: z.string().optional().default(''),
});

const result = clientSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    'Invalid client environment variables: \n',
    z.prettifyError(result.error)
  );
  process.exit(1);
}

/** Client env — ใช้ได้ทั้ง Server และ Client */
export const clientEnv = result.data;
