import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { NAV_LINK_PATTERNS } from '@/constants/custom-patterns/nav-link.constant';

import { PatternCard } from '@/components/shared/pattern-card';
import { BasicIconPreview } from './basic-icon-preview';

const pattern = NAV_LINK_PATTERNS.find((p) => p.key === 'basic-icon')!;

export function BasicIcon() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {pattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">{pattern.description}</p>
      </div>
      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={<CodeBlockShiki code={pattern.code} language="tsx" />}
        >
          <BasicIconPreview />
        </PatternCard>
      </div>
    </section>
  );
}
