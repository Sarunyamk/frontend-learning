import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth/auth';
import { AuthDemoHeader } from '@/components/features/next-auth/auth-demo-header';

export default async function NextAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      {children}
      <AuthDemoHeader session={session} />
    </SessionProvider>
  );
}
