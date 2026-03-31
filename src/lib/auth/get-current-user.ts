import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/route.constant';
import { auth } from './auth';

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user || session.error === 'RefreshTokenError') {
    redirect(ROUTES.NEXT_AUTH_LOGIN);
  }

  return session.user;
}
