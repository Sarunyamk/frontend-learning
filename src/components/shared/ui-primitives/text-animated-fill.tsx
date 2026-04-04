'use client';

import type { TextAnimatedFillProps, TextAnimatedFillSpeed } from '@/types/text.type';
import { cn } from '@/lib/utils';

const SPEED_DURATION: Record<TextAnimatedFillSpeed, string> = {
  slow: '15s',
  normal: '8s',
  fast: '6s',
};

export function TextAnimatedFill({
  text,
  imageSrc,
  speed = 'normal',
  className,
}: TextAnimatedFillProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-size-[200%_200%]',
        className,
      )}
      style={{
        backgroundImage: `url(${imageSrc})`,
        animation: `text-bg-pan ${SPEED_DURATION[speed]} linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes text-bg-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}
