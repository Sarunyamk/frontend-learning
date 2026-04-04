import Link from 'next/link';
import { ROUTES } from '@/constants/route.constant';
import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { NOT_FOUND_PATTERNS } from '@/constants/custom-patterns/not-found.constant';
import { NotFoundCardPreview } from './not-found-card-preview';

const sourcePattern = NOT_FOUND_PATTERNS.find(
  (p) => p.key === 'not-found-card'
)!;
const usagePattern = NOT_FOUND_PATTERNS.find(
  (p) => p.key === 'not-found-card-usage'
)!;

export function NotFoundCardSection() {
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
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <NotFoundCardPreview />
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            ตัวอย่างการใช้ใน not-found.tsx — ดู code ด้านล่าง
          </p>
        </PatternCard>
      </div>
    </section>
  );
}
