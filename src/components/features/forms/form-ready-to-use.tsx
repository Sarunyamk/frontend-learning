'use client';

import { FORM_READY_TO_USE_CODES } from '@/constants/form-ready-to-use.constant';
import { CodeBlock } from '@/components/tailwind/code-block';
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
import { ChevronRight } from 'lucide-react';

export function FormReadyToUse() {
  return (
    <div className="space-y-3">
      {FORM_READY_TO_USE_CODES.map((item) => (
        <Collapsible key={item.name}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer select-none transition-colors hover:bg-muted/50">
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
                  <CodeBlock code={item.code} language="typescript" />
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                    Usage
                  </p>
                  <CodeBlock code={item.usageCode} language="tsx" />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}
