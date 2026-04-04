'use server';

import { ROUTES } from '@/constants/route.constant';
import { signIn } from '@/lib/auth/auth';
import type { LoginInput } from '@/lib/schemas/login.schema';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function loginAction(data: LoginInput) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    // signIn() throws redirect on success — re-throw it

    if (error instanceof AuthError) {
      return { success: false, error: 'Invalid email or password' };
    }
    throw error;
  }
  redirect(ROUTES.NEXT_AUTH);
}
