import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CURSOR_ANIMATION_PATTERNS } from '@/constants/custom-patterns/cursor-animation.constant';

const sourcePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'neon-cursor-source',
)!;
const usagePattern = CURSOR_ANIMATION_PATTERNS.find(
  (p) => p.key === 'neon-cursor-usage',
)!;

export function NeonCursor() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Neon Cursor</h2>
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
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{sourcePattern.title}</p>
            <p>
              ลอง effect ได้เลย — neon cursor ทำงานทั้งหน้านี้
            </p>
          </div>
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
                สีเปลี่ยนได้ที่{' '}
                <code className="rounded bg-muted px-1 text-xs">
                  globals.css
                </code>{' '}
                — cursor tokens (auto dark/light)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  data-cursor-zone
                </code>{' '}
                — ซ่อน neon ใน preview boxes
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  PageNeonCursor
                </code>{' '}
                — ครอบ page content ใน Server Component ได้
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
