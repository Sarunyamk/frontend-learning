import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BACKGROUND_ANIMATION_PATTERNS } from '@/constants/custom-patterns/background-animation.constant';

import { GradientMeshPreview } from './gradient-mesh-preview';

const sourcePattern = BACKGROUND_ANIMATION_PATTERNS.find(
  (p) => p.key === 'gradient-mesh-source',
)!;
const usagePattern = BACKGROUND_ANIMATION_PATTERNS.find(
  (p) => p.key === 'gradient-mesh-usage',
)!;

export function GradientMesh() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Animated Gradient Mesh
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {sourcePattern.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl items-start gap-4">
        <PatternCard
          codeSlot={
            <CodeBlockShiki code={sourcePattern.code} language="tsx" />
          }
        >
          <GradientMeshPreview />
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
                <code className="rounded bg-muted px-1 text-xs">blobCount</code>{' '}
                — จำนวน gradient blob (2-5)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">speed</code>{' '}
                — slow / medium / fast
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">colors</code>{' '}
                — custom gradient colors (oklch/rgb/hex)
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">blur</code>{' '}
                — blur intensity (px) — ยิ่งสูงยิ่ง soft
              </li>
              <li>
                <code className="rounded bg-muted px-1 text-xs">opacity</code>{' '}
                — opacity ของ mesh layer (0-1)
              </li>
            </ul>
          </div>
        </PatternCard>
      </div>
    </section>
  );
}
