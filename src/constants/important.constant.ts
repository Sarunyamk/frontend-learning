import { clientEnv } from "@/lib/env/env.client";

export const BASE_URL = clientEnv.NEXT_PUBLIC_BASE_URL;
export const LOGO_URL = `${BASE_URL}/logo.png`;
// export const GA_ID = clientEnv.NEXT_PUBLIC_GA_ID;

export const BASE_DESCRIPTION = 'รวม Reusable Components สำหรับ Next.js + TypeScript + shadcn/uiพร้อมใช้งานจริง (Auth, Payment, Real-time, Animation) — Copy ไปใช้ได้ทันทีในโปรเจกต์'
