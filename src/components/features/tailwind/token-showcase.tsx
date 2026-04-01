import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { CopyButton } from '@/components/tailwind/copy-button';
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

// ===== Section: Setup Steps (Step 1-3) =====

function SetupStepsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธี Setup Semantic Tokens
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          3 ขั้นตอน: กำหนด CSS Variable → Register ใน @theme inline → ใช้ใน
          Component
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
            <CodeBlockShiki code={step.code} language="css" />
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
          สร้าง class ใหม่ที่ทำงานเหมือน built-in — ใช้กับ gradient, component
          base, complex styles
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
            <CodeBlockShiki code={UTILITY_SETUP_STEP.code} language="css" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              ใช้ใน Component:
            </p>
            <CodeBlockShiki code={UTILITY_SETUP_STEP.usage} language="tsx" />
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
                  <CodeBlockShiki code={gradient.cssVar} language="css" />
                </div>

                {/* @utility */}
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    2. สร้าง @utility:
                  </p>
                  <CodeBlockShiki code={gradient.utilityCode} language="css" />
                </div>

                {/* Usage class */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">ใช้:</span>
                  <CopyButton code={gradient.usageClass} />
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
              <CodeBlockShiki code={item.value} />
              <div className="space-y-1 text-xs">
                <p className="text-green-600 dark:text-green-400">
                  + {item.pros}
                </p>
                <p className="text-red-500 dark:text-red-400">- {item.cons}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ===== Main Component (Server) =====

export function TokenShowcase() {
  return (
    <div className="space-y-12">
      <SetupStepsSection />
      <UtilitySection />
      <ColorFormatSection />
    </div>
  );
}
