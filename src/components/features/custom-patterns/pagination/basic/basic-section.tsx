import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { PAGINATION_PATTERNS } from '@/constants/custom-patterns/pagination.constant';
import { BasicPaginationPreview } from './basic-preview';

const sourcePattern = PAGINATION_PATTERNS.find(
  (p) => p.key === 'basic-pagination'
)!;
const usagePattern = PAGINATION_PATTERNS.find(
  (p) => p.key === 'basic-pagination-usage'
)!;

export function BasicPaginationSection() {
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
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        {/* Component source */}
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            Component — ดูโค้ดด้านล่าง
          </p>
        </PatternCard>

        {/* Usage examples with live preview */}
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <BasicPaginationPreview />
        </PatternCard>
      </div>
    </section>
  );
}
