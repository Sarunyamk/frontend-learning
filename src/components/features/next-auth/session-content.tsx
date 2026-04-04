import Link from 'next/link';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/constants/route.constant';
import { SESSION_CODE_SECTIONS } from '@/constants/next-auth.constant';
import { LogIn, Server } from 'lucide-react';
import type { Session } from 'next-auth';

type SessionContentProps = {
  session: Session | null;
};

export function SessionContent({ session }: SessionContentProps) {
  return (
    <div className="space-y-8">
      {/* Card 1: Server Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Server Session — auth()
          </CardTitle>
          <CardDescription>
            ข้อมูลจาก auth() ใน Server Component — render บน server, ไม่เพิ่ม JS
            bundle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
              {JSON.stringify(session, null, 2)}
            </pre>
          ) : (
            <div className="space-y-3 rounded-lg border border-dashed border-muted-foreground/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">Not authenticated</p>
              <Button variant="outline" size="sm" asChild>
                <Link href={ROUTES.NEXT_AUTH_LOGIN}>
                  <LogIn className="mr-1.5 h-3.5 w-3.5" />
                  Login to see session data
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section: Code Examples */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Code Examples</h2>
        {SESSION_CODE_SECTIONS.map((section) => (
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
