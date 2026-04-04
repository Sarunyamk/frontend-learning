import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CURSOR_ANIMATION_PATTERNS } from '@/constants/custom-patterns/cursor-animation.constant';

import { CursorTrailPreview } from './cursor-trail-preview';

const sourcePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-trail-source',
)!;
const usagePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-trail-usage',
)!;

export function CursorTrail() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Cursor Trail</h2>
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
          <CursorTrailPreview />
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
                <code className="rounded bg-muted px-1 text-xs">
                  renderDot
                </code>{' '}
                — เปลี่ยน dot เป็น icon/emoji/custom element
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  throttleMs
                </code>{' '}
                — ควบคุมความถี่ (default 30ms)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  lifetime
                </code>{' '}
                — อายุแต่ละ dot ก่อน fade out (default 500ms)
              </li>
              <li>
                Cleanup ด้วย{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  timeoutsRef
                </code>{' '}
                ป้องกัน memory leak
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
