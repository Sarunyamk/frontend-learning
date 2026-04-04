'use client';

import { useTypeAnimation } from '@/hooks/useTypeAnimation';
import type { TextTypeAnimationProps } from '@/types/text.type';
import { cn } from '@/lib/utils';

export function TextTypeAnimation({
  items,
  typingSpeed,
  deletingSpeed,
  cursor = true,
  className,
}: TextTypeAnimationProps) {
  const displayText = useTypeAnimation({ items, typingSpeed, deletingSpeed });

  return (
    <span className={cn('inline-block', className)}>
      {displayText}
      {cursor && (
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-current">
          &nbsp;
        </span>
      )}
    </span>
  );
}
