'use client';

import { CodeBlock } from '@/components/tailwind/code-block';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  COLOR_FORMAT_EXAMPLES,
  GRADIENT_EXAMPLES,
  TOKEN_SETUP_STEPS,
  UTILITY_SETUP_STEP,
} from '@/constants/tailwind.constant';
import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';

// ===== Copy Badge =====

function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {text}
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 opacity-50" />
      )}
    </button>
  );
}

// ===== Section: Setup Steps (Step 1-3) =====

function SetupStepsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธี Setup Semantic Tokens
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          3 ขั้นตอน: กำหนด CSS Variable → Register ใน @theme inline → ใช้ใน Component
        </p>
      </div>

      {TOKEN_SETUP_STEPS.map((step) => (
        <Card key={step.step}>
          <CardHeader>
            <CardTitle className="text-base">
              Step {step.step}: {step.title}
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={step.code} language="css" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

// ===== Section: @utility (Step 4) =====

function UtilitySection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          @utility — Custom Class ใน Tailwind v4
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          สร้าง class ใหม่ที่ทำงานเหมือน built-in — ใช้กับ gradient, component base, complex styles
        </p>
      </div>

      {/* How to setup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Step {UTILITY_SETUP_STEP.step}: {UTILITY_SETUP_STEP.title}
          </CardTitle>
          <CardDescription>{UTILITY_SETUP_STEP.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              กำหนดใน globals.css:
            </p>
            <CodeBlock code={UTILITY_SETUP_STEP.code} language="css" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              ใช้ใน Component:
            </p>
            <CodeBlock code={UTILITY_SETUP_STEP.usage} language="tsx" />
          </div>
        </CardContent>
      </Card>

      {/* Gradient examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          ตัวอย่าง Gradient ด้วย @utility
        </h3>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {GRADIENT_EXAMPLES.map((gradient) => (
            <Card key={gradient.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{gradient.name}</CardTitle>
                <CardDescription className="text-xs">
                  {gradient.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* CSS Variable */}
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    1. กำหนด CSS Variable:
                  </p>
                  <CodeBlock code={gradient.cssVar} language="css" />
                </div>

                {/* @utility */}
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    2. สร้าง @utility:
                  </p>
                  <CodeBlock code={gradient.utilityCode} language="css" />
                </div>

                {/* Usage class */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">ใช้:</span>
                  <CopyBadge text={gradient.usageClass} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Section: Color Format Comparison =====

function ColorFormatSection() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Color Format เปรียบเทียบ
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          เลือก format ที่เหมาะกับ project — shadcn/ui default ใช้ oklch
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {COLOR_FORMAT_EXAMPLES.map((item) => (
          <Card key={item.format}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wide">
                {item.format}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CodeBlock code={item.value} />
              <div className="space-y-1 text-xs">
                <p className="text-green-600 dark:text-green-400">
                  + {item.pros}
                </p>
                <p className="text-red-500 dark:text-red-400">
                  - {item.cons}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ===== Main Component =====

export function TokenShowcase() {
  return (
    <div className="space-y-12">
      <SetupStepsSection />
      <UtilitySection />
      <ColorFormatSection />
    </div>
  );
}
