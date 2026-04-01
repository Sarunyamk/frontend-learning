import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
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
import { READY_TO_USE_CODES } from '@/constants/framer-motion.constant';
import { ChevronRight } from 'lucide-react';

export function AnimationReadyToUse() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Ready to Use</h2>
      <p className="text-sm text-muted-foreground">
        Copy ไฟล์เหล่านี้ไปใช้ในโปรเจกต์ได้เลย
      </p>
      <div className="space-y-3">
        {READY_TO_USE_CODES.map((item) => (
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
  );
}
