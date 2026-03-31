import { CodeBlock } from '@/components/tailwind/code-block';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { THEME_SETUP_STEPS } from '@/constants/tailwind.constant';

// ===== Section: Setup Steps =====

function SetupStepsSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธี Setup Dark/Light Theme
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          5 ขั้นตอน: install → @custom-variant → provider → layout → toggle
        </p>
      </div>

      {THEME_SETUP_STEPS.map((step) => (
        <Card key={step.step}>
          <CardHeader>
            <CardTitle className="text-base">
              Step {step.step}: {step.title}
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={step.code}
              language={step.step === 1 ? 'bash' : 'tsx'}
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

// ===== Section: How it works =====

function HowItWorksSection() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          หลักการทำงาน
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          next-themes เพิ่ม class &quot;dark&quot; บน &lt;html&gt; → CSS
          variable เปลี่ยนค่า → สีทั้ง app เปลี่ยนอัตโนมัติ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Light Mode (:root)</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`:root {
  --background: oklch(1 0 0);        /* ขาว */
  --foreground: oklch(0.145 0 0);    /* ดำ */
  --primary: oklch(0.205 0 0);       /* ดำเข้ม */
  --card: oklch(1 0 0);              /* ขาว */
  --muted: oklch(0.97 0 0);          /* เทาอ่อน */
}`}
              language="css"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dark Mode (.dark)</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`.dark {
  --background: oklch(0.145 0 0);    /* ดำ */
  --foreground: oklch(0.985 0 0);    /* ขาว */
  --primary: oklch(0.922 0 0);       /* ขาวอ่อน */
  --card: oklch(0.205 0 0);          /* ดำอ่อน */
  --muted: oklch(0.269 0 0);         /* เทาเข้ม */
}`}
              language="css"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <CodeBlock
            code={`<!-- Light mode -->
<html lang="en">  <!-- ไม่มี class dark -->

<!-- Dark mode — next-themes เพิ่ม class อัตโนมัติ -->
<html lang="en" class="dark">

<!-- Component ใช้ class เดิม — สีเปลี่ยนตาม CSS variable -->
<div className="bg-background text-foreground">
  <!-- light: พื้นขาว ตัวอักษรดำ -->
  <!-- dark:  พื้นดำ ตัวอักษรขาว -->
</div>`}
            language="html"
          />
        </CardContent>
      </Card>
    </section>
  );
}

// ===== Main Component (Server) =====

export function ThemeSetupGuide() {
  return (
    <div className="space-y-12">
      <SetupStepsSection />
      <HowItWorksSection />
    </div>
  );
}
