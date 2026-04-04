import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BUTTON_PATTERNS } from '@/constants/custom-patterns/button.constant';

import { CustomButton } from '@/components/shared/ui-primitives/custom-button';
import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';

const pattern = BUTTON_PATTERNS.find((p) => p.key === 'shimmer')!;

export function ShimmerButton() {
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
          <CustomButton
            label="Shimmer Button"
            className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:-skew-x-12 before:-translate-x-full before:bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.6)_50%,transparent_80%)] before:transition-transform before:duration-1000 before:ease-in-out hover:before:translate-x-[400%]"
          />
        </PatternCard>
      </div>
    </section>
  );
}
