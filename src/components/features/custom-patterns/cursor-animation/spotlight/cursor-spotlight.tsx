import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CURSOR_ANIMATION_PATTERNS } from '@/constants/custom-patterns/cursor-animation.constant';

import { CursorSpotlightPreview } from './cursor-spotlight-preview';

const sourcePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-spotlight-source',
)!;
const usagePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-spotlight-usage',
)!;

export function CursorSpotlight() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Cursor Spotlight
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {sourcePattern.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-2xl items-start gap-4">
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <CursorSpotlightPreview />
        </PatternCard>

        <PatternCard
          codeSlot={
            <CodeBlockShiki code={usagePattern.code} language="tsx" />
          }
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{usagePattern.title}</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code className="rounded bg-muted px-1 text-xs">radius</code>{' '}
                — ขนาดวงแสง (default 120px)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  overlayOpacity
                </code>{' '}
                — ความเข้มของพื้นหลังมืด (0-1)
              </li>
              <li>
                ใช้{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  requestAnimationFrame
                </code>{' '}
                throttle อัตโนมั��ิ
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
