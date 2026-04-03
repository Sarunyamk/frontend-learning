import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TABLE_ACTION_PATTERNS } from '@/constants/custom-patterns/table-action.constant';
import { RowSelectionPreview } from './row-selection-preview';

const sourcePattern = TABLE_ACTION_PATTERNS.find(
  (p) => p.key === 'row-selection'
)!;
const usagePattern = TABLE_ACTION_PATTERNS.find(
  (p) => p.key === 'row-selection-usage'
)!;

export function RowSelectionSection() {
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
            Checkbox + Bulk Actions — ดูโค้ดด้านล่าง
          </p>
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <RowSelectionPreview />
        </PatternCard>
      </div>
    </section>
  );
}
