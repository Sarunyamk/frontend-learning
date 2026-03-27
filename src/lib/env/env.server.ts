import 'server-only';

import { z } from 'zod';

/**
 * Server-side environment variables — validated at startup.
 *  ห้ามใช้ใน Client Components (มี 'server-only' guard)
 */
const serverSchema = z.object({
  API_URL: z.url().min(1, 'API URL is required'),
  // AUTH_SECRET: z.string().min(10, 'AUTH_SECRET ต้องมีอย่างน้อย 10 ตัวอักษร'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const result = serverSchema.safeParse(process.env);
if (!result.success) {
  console.error(
    'Invalid server enviroment variables: \n',
    z.prettifyError(result.error)
  );
  process.exit(1);
}

/** Server env — ห้ามใช้ใน Client Components */
export const serverEnv = result.data;
