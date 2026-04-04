import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { MODAL_PATTERNS } from '@/constants/custom-patterns/modal.constant';
import { AlertMessagePreview } from './alert-message-preview';

const pattern = MODAL_PATTERNS.find((p) => p.key === 'alert-message')!;

export function AlertMessageSection() {
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
          <AlertMessagePreview />
        </PatternCard>
      </div>
    </section>
  );
}
