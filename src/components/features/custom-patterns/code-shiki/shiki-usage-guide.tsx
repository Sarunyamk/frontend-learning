import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CODE_SHIKI_USAGE_EXAMPLES } from '@/constants/custom-patterns/code-shiki.constant';

export function ShikiUsageGuide() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          วิธีใช้งาน
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ตัวอย่างการใช้ CodeBlockShiki ในหลาย scenario — copy-paste ไปใช้ได้เลย
        </p>
      </div>

      {CODE_SHIKI_USAGE_EXAMPLES.map((example) => (
        <Card key={example.key}>
          <CardHeader>
            <CardTitle className="text-base">{example.title}</CardTitle>
            <CardDescription>{example.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki code={example.code} language={example.language} />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
