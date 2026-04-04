import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BACKGROUND_ANIMATION_PATTERNS } from '@/constants/custom-patterns/background-animation.constant';

import { FloatingParticlesPreview } from './floating-particles-preview';

const sourcePattern = BACKGROUND_ANIMATION_PATTERNS.find(
  (p) => p.key === 'floating-particles-source'
)!;
const usagePattern = BACKGROUND_ANIMATION_PATTERNS.find(
  (p) => p.key === 'floating-particles-usage'
)!;

export function FloatingParticles() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Floating Particles
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {sourcePattern.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={<CodeBlockShiki code={sourcePattern.code} language="tsx" />}
        >
          <FloatingParticlesPreview />
        </PatternCard>

        <PatternCard
          codeSlot={<CodeBlockShiki code={usagePattern.code} language="tsx" />}
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{usagePattern.title}</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <code className="rounded bg-muted px-1 text-xs">count</code> —
                จำนวน particles (default: 30)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">sizeRange</code>{' '}
                — [min, max] ขนาด particle (px)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  speedRange
                </code>{' '}
                — [min, max] duration animation (s)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  particleClass
                </code>{' '}
                — Tailwind class สำหรับสี เช่น &apos;bg-brand-100/30&apos;
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">
                  floatDistance
                </code>{' '}
                — ระยะลอยขึ้น-ลง (px)
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
