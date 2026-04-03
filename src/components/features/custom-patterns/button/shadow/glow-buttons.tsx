import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { BUTTON_PATTERNS } from '@/constants/custom-patterns/button.constant';

import { CustomButton } from '@/components/shared/custom-button';
import { PatternCard } from '@/components/shared/pattern-card';

const glowPattern = BUTTON_PATTERNS.find((p) => p.key === 'glow')!;
const neonPattern = BUTTON_PATTERNS.find((p) => p.key === 'neon')!;

const GLOW_EXAMPLES = [
  {
    pattern: glowPattern,
    preview: (
      <CustomButton
        className="border-primary bg-transparent text-primary transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5),0_0_30px_rgba(var(--primary-rgb),0.3)]"
        variant="outline"
        label="Glow Button"
      />
    ),
  },
  {
    pattern: neonPattern,
    preview: (
      <CustomButton
        className="border-green-400 bg-transparent text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.4),0_0_20px_rgba(74,222,128,0.2)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.6),0_0_40px_rgba(74,222,128,0.3)]"
        variant="outline"
        label="Neon Button"
      />
    ),
  },
] as const;

export function GlowButtons() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Glow / Neon</h2>
        <p className="text-sm text-muted-foreground">
          ปุ่มเรืองแสง — ใช้ box-shadow หลายชั้น
        </p>
      </div>
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        {GLOW_EXAMPLES.map((example) => (
          <PatternCard
            key={example.pattern.key}
            codeSlot={
              <CodeBlockShiki code={example.pattern.code} language="tsx" />
            }
          >
            {example.preview}
          </PatternCard>
        ))}
      </div>
    </section>
  );
}
