import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TOAST_INSTALL_SECTIONS
} from '@/constants/custom-patterns/setup-install-pattern';

export function ToastSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง shadcn-ui และ dependencies ที่จำเป็นสำหรับ Toast (sonner) ด้วย
        </p>
      </div>

      {TOAST_INSTALL_SECTIONS.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-base">{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki code={section.code} language={section.language} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
