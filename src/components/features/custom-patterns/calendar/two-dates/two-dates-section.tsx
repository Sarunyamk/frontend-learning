import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CALENDAR_PATTERNS } from '@/constants/custom-patterns/calendar.constant';
import { TwoDatesPreview } from './two-dates-preview';

const sourcePattern = CALENDAR_PATTERNS.find((p) => p.key === 'two-dates')!;
const usagePattern = CALENDAR_PATTERNS.find(
  (p) => p.key === 'two-dates-usage'
)!;

export function TwoDatesSection() {
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
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            Component — ดูโค้ดด้านล่าง
          </p>
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <TwoDatesPreview />
        </PatternCard>
      </div>
    </section>
  );
}
