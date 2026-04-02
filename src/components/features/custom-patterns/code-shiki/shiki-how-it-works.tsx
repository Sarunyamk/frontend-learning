import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CODE_SHIKI_HOW_IT_WORKS } from '@/constants/custom-patterns/code-shiki.constant';

export function ShikiHowItWorks() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          หลักการทำงาน
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Server-side highlighting → ส่ง HTML สำเร็จรูปไป client — ไม่มี JS
          bundle สำหรับ syntax highlighting
        </p>
      </div>

      {/* Data Flow */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Data Flow</CardTitle>
          <CardDescription>
            highlight เกิดบน server ทั้งหมด — client ได้รับแค่ HTML
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlockShiki
            code={CODE_SHIKI_HOW_IT_WORKS.flow}
            language="bash"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Responsive Theme Alternative */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              Alternative: Responsive Theme
            </CardTitle>
            <CardDescription>
              code block เปลี่ยนสีตาม app theme (light/dark)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki
              code={CODE_SHIKI_HOW_IT_WORKS.responsive}
              language="css"
            />
          </CardContent>
        </Card>

        {/* Available Themes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Themes ที่แนะนำ</CardTitle>
            <CardDescription>
              เปลี่ยน theme ได้ใน lib/shiki.ts → themes array
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki
              code={CODE_SHIKI_HOW_IT_WORKS.themes}
              language="bash"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
