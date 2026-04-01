import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BUTTON_PATTERNS } from '@/constants/custom-patterns/button.constant';

import { PatternCard } from '../pattern-card';
import { BasicButtonsPreview } from './basic-buttons-preview';

const componentPattern = BUTTON_PATTERNS.find((p) => p.key === 'basic')!;
const usagePattern = BUTTON_PATTERNS.find((p) => p.key === 'basic-usage')!;

export function BasicButtons() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {componentPattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {componentPattern.description}
        </p>
      </div>
      <div className="mx-auto grid max-w-xl items-start gap-4">
        {/* Component source */}
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={componentPattern.code} language="tsx" />
          }
        >
          <p className="text-sm text-muted-foreground">
            Component — ดูโค้ดด้านล่าง
          </p>
        </PatternCard>

        {/* Usage examples with live preview */}
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <BasicButtonsPreview />
        </PatternCard>
      </div>
    </section>
  );
}
