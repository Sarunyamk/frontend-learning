import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { ANIMATION_PRESETS } from '@/constants/framer-motion.constant';
import { StaggerContainer, StaggerItem } from '@/components/shared/framer-motion/stagger';

import { PresetCard } from './preset-card';

export function AnimationExamples() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Animation Presets
      </h2>
      <p className="text-sm text-muted-foreground">
        แต่ละ preset พร้อม live demo — กด replay เพื่อดูซ้ำ
      </p>
      <StaggerContainer className="grid gap-6 md:grid-cols-2">
        {ANIMATION_PRESETS.map((preset) => (
          <StaggerItem key={preset.name}>
            <PresetCard
              preset={preset}
              codeSlot={
                <>
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                      Variant
                    </p>
                    <CodeBlockShiki
                      code={preset.variantCode}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                      Usage
                    </p>
                    <CodeBlockShiki code={preset.usageCode} language="tsx" />
                  </div>
                </>
              }
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
