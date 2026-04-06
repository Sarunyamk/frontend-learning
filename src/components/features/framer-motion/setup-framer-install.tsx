import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FRAMER_INSTALL_SECTIONS } from '@/constants/framer-motion.constant';

export function FramerMotionSetupInstall() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ติดตั้ง framer-motion และ dependencies ที่จำเป็นสำหรับสร้าง animation
          ด้วย framer-motion
        </p>
      </div>

      {FRAMER_INSTALL_SECTIONS.map((section) => (
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
