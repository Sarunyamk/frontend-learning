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
import { FORM_READY_TO_USE_CODES_PATTERN1 } from '@/constants/form-ready-to-use-pattern1.constant';
import { ChevronRight } from 'lucide-react';

export function FormReadyToUse() {
  return (
    <div className="space-y-3">
      {FORM_READY_TO_USE_CODES_PATTERN1.map((item) => (
        <Collapsible key={item.name}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="hover-scale">
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform [[data-state=open]>div>&]:rotate-90" />
                  <div className="min-w-0">
                    <CardTitle className="font-mono text-sm">
                      {item.name}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <p className="font-mono text-xs text-muted-foreground/60">
                      {item.filePath}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                    Component
                  </p>
                  <CodeBlockShiki code={item.code} language="typescript" />
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                    Usage
                  </p>
                  <CodeBlockShiki code={item.usageCode} language="tsx" />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}
