import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TEXT_PATTERNS } from '@/constants/custom-patterns/text.constant';
import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { TypeAnimationTextPreview } from './type-animation-text-preview';

const pattern = TEXT_PATTERNS.find((p) => p.key === 'type-animation')!;
const usagePattern = TEXT_PATTERNS.find((p) => p.key === 'type-animation-usage')!;

export function TypeAnimationText() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {pattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">{pattern.description}</p>
      </div>
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        <PatternCard
          codeSlot={<CodeBlockShiki code={pattern.code} language="tsx" />}
        >
          <TypeAnimationTextPreview />
        </PatternCard>
        <PatternCard
          codeSlot={<CodeBlockShiki code={usagePattern.code} language="tsx" />}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {usagePattern.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {usagePattern.description}
            </p>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
