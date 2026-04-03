import Link from 'next/link';
import { ROUTES } from '@/constants/route.constant';
import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { ERROR_PATTERNS } from '@/constants/custom-patterns/error.constant';
import { ErrorCardPreview } from './error-card-preview';

const sourcePattern = ERROR_PATTERNS.find((p) => p.key === 'error-card')!;
const usagePattern = ERROR_PATTERNS.find((p) => p.key === 'error-card-usage')!;

export function ErrorCardSection() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {sourcePattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {sourcePattern.description}
        </p>
        <p className="text-sm text-muted-foreground">
          ColumnFade component ดูโค้ดได้ที่{' '}
          <Link
            href={ROUTES.FRAMER_MOTION_EXAMPLES}
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Framer Motion → Animation Examples → Ready to Use
          </Link>
          {' '}— ต้องเพิ่ม{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
            shake
          </code>{' '}
          variant ใน{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
            lib/framer-motion/framer-motion.ts
          </code>
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <ErrorCardPreview />
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            ตัวอย่างการใช้ใน error.tsx — ดู code ด้านล่าง
          </p>
        </PatternCard>
      </div>
    </section>
  );
}
