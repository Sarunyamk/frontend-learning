import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TABLE_ACTION_PATTERNS } from '@/constants/custom-patterns/table-action.constant';
import { BasicTablePreview } from './basic-preview';

const sourcePattern = TABLE_ACTION_PATTERNS.find(
  (p) => p.key === 'basic-table'
)!;
const usagePattern = TABLE_ACTION_PATTERNS.find(
  (p) => p.key === 'basic-table-usage'
)!;
const apiPattern = TABLE_ACTION_PATTERNS.find(
  (p) => p.key === 'basic-table-api'
)!;

export function BasicTableSection() {
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
            DataTable component — ดูโค้ดด้านล่าง
          </p>
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <BasicTablePreview />
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={apiPattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            {apiPattern.title} — {apiPattern.description}
          </p>
        </PatternCard>
      </div>
    </section>
  );
}
