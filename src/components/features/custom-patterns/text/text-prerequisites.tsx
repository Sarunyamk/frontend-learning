import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TEXT_PATTERNS } from '@/constants/custom-patterns/text.constant';
import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';

const typePattern = TEXT_PATTERNS.find((p) => p.key === 'text-types')!;
const hookPattern = TEXT_PATTERNS.find((p) => p.key === 'use-type-animation-hook')!;

export function TextPrerequisites() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Prerequisites — Type & Hook
        </h2>
        <p className="text-sm text-muted-foreground">
          Type definition + custom hook ที่ต้อง copy ก่อนใช้งาน Text components
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        <PatternCard
          codeSlot={<CodeBlockShiki code={typePattern.code} language="tsx" />}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {typePattern.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {typePattern.description}
            </p>
          </div>
        </PatternCard>
        <PatternCard
          codeSlot={<CodeBlockShiki code={hookPattern.code} language="tsx" />}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {hookPattern.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {hookPattern.description}
            </p>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
