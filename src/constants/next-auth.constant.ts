import { CodeSection } from '@/types/share-code-section.type';
import type { UserRole } from './role.constant';

// ===== Mock Users =====

export type MockUser = {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: UserRole;
};

export const MOCK_USERS: readonly MockUser[] = [
  {
    id: '1',
    email: 'admin@test.com',
    password: 'admin1234',
    name: 'Admin User',
    role: 'ADMIN',
  },
  {
    id: '2',
    email: 'super@test.com',
    password: 'super1234',
    name: 'Super Admin',
    role: 'SUPER_ADMIN',
  },
] as const;

// ===== Tutorial Code Sections =====

// --- Auth Setup Page ---

export const AUTH_SETUP_SECTIONS: readonly CodeSection[] = [
  {
    title: '1. Install Auth.js v5',
    description: 'ติดตั้ง next-auth@beta สำหรับ Next.js App Router',
    language: 'bash',
    code: `pnpm add next-auth@beta`,
  },
  {
    title: '2. Environment Variables',
    description: 'ตั้งค่า AUTH_SECRET สำหรับ encrypt JWT — สร้างด้วย openssl',
    language: 'bash',
    code: `# .env
AUTH_SECRET="your-secret-key"  # openssl rand -base64 32
AUTH_URL="http://localhost:3000"`,
  },
  {
    title: '3. Auth Config (lib/auth/auth.ts)',
    description:
      'สร้าง auth config — Credentials provider + JWT strategy + callbacks',
    language: 'typescript',
    code: `import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // validate credentials กับ API / database
        const user = await authService.login(credentials);
        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken: user.accessToken,
        };
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },

  pages: {
    signIn: '/features/next-auth/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
});`,
  },
  {
    title: '4. Route Handler',
    description: 'สร้าง API route สำหรับ Auth.js — แค่ re-export handlers',
    language: 'typescript',
    code: `// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from '@/lib/auth/auth';`,
  },
  {
    title: '5. Type Extension',
    description: 'ขยาย type ของ Session, User, JWT ให้รองรับ custom fields',
    language: 'typescript',
    code: `// src/@types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@/constants/role.constant';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      accessToken: string;
    } & DefaultSession['user'];
    error?: string;
  }
  interface User extends DefaultUser {
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    error?: string;
  }
}`,
  },
  {
    title: '6. Server-side Session (auth())',
    description: 'ใช้ auth() ใน Server Component — ไม่ต้อง prop drill',
    language: 'typescript',
    code: `import { auth } from '@/lib/auth/auth';

// ใน Server Component / Server Action
const session = await auth();

if (!session?.user) {
  redirect('/features/next-auth/login');
}

// session.user.id, session.user.role, session.user.name`,
  },
  {
    title: '7. Client-side Session (useSession)',
    description:
      'ใช้ useSession() ใน Client Component — ต้องมี SessionProvider ครอบ',
    language: 'typescript',
    code: `// Layout: ครอบด้วย SessionProvider
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth/auth';

export default async function Layout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

// Client Component: ใช้ useSession
'use client';
import { useSession } from 'next-auth/react';

export function UserInfo() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <Skeleton />;
  if (!session) return <p>Not logged in</p>;
  return <p>{session.user.name}</p>;
}`,
  },
  {
    title: '8. Login Server Action',
    description:
      'Server Action สำหรับ login — ใช้ signIn() + redirect() ฝั่ง server ทั้งหมด',
    language: 'typescript',
    code: `// lib/actions/login/actions.ts
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
      redirect: false, // ให้ Server Action จัดการ redirect เอง
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: 'Invalid email or password' };
    }
    throw error;
  }
  redirect(ROUTES.NEXT_AUTH);
  // ✅ redirect() ฝั่ง server → layout re-render → await auth() ได้ session ใหม่
  // ✅ ถ้า component รับ session เป็น prop จาก layout → UI update ทันที
}`,
  },
  {
    title: '9. ⚠️ Server/Client Session Sync',
    description:
      'คำเตือนสำคัญ — signIn/signOut ทำงานฝั่ง Server แต่ useSession (Client) ไม่รู้ทันที',
    language: 'typescript',
    code: `// ❌ ปัญหา: useSession ไม่ update หลัง login/logout
// signIn/signOut เปลี่ยน session cookie ฝั่ง Server
// แต่ SessionProvider ฝั่ง Client ยังถือ session เก่าอยู่
// → ถ้า component ใช้ useSession() อย่างเดียว → UI ไม่เปลี่ยนจนกว่าจะ refresh

// ✅ แนะนำ: ส่ง session จาก Server เป็น prop
// Layout (Server) → await auth() → ส่ง prop ให้ Client Component
// redirect() ใน Server Action → layout re-render → auth() ได้ session ใหม่ → prop update
export default async function Layout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      {children}
      <AuthHeader session={session} /> {/* ✅ session จาก server เสมอ */}
    </SessionProvider>
  );
}

// Client Component รับ session เป็น prop — ไม่ต้องพึ่ง useSession
function AuthHeader({ session }: { session: Session | null }) {
  const user = session?.user;
  // ✅ redirect() ใน Server Action → layout re-render → prop ใหม่อัตโนมัติ
  return user ? <LogoutButton /> : <LoginButton />;
}

// ❌ ห้ามทำ
// - ใช้ useSession() เป็นตัวตัดสินใจ UI หลังเปลี่ยนสถานะ login/logout
//   → Server รู้ แต่ Client ไม่รู้ ต้อง refresh เอง
// - เก็บ session ใน state เอง (ใช้ auth() หรือ prop จาก server เท่านั้น)`,
  },
] as const;

// --- Google OAuth Page ---

export const GOOGLE_OAUTH_SECTIONS: readonly CodeSection[] = [
  {
    title: '1. สร้าง Google OAuth Credentials',
    description: 'ไปที่ Google Cloud Console → APIs & Services → Credentials',
    language: 'bash',
    code: `# ขั้นตอน:
# 1. ไปที่ https://console.cloud.google.com/apis/credentials
# 2. Create Credentials → OAuth client ID
# 3. Application type: Web application
# 4. Authorized redirect URIs:
#    - http://localhost:3000/api/auth/callback/google (dev)
#    - https://yourdomain.com/api/auth/callback/google (prod)
# 5. Copy Client ID และ Client Secret`,
  },
  {
    title: '2. Environment Variables',
    description: 'เพิ่ม Google OAuth credentials ใน .env',
    language: 'bash',
    code: `# .env
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"`,
  },
  {
    title: '3. เพิ่ม Google Provider',
    description:
      'เพิ่ม Google provider ใน auth config — Auth.js จัดการ OAuth flow ให้อัตโนมัติ',
    language: 'typescript',
    code: `import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({ ... }),
  ],
  // ... callbacks
});`,
  },
  {
    title: '4. Sign In Button',
    description:
      'สร้างปุ่ม Sign in with Google — ใช้ Server Action หรือ Client signIn()',
    language: 'typescript',
    code: `// Server Action
import { signIn } from '@/lib/auth/auth';

export async function signInWithGoogle() {
  'use server';
  await signIn('google', { redirectTo: '/features/next-auth' });
}

// Client Component
import { signIn } from 'next-auth/react';

<Button onClick={() => signIn('google', { redirectTo: '/features/next-auth' })}>
  Sign in with Google
</Button>`,
  },
] as const;

// --- Protected & RBAC Page ---

export const PROTECTED_CODE_SECTIONS: readonly CodeSection[] = [
  {
    title: 'Proxy Guard (proxy.ts)',
    description: 'ตรวจ cookie ใน proxy.ts — redirect ไป login ถ้าไม่มี session',
    language: 'typescript',
    code: `// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/features/next-auth/protected'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    const token =
      request.cookies.get('authjs.session-token')?.value ??
      request.cookies.get('__Secure-authjs.session-token')?.value;

    if (!token) {
      const loginUrl = new URL('/features/next-auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}`,
  },
  {
    title: 'Server-side Guard (getCurrentUser)',
    description:
      'ใช้ auth() ตรวจ session ใน Server Component — redirect ถ้าไม่ login',
    language: 'typescript',
    code: `// lib/auth/get-current-user.ts
import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user || session.error === 'RefreshTokenError') {
    redirect('/features/next-auth/login');
  }
  return session.user;
}`,
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    description: 'ตรวจ role ฝั่ง Server เสมอ — ไม่ trust Client',
    language: 'typescript',
    code: `import { USER_ROLE } from '@/constants/role.constant';
import { isSuperAdmin } from '@/constants/role.constant';

// ใน Server Component
const user = await getCurrentUser();

// ตรวจ role
if (isSuperAdmin(user.role)) {
  // แสดง Super Admin content
}

// หรือเปรียบเทียบตรง
if (user.role === USER_ROLE.ADMIN) {
  // แสดง Admin content
}`,
  },
] as const;

// --- Session Info Page ---

export const SESSION_CODE_SECTIONS: readonly CodeSection[] = [
  {
    title: 'Server Session — auth()',
    description:
      'เรียก auth() ใน Server Component — ได้ session ทันที ไม่ต้อง Provider',
    language: 'typescript',
    code: `// Server Component (page.tsx, layout.tsx)
import { auth } from '@/lib/auth/auth';

export default async function Page() {
  const session = await auth();
  // session อาจเป็น null ถ้าไม่ได้ login
  // session.user.id, .name, .email, .role
  // session.error — 'RefreshTokenError' ถ้า token หมดอายุ
}`,
  },
  {
    title: 'Client Session — useSession()',
    description:
      'ใช้ useSession() ใน Client Component — ต้องมี SessionProvider ครอบ',
    language: 'typescript',
    code: `'use client';
import { useSession } from 'next-auth/react';

export function SessionDisplay() {
  const { data: session, status, update } = useSession();

  // status: 'loading' | 'authenticated' | 'unauthenticated'
  // data: Session | null
  // update: (data?) => Promise<Session | null>

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <p>Not logged in</p>;

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}`,
  },
  {
    title: 'Server vs Client — เมื่อไหร่ใช้อะไร',
    description:
      'เลือกให้ถูก — auth() สำหรับ Server, useSession() สำหรับ Client ที่ต้อง react ต่อ session change',
    language: 'typescript',
    code: `// ✅ Server Component — ใช้ auth()
// - ไม่เพิ่ม JS bundle
// - SEO-friendly (render บน server)
// - ใช้ได้ใน page.tsx, layout.tsx, Server Action

// ✅ Client Component — ใช้ useSession()
// - ต้องมี SessionProvider ครอบ
// - React ต่อ session change (login/logout)
// - แสดง loading state ได้

// ❌ ห้าม
// - ใช้ useSession() ใน Server Component
// - ใช้ auth() ใน Client Component
// - เก็บ session ใน Zustand / localStorage`,
  },
] as const;
