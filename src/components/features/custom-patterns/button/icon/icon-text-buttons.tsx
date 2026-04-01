import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CustomButton } from '@/components/shared/custom-button';
import { BUTTON_PATTERNS } from '@/constants/custom-patterns/button.constant';
import { ArrowRight, Download, Plus } from 'lucide-react';

import { PatternCard } from '../../../../shared/pattern-card';

const ICON_EXAMPLES = [
  {
    pattern: BUTTON_PATTERNS.find((p) => p.key === 'icon-arrow')!,
    preview: (
      <CustomButton className="group" label="Next Step">
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </CustomButton>
    ),
  },
  {
    pattern: BUTTON_PATTERNS.find((p) => p.key === 'icon-download')!,
    preview: (
      <CustomButton variant="outline" className="group">
        <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
        <span>Download</span>
      </CustomButton>
    ),
  },
  {
    pattern: BUTTON_PATTERNS.find((p) => p.key === 'icon-rotate')!,
    preview: (
      <CustomButton variant="secondary" className="group">
        <Plus className="size-4 transition-transform group-hover:rotate-90" />
        <span>Add Item</span>
      </CustomButton>
    ),
  },
] as const;

export function IconTextButtons() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Icon + Text</h2>
        <p className="text-sm text-muted-foreground">
          ปุ่มที่มี icon เลื่อนเมื่อ hover ด้วย group + translate
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        {ICON_EXAMPLES.map((example) => (
          <PatternCard
            key={example.pattern.key}
            codeSlot={
              <CodeBlockShiki code={example.pattern.code} language="tsx" />
            }
          >
            {example.preview}
          </PatternCard>
        ))}
      </div>
    </section>
  );
}
