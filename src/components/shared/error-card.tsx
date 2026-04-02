'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ColumnFade } from '@/components/framer-motion/fade';
import { shake } from '@/lib/framer-motion/framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorCardProps = {
  title?: string;
  description?: string;
  statusCode?: number;
  onRetry?: () => void;
  className?: string;
};

export function ErrorCard({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  statusCode,
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 text-center',
        className
      )}
    >
      <ColumnFade variant={shake} delay={0}>
        <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
      </ColumnFade>
      {statusCode && (
        <ColumnFade delay={0.05}>
          <span className="text-4xl font-bold text-destructive">
            {statusCode}
          </span>
        </ColumnFade>
      )}
      <ColumnFade delay={0.1}>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </ColumnFade>
      {onRetry && (
        <ColumnFade delay={0.2}>
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
        </ColumnFade>
      )}
    </div>
  );
}
