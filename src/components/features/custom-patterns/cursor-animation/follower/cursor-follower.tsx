import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CURSOR_ANIMATION_PATTERNS } from '@/constants/custom-patterns/cursor-animation.constant';

import { CursorFollowerPreview } from './cursor-follower-preview';

const sourcePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-follower-source',
)!;
const usagePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'cursor-follower-usage',
)!;

export function CursorFollower() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Cursor Follower
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
          <CursorFollowerPreview />
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
                  containerRef
                </code>{' '}
                — track mouse ภายใน element ที่กำหนด
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">children</code>{' '}
                — ใส่ icon/emoji แทน dot ได้
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  springConfig
                </code>{' '}
                — ปรับความเร็ว/lag ของ follower
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
