import { z } from 'zod';

/**
 * Client-side environment variables — ต้องขึ้นต้นด้วย NEXT_PUBLIC_
 * ใช้ได้ทั้ง Server และ Client Components
 *
 * สำคัญ: Next.js inline เฉพาะ process.env.NEXT_PUBLIC_XXX ทีละตัว
 * ห้ามใช้ process.env เป็น object ตรงๆ — ในเบราว์เซอร์จะเป็น {} ว่าง
 */
const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.url().min(1, 'NEXT_PUBLIC_BASE_URL is required'),
  NEXT_PUBLIC_SOCKET_URL: z.url().min(1, 'NEXT_PUBLIC_SOCKET_URL is required'),
  // NEXT_PUBLIC_GA_ID: z.string().optional().default(''),
  // NEXT_PUBLIC_BUILD_TIME: z.string().optional().default(''),
});

// ต้อง reference process.env.NEXT_PUBLIC_XXX ทีละตัว
// เพื่อให้ Next.js inline ค่าจริงตอน build
const result = clientSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
});

if (!result.success) {
  console.error(
    'Invalid client environment variables: \n',
    z.prettifyError(result.error)
  );
  // ใช้ throw แทน process.exit — เพราะ process.exit ไม่มีในเบราว์เซอร์
  throw new Error('Invalid client environment variables');
}

/** Client env — ใช้ได้ทั้ง Server และ Client */
export const clientEnv = result.data;
