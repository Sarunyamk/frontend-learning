'use client';

import { Server, Monitor, Zap, XCircle } from 'lucide-react';

const USE_CASES = [
  {
    icon: Server,
    label: 'Server Component',
    env: 'serverEnv',
    example: 'fetch(serverEnv.API_URL + "/api/features")',
    allowed: true,
  },
  {
    icon: Monitor,
    label: 'Client Component',
    env: 'clientEnv',
    example: 'new WebSocket(clientEnv.NEXT_PUBLIC_SOCKET_URL)',
    allowed: true,
  },
  {
    icon: Zap,
    label: 'Server Action',
    env: 'serverEnv',
    example: 'fetch(serverEnv.API_URL + "/api/auth/login")',
    allowed: true,
  },
] as const;

const DONT_DO = [
  {
    label: 'serverEnv ใน Client Component',
    detail: 'build error — server-only guard',
  },
  {
    label: 'process.env.API_URL ตรงๆ',
    detail: 'string | undefined — ไม่มี type safety',
  },
  {
    label: 'process.env.APIURL (typo)',
    detail: 'ไม่มี error ตอน compile — พังตอน runtime',
  },
] as const;

export function TypeSafeUsagePreview() {
  return (
    <div className="space-y-4 text-sm">
      {/* Use cases */}
      <div className="space-y-3">
        {USE_CASES.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-muted/30 p-3"
          >
            <div className="flex items-center gap-2">
              <item.icon className="size-4 text-primary" />
              <span className="font-medium text-foreground">{item.label}</span>
              <code className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                {item.env}
              </code>
            </div>
            <code className="mt-2 block text-xs text-muted-foreground">
              {item.example}
            </code>
          </div>
        ))}
      </div>

      {/* Don't do */}
      <div className="space-y-2">
        <p className="font-medium text-destructive">
          ห้ามทำ
        </p>
        <ul className="space-y-1.5">
          {DONT_DO.map((item) => (
            <li key={item.label} className="flex items-start gap-2">
              <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div>
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {item.label}
                </code>
                <span className="text-muted-foreground"> — {item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
