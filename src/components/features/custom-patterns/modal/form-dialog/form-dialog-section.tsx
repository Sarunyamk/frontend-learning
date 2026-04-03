import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { MODAL_PATTERNS } from '@/constants/custom-patterns/modal.constant';
import { FormDialogPreview } from './form-dialog-preview';

const pattern = MODAL_PATTERNS.find((p) => p.key === 'form-dialog')!;

export function FormDialogSection() {
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
          <FormDialogPreview />
        </PatternCard>
      </div>
    </section>
  );
}
