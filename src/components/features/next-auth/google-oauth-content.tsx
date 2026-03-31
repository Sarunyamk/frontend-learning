import { CodeBlock } from '@/components/tailwind/code-block';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GOOGLE_OAUTH_SECTIONS } from '@/constants/next-auth.constant';

export function GoogleOAuthContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Google OAuth Setup Guide
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ขั้นตอนการเพิ่ม Google OAuth provider — สร้าง credentials, config,
          sign-in button
        </p>
      </div>

      {GOOGLE_OAUTH_SECTIONS.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-base">{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={section.code} language={section.language} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
