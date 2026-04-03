export type ErrorPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const ERROR_PATTERNS: readonly ErrorPattern[] = [
  {
    key: 'error-card',
    title: 'ErrorCard — Reusable Component',
    description:
      'Card แสดง error — ColumnFade stagger + shake icon + title + description + Retry button + statusCode. ใช้ใน error.tsx ได้เลย',
    code: `// components/shared/error-card.tsx
'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ColumnFade } from '@/components/framer-motion/fade';
import { shake } from '@/lib/framer-motion/framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorCardProps = {
  title?: string;
  description?: string;
  statusCode?: number;
  onRetry?: () => void;
  className?: string;
};

export function ErrorCard({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  statusCode,
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 text-center',
        className
      )}
    >
      <ColumnFade variant={shake} delay={0}>
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
      </ColumnFade>
      {statusCode && (
        <ColumnFade delay={0.05}>
          <span className="text-4xl font-bold text-destructive">
            {statusCode}
          </span>
        </ColumnFade>
      )}
      <ColumnFade delay={0.1}>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </ColumnFade>
      {onRetry && (
        <ColumnFade delay={0.2}>
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        </ColumnFade>
      )}
    </div>
  );
}

// shake variant (lib/framer-motion/framer-motion.ts)
// export const shake: Variants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   show: {
//     opacity: 1,
//     scale: 1,
//     rotate: [0, -10, 10, -10, 10, 0],
//     transition: { rotate: { delay: 0.3, duration: 0.5, ease: 'easeInOut' } },
//   },
// };`,
  },
  {
    key: 'error-card-usage',
    title: 'ErrorCard — Usage in error.tsx',
    description:
      'ตัวอย่างการใช้งานจริงใน Next.js error.tsx (Error Boundary)',
    code: `// app/error.tsx (หรือ app/features/error.tsx)
// Next.js จะ wrap page ด้วย ErrorBoundary อัตโนมัติ
// error.tsx ต้องเป็น 'use client' เสมอ
'use client';

import { ErrorCard } from '@/components/shared/error-card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorCard
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      onRetry={reset}
    />
  );
}

// error.tsx รับ 2 props จาก Next.js:
// - error: Error object (ห้าม show error.message ใน production)
// - reset(): function สำหรับ retry render`,
  },
  {
    key: 'status-code',
    title: 'Error + Status Code',
    description:
      'แสดง error ตาม HTTP status code — 401/403/500 มี icon + สี + ข้อความต่างกัน',
    code: `// ตัวอย่างการใช้ ErrorCard กับ status code ต่างๆ
import { ErrorCard } from '@/components/shared/error-card';

// 401 Unauthorized
<ErrorCard
  statusCode={401}
  title="Unauthorized"
  description="Please login to access this page."
  onRetry={() => router.push('/login')}
/>

// 403 Forbidden
<ErrorCard
  statusCode={403}
  title="Access Denied"
  description="You don't have permission to view this page."
/>

// 500 Internal Server Error
<ErrorCard
  statusCode={500}
  title="Server Error"
  description="Something went wrong on our end. Please try again later."
  onRetry={() => reset()}
/>`,
  },
  {
    key: 'status-code-usage',
    title: 'Error Status Code — Full Example',
    description:
      'ตัวอย่างการใช้ status code ใน error.tsx — map error code → ข้อความ',
    code: `// app/error.tsx — dynamic error message based on status code
'use client';

import { ErrorCard } from '@/components/shared/error-card';

const ERROR_MAP: Record<number, { title: string; description: string }> = {
  401: {
    title: 'Unauthorized',
    description: 'Please login to access this page.',
  },
  403: {
    title: 'Access Denied',
    description: "You don't have permission to view this page.",
  },
  500: {
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  const statusCode = (error as any).statusCode ?? 500;
  const mapped = ERROR_MAP[statusCode] ?? ERROR_MAP[500];

  return (
    <ErrorCard
      statusCode={statusCode}
      title={mapped.title}
      description={mapped.description}
      onRetry={reset}
    />
  );
}`,
  },
  {
    key: 'global-error',
    title: 'Global Error — global-error.tsx',
    description:
      'Root error boundary — จับ error จาก root layout ต้องมี <html><body> ครบ',
    code: `// app/global-error.tsx
// จับ error จาก root layout — ต้องมี <html><body>
// เพราะ layout พัง ทำให้ HTML structure หายไป
'use client';

import { ErrorCard } from '@/components/shared/error-card';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body className="flex min-h-screen items-center justify-center">
        <ErrorCard
          title="Critical Error"
          description="Something went wrong at the application level."
          onRetry={reset}
        />
      </body>
    </html>
  );
}

// ⚠️ global-error.tsx เป็น last resort
// ทุก route ควรมี error.tsx ของตัวเอง
// global-error.tsx ใช้เฉพาะเมื่อ root layout พัง`,
  },
  {
    key: 'global-error-usage',
    title: 'Global Error — Error Boundary Hierarchy',
    description:
      'อธิบาย error boundary hierarchy ใน Next.js App Router',
    code: `// Error Boundary Hierarchy ใน Next.js App Router
// ====================================================

// 1. page-level error.tsx — จับ error ของ page.tsx + child routes
// app/features/error.tsx
'use client';
export default function FeatureError({ error, reset }) {
  // จับ error จาก /features/* ทุก page
  return <ErrorCard onRetry={reset} />;
}

// 2. route-group error.tsx — จับ error ของ group
// app/(dashboard)/error.tsx
'use client';
export default function DashboardError({ error, reset }) {
  // จับ error จาก dashboard routes เท่านั้น
  return <ErrorCard onRetry={reset} />;
}

// 3. global-error.tsx — จับ error ของ root layout
// app/global-error.tsx (ต้องมี <html><body>)

// Hierarchy:
// global-error.tsx
//   └── layout.tsx (root)
//       └── error.tsx (route-level)
//           └── page.tsx

// ⚠️ error.tsx ไม่จับ error ของ layout.tsx ในระดับเดียวกัน
// ต้องใช้ parent error.tsx หรือ global-error.tsx`,
  },
];
