import { LoginForm } from '@/components/features/next-auth/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — NextAuth Demo',
  description: 'Login page for NextAuth Deep Dive demo',
};

export default async function LoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoginForm />
    </div>
  );
}
