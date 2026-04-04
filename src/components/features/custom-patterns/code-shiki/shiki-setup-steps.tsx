import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CODE_SHIKI_SETUP_STEPS } from '@/constants/custom-patterns/code-shiki.constant';

export function ShikiSetupSteps() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธี Setup Shiki Syntax Highlighting
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          5 ขั้นตอน: install → highlighter → component → copy button → global
          CSS
        </p>
      </div>

      {CODE_SHIKI_SETUP_STEPS.map((step) => (
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
