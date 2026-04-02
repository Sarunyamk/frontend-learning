import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TOAST_PATTERNS } from '@/constants/custom-patterns/toast.constant';

import { ActionToastPreview } from './action-toast-preview';
import { PatternCard } from '@/components/shared/pattern-card';

const pattern = TOAST_PATTERNS.find((p) => p.key === 'action')!;

export function ActionToast() {
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
          <ActionToastPreview />
        </PatternCard>
      </div>
    </section>
  );
}
