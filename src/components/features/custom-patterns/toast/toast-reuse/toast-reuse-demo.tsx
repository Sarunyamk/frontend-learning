import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { TOAST_PATTERNS } from '@/constants/custom-patterns/toast.constant';

import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { ToastReusePreview } from './toast-reuse-preview';

const pattern = TOAST_PATTERNS.find((p) => p.key === 'show-toast')!;
const usagePattern = TOAST_PATTERNS.find((p) => p.key === 'show-toast-usage')!;

export function ToastReuseDemo() {
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
          <ToastReusePreview />
        </PatternCard>
        <PatternCard
          codeSlot={<CodeBlockShiki code={usagePattern.code} language="tsx" />}
        >
          <div className="text-center text-sm text-muted-foreground">
            ตัวอย่างการเรียกใช้ showToast — ดู code ด้านล่าง
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
