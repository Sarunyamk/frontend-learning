import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { ERROR_PATTERNS } from '@/constants/custom-patterns/error.constant';
import { StatusCodePreview } from './status-code-preview';

const sourcePattern = ERROR_PATTERNS.find((p) => p.key === 'status-code')!;
const usagePattern = ERROR_PATTERNS.find(
  (p) => p.key === 'status-code-usage'
)!;

export function StatusCodeSection() {
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
          <StatusCodePreview />
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            Full example — map status code → ข้อความ
          </p>
        </PatternCard>
      </div>
    </section>
  );
}
