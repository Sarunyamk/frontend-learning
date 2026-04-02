import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { LOADING_PATTERNS } from '@/constants/custom-patterns/loading.constant';

import { PatternCard } from '../../../../shared/pattern-card';
import { LoadingScreenPreview } from './loading-screen-preview';

const pattern = LOADING_PATTERNS.find((p) => p.key === 'loading-screen')!;
const usagePattern = LOADING_PATTERNS.find(
  (p) => p.key === 'loading-screen-usage',
)!;

export function LoadingScreenDemo() {
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
          <LoadingScreenPreview />
        </PatternCard>
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <div className="text-center text-sm text-muted-foreground">
            ตัวอย่างการใช้ใน loading.tsx — ดู code ด้านล่าง
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
