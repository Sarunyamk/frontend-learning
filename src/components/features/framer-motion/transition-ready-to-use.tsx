import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  TRANSITION_EXAMPLES,
  TRANSITION_READY_TO_USE_CODES,
} from '@/constants/framer-motion.constant';
import { ROUTES } from '@/constants/route.constant';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function TransitionReadyToUse() {
  return (
    <div className="space-y-10">
      {/* Ready to Use */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Ready to Use</h2>
        <p className="text-sm text-muted-foreground">
          Copy ไปใช้ได้เลย — fadeSlide variant + StepTransition component
        </p>
        <div className="space-y-3">
          {TRANSITION_READY_TO_USE_CODES.map((item) => (
            <Collapsible key={item.name}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer select-none transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform [[data-state=open]>div>&]:rotate-90" />
                      <div className="min-w-0">
                        <CardTitle className="text-sm">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <p className="font-mono text-xs text-muted-foreground/60">
                          {item.filePath}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <CodeBlockShiki code={item.code} language="typescript" />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Used in Project */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Used in Project
        </h2>
        <p className="text-sm text-muted-foreground">
          AnimatePresence ถูกใช้จริงในโปรเจกต์นี้ — กดเพื่อดูตัวอย่าง
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Multi-step Form</CardTitle>
              <CardDescription>
                เปลี่ยน step แล้ว content slide เข้า-ออก ด้วย StepTransition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href={ROUTES.FORMS_MULTI_STEP}>
                  ดูตัวอย่าง
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Image Upload</CardTitle>
              <CardDescription>
                Preview รูปมี fade + scale animation เมื่อเพิ่มหรือลบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href={ROUTES.FORMS_UPLOAD}>
                  ดูตัวอย่าง
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Code Examples</h2>
        <div className="space-y-6">
          {TRANSITION_EXAMPLES.map((example) => (
            <Card key={example.name}>
              <CardHeader>
                <CardTitle className="text-sm">{example.name}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlockShiki code={example.code} language="tsx" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
