import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FONT_SETTING_HOW_IT_WORKS } from '@/constants/custom-patterns/font-setting.constant';

export function FontHowItWorks() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          หลักการทำงาน
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          next/font optimize font loading ให้ทั้งหมด — self-host, preload, zero
          layout shift
        </p>
      </div>

      {/* Data Flow */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Data Flow</CardTitle>
          <CardDescription>
            lib/fonts.ts → layout.tsx → globals.css → component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlockShiki
            code={FONT_SETTING_HOW_IT_WORKS.flow}
            language="bash"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* next/font vs @import */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              next/font vs @import
            </CardTitle>
            <CardDescription>
              ทำไมห้ามใช้ @import url() ใน CSS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki
              code={FONT_SETTING_HOW_IT_WORKS.comparison}
              language="css"
            />
          </CardContent>
        </Card>

        {/* Semantic Token Pattern */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Semantic Token Pattern</CardTitle>
            <CardDescription>
              แยก &quot;font ตัวไหน&quot; ออกจาก &quot;ใช้ที่ไหน&quot; —
              เปลี่ยน font แก้ที่เดียว
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlockShiki
              code={FONT_SETTING_HOW_IT_WORKS.semanticTokens}
              language="typescript"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
