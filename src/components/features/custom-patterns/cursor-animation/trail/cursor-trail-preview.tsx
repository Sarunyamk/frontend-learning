'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TrailDot = {
  id: number;
  x: number;
  y: number;
};

let trailIdCounter = 0;
const THROTTLE_MS = 30;
const LIFETIME_MS = 500;
const MAX_DOTS = 20;
const DOT_SIZE = 8;

export function CursorTrailPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<TrailDot[]>([]);
  const [mode, setMode] = useState<'dot' | 'icon'>('dot');
  const lastSpawnRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < THROTTLE_MS) return;
    lastSpawnRef.current = now;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dot: TrailDot = {
      id: ++trailIdCounter,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setDots((prev) => [...prev.slice(-MAX_DOTS + 1), dot]);

    const timeout = setTimeout(() => {
      setDots((prev) => prev.filter((d) => d.id !== dot.id));
      timeoutsRef.current.delete(timeout);
    }, LIFETIME_MS);
    timeoutsRef.current.add(timeout);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    const refs = timeoutsRef.current;
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      refs.forEach(clearTimeout);
    };
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
          Dots
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
          Stars
        </Button>
      </div>

      <div
        ref={containerRef}
        data-cursor-zone
        className="relative flex h-50 w-96 cursor-none items-center justify-center overflow-hidden rounded-lg border bg-muted/30"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MousePointer2 className="h-4 w-4" />
          <span>Move your mouse to see trail</span>
        </div>

        {dots.map((dot) =>
          mode === 'icon' ? (
            <motion.div
              key={dot.id}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: LIFETIME_MS / 1000, ease: 'easeOut' }}
              className="pointer-events-none absolute z-50"
              style={{
                left: dot.x,
                top: dot.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key={dot.id}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: LIFETIME_MS / 1000, ease: 'easeOut' }}
              className="pointer-events-none absolute z-50 rounded-full bg-primary/60"
              style={{
                left: dot.x - DOT_SIZE / 2,
                top: dot.y - DOT_SIZE / 2,
                width: DOT_SIZE,
                height: DOT_SIZE,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
