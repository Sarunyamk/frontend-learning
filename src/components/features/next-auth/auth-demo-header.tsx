'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/route.constant';
import { LogIn, LogOut, User } from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface AuthDemoHeaderProps {
  session: Session | null;
}

export function AuthDemoHeader({ session }: AuthDemoHeaderProps) {
  const user = session?.user;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border bg-background px-4 py-2.5 shadow-lg">
      <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
        Auth Demo
      </Badge>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-2">
        <User className="h-3.5 w-3.5 text-muted-foreground" />
        {user ? (
          <>
            <span className="text-xs font-medium">{user.name}</span>
            <Badge variant="secondary" className="text-[10px]">
              {user.role}
            </Badge>
          </>
        ) : (
          <span className="text-xs text-muted-foreground">Guest</span>
        )}
      </div>

      {user ? (
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => signOut({ redirectTo: ROUTES.NEXT_AUTH })}
        >
          <LogOut className="mr-1 h-3 w-3" />
          Logout
        </Button>
      ) : (
        <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
          <Link href={ROUTES.NEXT_AUTH_LOGIN}>
            <LogIn className="mr-1 h-3 w-3" />
            Login
          </Link>
        </Button>
      )}
    </div>
  );
}
