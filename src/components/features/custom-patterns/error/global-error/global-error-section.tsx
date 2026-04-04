import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { ERROR_PATTERNS } from '@/constants/custom-patterns/error.constant';

const sourcePattern = ERROR_PATTERNS.find((p) => p.key === 'global-error')!;
const usagePattern = ERROR_PATTERNS.find(
  (p) => p.key === 'global-error-usage'
)!;

export function GlobalErrorSection() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {sourcePattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {sourcePattern.description}
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            global-error.tsx — ดู code ด้านล่าง
          </p>
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            Error Boundary Hierarchy — ลำดับการจับ error
          </p>
        </PatternCard>
      </div>
    </section>
  );
}
