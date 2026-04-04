import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { NAV_LINK_PATTERNS } from '@/constants/custom-patterns/nav-link.constant';

const pattern = NAV_LINK_PATTERNS.find((p) => p.key === 'nav-link')!;

export function NavLinkSourceDemo() {
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
          <div className="space-y-2 text-center text-sm text-muted-foreground">
            <p>
              Reusable component — import แล้วใช้ได้เลย ดู variant
              ตัวอย่างด้านล่าง
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <code className="rounded bg-muted px-2 py-1">default</code>
              <code className="rounded bg-muted px-2 py-1">underline</code>
              <code className="rounded bg-muted px-2 py-1">highlight</code>
              <code className="rounded bg-muted px-2 py-1">animated</code>
            </div>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
