export type LoadingPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const LOADING_PATTERNS: readonly LoadingPattern[] = [
  {
    key: 'loading-screen',
    title: 'LoadingScreen — Reusable Component',
    description:
      'Full-page overlay + backdrop blur + spinner — import ไปใช้ใน loading.tsx ได้เลย',
    code: `// components/shared/loading-screen.tsx
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
      bg-background/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        {/* อยากเปลี่ยน loading style? แค่เปลี่ยนบรรทัดนี้
            ดูตัวอย่าง pattern อื่นๆ ได้ด้านล่าง (Spinner, Skeleton, Dots, etc.)
            แล้ว copy มาวางแทนได้เลย */}
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}`,
  },
  {
    key: 'loading-screen-usage',
    title: 'LoadingScreen — Usage in loading.tsx',
    description:
      'ตัวอย่างการใช้งานจริงใน Next.js loading.tsx (Suspense boundary)',
    code: `// app/loading.tsx (หรือ app/features/loading.tsx)
// Next.js จะ wrap page ด้วย <Suspense fallback={<Loading />}> อัตโนมัติ
import { LoadingScreen } from '@/components/shared/loading-screen';

export default function Loading() {
  return <LoadingScreen />;
}

// เมื่อ user navigate ไปหน้าที่เป็น Dynamic (ƒ)
// หรือหน้าที่มี async data fetching
// จะเห็น overlay blur + spinner ทับ content เดิม
// จนกว่า page จะ render เสร็จ`,
  },
  {
    key: 'spinner',
    title: 'Spinner Loading',
    description:
      '3 spinner styles — Lucide animate-spin, SVG circle spinner, Tailwind border spinner',
    code: `// 1. Lucide Loader2 + animate-spin (ง่ายสุด)
import { Loader2 } from 'lucide-react';

<Loader2 className="size-8 animate-spin text-primary" />

// 2. SVG Circle Spinner (custom stroke + speed)
<svg
  className="size-8 animate-spin text-primary"
  viewBox="0 0 24 24"
  fill="none"
>
  <circle
    className="opacity-25"
    cx="12" cy="12" r="10"
    stroke="currentColor" strokeWidth="4"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  />
</svg>

// 3. Tailwind Border Spinner (CSS only)
<div
  className="size-8 animate-spin rounded-full
    border-4 border-muted border-t-primary"
/>`,
  },
  {
    key: 'skeleton',
    title: 'Skeleton Shimmer',
    description:
      'shadcn Skeleton — card layout (avatar + lines) และ list rows พร้อม toggle show/hide',
    code: `// ใช้ shadcn Skeleton component
import { Skeleton } from '@/components/ui/skeleton';

// Card Skeleton — avatar + text lines
<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>

// List Skeleton — repeating rows
<div className="space-y-3">
  {Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-md" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ))}
</div>`,
  },
  {
    key: 'dots',
    title: 'Dots / Pulse Animation',
    description:
      'Bouncing dots, pulse dots, wave dots — ใช้ animate-bounce + staggered animation-delay',
    code: `// 1. Bouncing Dots — animate-bounce + staggered delay
<div className="flex items-center gap-1.5">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="size-3 animate-bounce rounded-full bg-primary"
      style={{ animationDelay: \`\${i * 0.15}s\` }}
    />
  ))}
</div>

// 2. Pulse Dots — animate-pulse + staggered delay
<div className="flex items-center gap-2">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="size-3 animate-pulse rounded-full bg-primary"
      style={{ animationDelay: \`\${i * 0.2}s\` }}
    />
  ))}
</div>

// 3. Wave Dots — custom @keyframes wave (scale Y)
// globals.css: @keyframes wave {
//   0%, 100% { transform: scaleY(0.4) }
//   50% { transform: scaleY(1) }
// }
<div className="flex items-end gap-1">
  {[0, 1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="w-1.5 rounded-full bg-primary"
      style={{
        height: '24px',
        animation: 'wave 1s ease-in-out infinite',
        animationDelay: \`\${i * 0.1}s\`,
      }}
    />
  ))}
</div>`,
  },
  {
    key: 'fancy',
    title: 'Framer Motion Wave',
    description:
      'motion.div — wave (dots oscillate Y with stagger)',
    code: `'use client';
import { motion } from 'framer-motion';

// Wave — dots oscillate Y with stagger
<div className="flex items-center gap-1.5">
  {[0, 1, 2, 3, 4].map((i) => (
    <motion.div
      key={i}
      className="size-2.5 rounded-full bg-primary"
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: 'easeInOut',
      }}
    />
  ))}
</div>`,
  },
] as const;
