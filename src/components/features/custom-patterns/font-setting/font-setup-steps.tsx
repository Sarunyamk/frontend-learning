import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FONT_SETTING_SETUP_STEPS } from '@/constants/custom-patterns/font-setting.constant';

export function FontSetupSteps() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธี Setup Font ใน Next.js
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          4 ขั้นตอน: สร้าง config → layout → globals.css → ใช้งาน
        </p>
      </div>

      {FONT_SETTING_SETUP_STEPS.map((step) => (
        <Card key={step.step}>
          <CardHeader>
            <CardTitle className="text-base">
              Step {step.step}: {step.title}
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki code={step.code} language={step.language} />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
