'use client';

import { useState } from 'react';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type PatternCardProps = {
  children: React.ReactNode;
  codeSlot: React.ReactNode;
};

export function PatternCard({ children, codeSlot }: PatternCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-center p-6">{children}</div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="border-t px-4 py-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Code className="size-3.5" />
              {open ? 'Hide Code' : 'View Code'}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="border-t px-4 py-3">{codeSlot}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
