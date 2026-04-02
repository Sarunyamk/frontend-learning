import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { MODAL_PATTERNS } from '@/constants/custom-patterns/modal.constant';
import { ConfirmDialogPreview } from './confirm-dialog-preview';

const pattern = MODAL_PATTERNS.find((p) => p.key === 'confirm-dialog')!;

export function ConfirmDialogSection() {
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
          <ConfirmDialogPreview />
        </PatternCard>
      </div>
    </section>
  );
}
