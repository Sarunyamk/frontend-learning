'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/constants/route.constant';
import { LogIn, Monitor } from 'lucide-react';

export function ClientSessionCard() {
  const { data: clientSession, status } = useSession();

  return (
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
        {status === 'unauthenticated' && (
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
        {status === 'authenticated' && clientSession && (
          <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
            {JSON.stringify(clientSession, null, 2)}
          </pre>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          Status: <code className="font-mono">{status}</code>
        </p>
      </CardContent>
    </Card>
  );
}
