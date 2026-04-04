import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/constants/route.constant';

/**
 * Next.js 16 Proxy (replaces middleware.ts)
 *
 * ใช้สำหรับ: redirect, rewrite, set headers
 * ห้าม: heavy logic, DB query, complex computation
 */

const PROTECTED_PATHS = [ROUTES.NEXT_AUTH_PROTECTED];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth guard — ตรวจ cookie เท่านั้น (lightweight, ไม่ call auth())
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    const token =
      request.cookies.get('authjs.session-token')?.value ??
      request.cookies.get('__Secure-authjs.session-token')?.value;

    if (!token) {
      const loginUrl = new URL(ROUTES.NEXT_AUTH_LOGIN, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match ทุก path ยกเว้น:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Static assets (svg, png, jpg, etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
