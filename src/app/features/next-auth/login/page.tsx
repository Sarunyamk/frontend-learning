import { LoginForm } from '@/components/features/next-auth/login-form';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/seo.constant';
import { BASE_URL } from '@/constants/important.constant';

const title = `Sign In — ${SITE_NAME}`;
const description = 'Login page for NextAuth Deep Dive demo';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/features/next-auth/login`,
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

export default async function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoginForm />
    </div>
  );
}
