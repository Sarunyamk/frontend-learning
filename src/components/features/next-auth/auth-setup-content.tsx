import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AUTH_SETUP_SECTIONS } from '@/constants/next-auth.constant';

export function AuthSetupContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Auth.js v5 Setup Guide
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ขั้นตอนการ setup Auth.js v5 กับ Next.js App Router — Credentials
          provider + JWT strategy
        </p>
      </div>

      {AUTH_SETUP_SECTIONS.map((section) => (
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
