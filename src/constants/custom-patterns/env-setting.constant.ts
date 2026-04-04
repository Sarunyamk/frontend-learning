export type EnvSettingPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const ENV_SETTING_PATTERNS: readonly EnvSettingPattern[] = [
  {
    key: 'env-overview',
    title: 'Env Validation Overview',
    description:
      'ทำไมต้อง validate environment variables? — Zod safeParse + fail fast pattern',
    code: `// ปัญหาถ้าไม่ validate env:
// 1. Typo ใน env key → undefined → crash ตอน runtime (ไม่ใช่ build time)
// 2. ลืมใส่ env ใน production → app พังหลัง deploy
// 3. ไม่มี autocomplete → เดา key name

// ❌ WRONG — ใช้ process.env ตรงๆ
const apiUrl = process.env.API_URL; // string | undefined — ไม่มี type safety
fetch(apiUrl + '/data'); // อาจเป็น "undefined/data" 💥

// ✅ CORRECT — validate ด้วย Zod แล้ว export typed object
import { serverEnv } from '@/lib/env/env.server';
fetch(serverEnv.API_URL + '/data'); // ✅ typed string — ไม่มี undefined

// Flow:
// .env → Zod schema → safeParse → fail? exit(1) : export typed object
//
// ┌─────────┐    ┌─────────────┐    ┌───────────┐
// │  .env   │───>│ Zod schema  │───>│ safeParse  │
// └─────────┘    │ z.object({  │    └─────┬─────┘
//                │   API_URL,  │       ╱     ╲
//                │   SECRET,   │    fail     success
//                │ })          │     │         │
//                └─────────────┘     ▼         ▼
//                              exit(1)    export typed
//                              + log      object`,
  },
  {
    key: 'server-env',
    title: 'Server Env — server-only Guard',
    description:
      'validate server-side env ด้วย Zod + ป้องกัน import ใน Client ด้วย server-only',
    code: `// lib/env/env.server.ts
import 'server-only';
// ^ ถ้า Client Component import ไฟล์นี้ → build error ทันที
// ป้องกัน leak secret ไป client bundle

import { z } from 'zod';

const serverSchema = z.object({
  API_URL: z.url().min(1, 'API URL is required'),
  AUTH_SECRET: z.string().min(10, 'AUTH_SECRET ต้องมีอย่างน้อย 10 ตัวอักษร'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// safeParse ไม่ throw — return { success, data?, error? }
const result = serverSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    'Invalid server environment variables:\\n',
    z.prettifyError(result.error)
    // ^ อ่านง่ายกว่า result.error.format()
  );
  // fail fast ตอน startup — ไม่ใช่ตอน user เข้าหน้า
  process.exit(1);
}

/** Server env — ห้ามใช้ใน Client Components */
export const serverEnv = result.data;
// serverEnv.API_URL    → string (guaranteed)
// serverEnv.AUTH_SECRET → string (guaranteed)
// serverEnv.NODE_ENV   → 'development' | 'production' | 'test'`,
  },
  {
    key: 'client-env',
    title: 'Client Env — NEXT_PUBLIC Gotcha',
    description:
      'validate client-side env + gotcha สำคัญ: ต้อง reference process.env.NEXT_PUBLIC_XXX ทีละตัว',
    code: `// lib/env/env.client.ts
import { z } from 'zod';

const clientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.url().min(1, 'NEXT_PUBLIC_BASE_URL is required'),
  NEXT_PUBLIC_SOCKET_URL: z.url().min(1, 'NEXT_PUBLIC_SOCKET_URL is required'),
});

// ⚠️ GOTCHA สำคัญมาก:
// Next.js จะ inline ค่า NEXT_PUBLIC_* ตอน build
// แต่ทำได้เฉพาะเมื่อเขียน process.env.NEXT_PUBLIC_XXX ตรงๆ

// ❌ WRONG — browser ได้ {} ว่างเปล่า
const result = clientSchema.safeParse(process.env);
// Next.js ไม่ inline ทั้ง object — ใน browser process.env = {}

// ✅ CORRECT — reference ทีละตัว ให้ Next.js inline ค่าจริง
const result = clientSchema.safeParse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
});

if (!result.success) {
  console.error(
    'Invalid client environment variables:\\n',
    z.prettifyError(result.error)
  );
  // ใช้ throw แทน process.exit — เพราะ browser ไม่มี process.exit
  throw new Error('Invalid client environment variables');
}

/** Client env — ใช้ได้ทั้ง Server และ Client */
export const clientEnv = result.data;`,
  },
  {
    key: 'dotenv-structure',
    title: '.env File Structure',
    description:
      '.env / .env.local / .env.example — ใครทำอะไร, priority, gitignore',
    code: `// ─── File Structure ──────────────────────────────────────
// project-root/
// ├── .env                 ← default ทุก environment (commit ได้)
// ├── .env.local           ← secret/override — gitignore (ห้าม commit!)
// ├── .env.development     ← override เฉพาะ dev
// ├── .env.production      ← override เฉพาะ production
// └── .env.example         ← template สำหรับ team (commit ได้)

// ─── Priority (สูง → ต่ำ) ────────────────────────────────
// 1. .env.local           ← สูงสุด (override ทุกอย่าง)
// 2. .env.[environment]   ← .env.development / .env.production
// 3. .env                 ← ต่ำสุด (default fallback)
// * ค่าใน .env.local จะ override ค่าเดียวกันใน .env

// ─── .env ─────────────────────────────────────────────────
// ค่า default ที่ทุกคน/ทุก environment ใช้ร่วมกัน
API_URL=http://localhost:3001
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3001

// ─── .env.local (gitignore!) ──────────────────────────────
// secret + ค่าที่แต่ละคนต่างกัน
AUTH_SECRET=my-super-secret-key-at-least-10-chars
# override ค่าจาก .env ได้:
# API_URL=https://staging-api.example.com

// ─── .env.example (commit ได้) ────────────────────────────
// template ให้คนอื่นรู้ว่าต้องมี env อะไรบ้าง
API_URL=
AUTH_SECRET=
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SOCKET_URL=

// ─── .gitignore ───────────────────────────────────────────
// .env.local       ← ห้าม commit!
// .env*.local      ← ครอบทุก .env.xxx.local`,
  },
  {
    key: 'type-safe-usage',
    title: 'Type-safe Usage',
    description:
      'วิธีเรียกใช้ serverEnv / clientEnv ใน Server Component, Client Component, Server Action',
    code: `// ─── 1. Server Component ──────────────────────────────────
// app/features/page.tsx (Server)
import { serverEnv } from '@/lib/env/env.server';

export default async function FeaturesPage() {
  // ✅ ใช้ serverEnv ได้ — เป็น Server Component
  const res = await fetch(serverEnv.API_URL + '/api/features');
  const data = await res.json();
  return <div>{/* render data */}</div>;
}

// ─── 2. Client Component ──────────────────────────────────
// components/socket-status.tsx
'use client';
import { clientEnv } from '@/lib/env/env.client';

export function SocketStatus() {
  useEffect(() => {
    // ✅ ใช้ clientEnv ได้ — เป็น NEXT_PUBLIC_ variable
    const ws = new WebSocket(clientEnv.NEXT_PUBLIC_SOCKET_URL);
    return () => ws.close();
  }, []);
  return <span>Connected</span>;
}

// ─── 3. Server Action ─────────────────────────────────────
// app/actions/auth.ts
'use server';
import { serverEnv } from '@/lib/env/env.server';

export async function loginAction(data: LoginInput) {
  // ✅ Server Action รันฝั่ง server — ใช้ serverEnv ได้
  const res = await fetch(serverEnv.API_URL + '/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}

// ─── ❌ ห้ามทำ ──────────────────────────────────────────────
// Client Component + serverEnv → build error!
'use client';
import { serverEnv } from '@/lib/env/env.server';
// ^ Error: "server-only" module imported in Client Component

// ใช้ process.env ตรงๆ → ไม่มี type safety
process.env.API_URL  // string | undefined — อาจ undefined!
process.env.APIURL   // typo — ไม่มี error!`,
  },
];
