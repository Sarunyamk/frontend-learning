import { redirect } from 'next/navigation';
import { auth } from './auth';


export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user || session.error === 'RefreshTokenError') {
    redirect('/admin/login');
  }

  return session.user;
}
