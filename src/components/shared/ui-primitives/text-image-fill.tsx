'use client';

import type { TextImageFillProps } from '@/types/text.type';
import { cn } from '@/lib/utils';

export function TextImageFill({ text, imageSrc, className }: TextImageFillProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-cover bg-center',
        className,
      )}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {text}
    </span>
  );
}
