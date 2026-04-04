'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Heart, MousePointer2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SPRING_CONFIG = { stiffness: 150, damping: 15 };

export function CursorFollowerPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'dot' | 'icon'>('dot');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, SPRING_CONFIG);
  const y = useSpring(mouseY, SPRING_CONFIG);

  const size = mode === 'icon' ? 40 : 32;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - size / 2);
      mouseY.set(e.clientY - rect.top - size / 2);
    },
    [mouseX, mouseY, size]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          onClick={() => setMode('dot')}
          className={cn(
            'rounded-md px-3 py-1 text-xs font-medium transition-colors',
            mode === 'dot'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          Dot
        </Button>
        <Button
          onClick={() => setMode('icon')}
          className={cn(
            'rounded-md px-3 py-1 text-xs font-medium transition-colors',
            mode === 'icon'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          Icon
        </Button>
      </div>

      <div
        ref={containerRef}
        data-cursor-zone
        className="relative flex h-50 w-96 cursor-none items-center justify-center overflow-hidden rounded-lg border bg-muted/30"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MousePointer2 className="h-4 w-4" />
          <span>Move your mouse here</span>
        </div>

        <motion.div
          style={{ x, y, width: size, height: size }}
          className={cn(
            'pointer-events-none absolute left-0 top-0 z-50',
            'flex items-center justify-center',
            mode === 'dot' && 'rounded-full bg-primary/50'
          )}
        >
          {mode === 'icon' && (
            <Heart className="h-6 w-6 fill-red-500 text-red-500" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
