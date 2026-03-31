import type { Metadata } from 'next';
import { BASE_URL } from '@/constants/important.constant';

export const homeMetadata: Metadata = {
  title: 'Learning Fullstack — Next.js 16 + TypeScript',
  description:
    'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation',
  openGraph: {
    title: 'Learning Fullstack — Next.js 16 + TypeScript',
    description:
      'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง',
    url: BASE_URL,
    type: 'website',
  },
};
