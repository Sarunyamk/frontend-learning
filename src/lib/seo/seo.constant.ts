import { BASE_URL } from '@/constants/important.constant';
import type { Metadata } from 'next';

export const SITE_NAME = 'My Learning Next.js';

export const DEFAULT_OG_IMAGE = {
  url: `${BASE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
  type: 'image/png',
};

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — Next.js 16 + TypeScript`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง ตั้งแต่ Payment, Auth, Real-time ไปจนถึง Animation สามารถนำไปใช้กับโปรเจกต์จริงได้ทันที',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Next.js 16 + TypeScript`,
    description:
      'เรียนรู้ Next.js 16 + TypeScript แบบ best practice ผ่านตัวอย่าง feature จริง สามารถนำไปใช้กับโปรเจกต์จริงได้ทันที',
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
