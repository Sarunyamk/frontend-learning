import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PROTECTED_CODE_SECTIONS } from '@/constants/next-auth.constant';
import { isSuperAdmin } from '@/constants/role.constant';
import type { UserRole } from '@/constants/role.constant';
import { CheckCircle, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';

type ProtectedContentProps = {
  user: {
    name: string;
    email: string;
    role: UserRole;
  };
};

export function ProtectedContent({ user }: ProtectedContentProps) {
  const isSuperAdminUser = isSuperAdmin(user.role);

  return (
    <div className="space-y-8">
      {/* Section 1: Protected Content — User Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            Protected Content
          </CardTitle>
          <CardDescription>
            คุณผ่าน proxy guard แล้ว — หน้านี้ถูก guard ด้วย cookie check ใน
            proxy.ts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                <span className="font-medium">Name:</span> {user.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                <span className="font-medium">Email:</span> {user.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                <span className="font-medium">Role:</span>{' '}
                <Badge variant="secondary">{user.role}</Badge>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: RBAC Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Super Admin Only
          </CardTitle>
          <CardDescription>
            เนื้อหาส่วนนี้แสดงเฉพาะ SUPER_ADMIN — ตรวจ role ฝั่ง Server เสมอ
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuperAdminUser ? (
            <div className="space-y-3 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-600 dark:text-green-400">
                  Super Admin Access Granted
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                คุณเห็นเนื้อหานี้เพราะ role = SUPER_ADMIN — ใน production
                ควรตรวจ role ฝั่ง Server ก่อน render sensitive data
              </p>
              <div className="rounded-md bg-muted p-3">
                <p className="text-xs font-mono text-muted-foreground">
                  🔑 Secret: SUPER_ADMIN_DASHBOARD_KEY=sk_live_xxx
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-destructive" />
                <span className="font-medium text-destructive">
                  Access Denied
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Role ของคุณคือ <Badge variant="outline">{user.role}</Badge> —
                ต้อง login ด้วย SUPER_ADMIN เพื่อเห็นเนื้อหาส่วนนี้
              </p>
              <p className="text-xs text-muted-foreground">
                ลอง login ด้วย super@test.com / super1234
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 3: Code Examples */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Code Examples</h2>
        {PROTECTED_CODE_SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlockShiki code={section.code} language={section.language} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
