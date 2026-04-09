import type { Metadata } from 'next';
import { BASE_DESCRIPTION, BASE_URL } from '@/constants/important.constant';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/seo.constant';

const title = `${SITE_NAME} — Reusable Next.js Components (TypeScript + shadcn)`;
const description = BASE_DESCRIPTION

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
