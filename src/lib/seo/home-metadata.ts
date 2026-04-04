import type { Metadata } from 'next';
import { BASE_URL } from '@/constants/important.constant';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/seo.constant';

const title = `${SITE_NAME} — Next.js 16 + TypeScript`;
const description =
  'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation สามารถนำไปใช้กับโปรเจกต์จริงได้ทันที';

export const homeMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: BASE_URL,
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};
