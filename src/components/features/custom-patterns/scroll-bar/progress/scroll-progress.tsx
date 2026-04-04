import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { SCROLL_BAR_PATTERNS } from '@/constants/custom-patterns/scroll-bar.constant';

const componentPattern = SCROLL_BAR_PATTERNS.find(
  (p) => p.key === 'unified-scroll-bar'
)!;
const helperPattern = SCROLL_BAR_PATTERNS.find(
  (p) => p.key === 'unified-scroll-bar-helper'
)!;
const setupPattern = SCROLL_BAR_PATTERNS.find(
  (p) => p.key === 'unified-scroll-bar-setup'
)!;

export function ScrollProgress() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Unified Scroll Bar
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {componentPattern.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-2xl items-start gap-4">
        {/* Live demo with toggles */}
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={componentPattern.code} language="tsx" />
          }
        >
          <div>ตัวอย่าง Code UnifiedScrollBar </div>
        </PatternCard>

        {/* Helper utility */}
        <PatternCard
          codeSlot={<CodeBlockShiki code={helperPattern.code} language="tsx" />}
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{helperPattern.title}</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  ORIENTATION_CONFIG
                </code>{' '}
                — config สำหรับ vertical/horizontal (classes, axis, scale)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  createParticles()
                </code>{' '}
                — สร้าง particles ด้วย counter id (ไม่ collision)
              </li>
            </ul>
          </div>
        </PatternCard>

        {/* Setup guide */}
        <PatternCard
          codeSlot={<CodeBlockShiki code={setupPattern.code} language="tsx" />}
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{setupPattern.title}</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  globals.css
                </code>{' '}
                — ซ่อน native scrollbar + เพิ่ม scroll color token
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  layout.tsx
                </code>{' '}
                — ใส่{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  &lt;UnifiedScrollBar /&gt;
                </code>{' '}
                ก่อนปิด body
              </li>
              <li>
                ปรับ props ได้:{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  orientation
                </code>
                ,{' '}
                <code className="rounded bg-muted px-1 text-xs">features</code>,{' '}
                <code className="rounded bg-muted px-1 text-xs">hueRange</code>,{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  containerRef
                </code>
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
