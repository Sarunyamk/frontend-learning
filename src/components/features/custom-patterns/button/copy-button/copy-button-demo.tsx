import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BUTTON_PATTERNS } from '@/constants/custom-patterns/button.constant';

import { PatternCard } from '../pattern-card';
import { CopyButtonPreview } from './copy-button-preview';

const pattern = BUTTON_PATTERNS.find((p) => p.key === 'copy')!;

export function CopyButtonDemo() {
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
          <CopyButtonPreview />
        </PatternCard>
      </div>
    </section>
  );
}
