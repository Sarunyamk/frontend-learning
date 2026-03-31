'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CodeBlock } from '@/components/tailwind/code-block';
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
import { LogIn, Monitor, Server } from 'lucide-react';
import type { Session } from 'next-auth';

type SessionContentProps = {
  serverSession: Session | null;
};

function NotAuthenticatedCard() {
  return (
    <div className="space-y-3 rounded-lg border border-dashed border-muted-foreground/30 p-6 text-center">
      <p className="text-sm text-muted-foreground">Not authenticated</p>
      <Button variant="outline" size="sm" asChild>
        <Link href={ROUTES.NEXT_AUTH_LOGIN}>
          <LogIn className="mr-1.5 h-3.5 w-3.5" />
          Login to see session data
        </Link>
      </Button>
    </div>
  );
}

function SessionJson({ data }: { data: unknown }) {
  return (
    <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export function SessionContent({ serverSession }: SessionContentProps) {
  const { data: clientSession, status } = useSession();

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
          {serverSession ? (
            <SessionJson data={serverSession} />
          ) : (
            <NotAuthenticatedCard />
          )}
        </CardContent>
      </Card>

      {/* Card 2: Client Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Client Session — useSession()
          </CardTitle>
          <CardDescription>
            ข้อมูลจาก useSession() ใน Client Component — react ต่อ session
            change, แสดง loading state ได้
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <div className="space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          )}
          {status === 'unauthenticated' && <NotAuthenticatedCard />}
          {status === 'authenticated' && clientSession && (
            <SessionJson data={clientSession} />
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Status: <code className="font-mono">{status}</code>
          </p>
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
              <CodeBlock code={section.code} language={section.language} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
