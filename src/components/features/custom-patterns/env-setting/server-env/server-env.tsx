import { PatternCard } from '@/components/shared/ui-primitives/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { ENV_SETTING_PATTERNS } from '@/constants/custom-patterns/env-setting.constant';
import { ServerEnvPreview } from './server-env-preview';

const pattern = ENV_SETTING_PATTERNS.find((p) => p.key === 'server-env')!;

export function ServerEnv() {
  return (
    <section className="space-y-4 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {pattern.title}
        </h2>
        <p className="text-sm text-muted-foreground">{pattern.description}</p>
      </div>
      <div className="mx-auto grid max-w-2xl items-start gap-4">
        <PatternCard
          codeSlot={<CodeBlockShiki code={pattern.code} language="tsx" />}
        >
          <ServerEnvPreview />
        </PatternCard>
      </div>
    </section>
  );
}
