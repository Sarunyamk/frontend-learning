'use client';

import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function ClientEnvPreview() {
  return (
    <div className="space-y-4 text-sm">
      {/* Gotcha */}
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          <p className="font-medium text-destructive">
            Gotcha: process.env ใน browser = {'{}'}
          </p>
        </div>
        <p className="mt-2 text-muted-foreground">
          Next.js จะ <strong>inline</strong> ค่า{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_*
          </code>{' '}
          ตอน build — แต่ทำได้เฉพาะเมื่อเขียน{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            process.env.NEXT_PUBLIC_XXX
          </code>{' '}
          ตรงๆ ทีละตัว
        </p>
      </div>

      {/* Wrong vs Correct */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-destructive/30 p-3">
          <p className="mb-2 text-xs font-medium text-destructive">
            WRONG
          </p>
          <code className="block whitespace-pre-wrap text-xs text-muted-foreground">
            {`schema.safeParse(process.env)
// browser: process.env = {}
// ทุก key เป็น undefined!`}
          </code>
        </div>
        <div className="rounded-lg border border-emerald-500/30 p-3">
          <p className="mb-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            CORRECT
          </p>
          <code className="block whitespace-pre-wrap text-xs text-muted-foreground">
            {`schema.safeParse({
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL,
})
// Next.js inline ค่าจริง`}
          </code>
        </div>
      </div>

      {/* Differences from server */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="size-4 text-primary" />
          <p className="font-medium text-foreground">
            ต่างจาก Server Env อย่างไร
          </p>
        </div>
        <ul className="space-y-1 text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>
              ไม่มี{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                server-only
              </code>{' '}
              — ใช้ได้ทั้ง Server และ Client
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>
              ใช้{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                throw Error
              </code>{' '}
              แทน{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                process.exit
              </code>{' '}
              — browser ไม่มี process.exit
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>
              ต้อง reference{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                process.env.NEXT_PUBLIC_XXX
              </code>{' '}
              ทีละตัว
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
