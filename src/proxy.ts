import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (replaces middleware.ts)
 *
 * ใช้สำหรับ: redirect, rewrite, set headers
 * ห้าม: heavy logic, DB query, complex computation
 *
 * เพิ่ม logic ตาม project:
 * - i18n redirect (locale detection)
 * - Auth guard (protected routes)
 * - CSP headers
 */
export function proxy(request: NextRequest) {
  // TODO: เพิ่ม logic ตาม project requirement
  // ตัวอย่าง: i18n redirect, auth guard, CSP headers

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
