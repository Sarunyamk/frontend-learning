import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TOAST_PATTERNS } from '@/constants/custom-patterns/toast.constant';

import { PatternCard } from '../../../../shared/pattern-card';
import { PromiseToastPreview } from './promise-toast-preview';

const pattern = TOAST_PATTERNS.find((p) => p.key === 'promise')!;

export function PromiseToast() {
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
          <PromiseToastPreview />
        </PatternCard>
      </div>
    </section>
  );
}
