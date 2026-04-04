'use client';

import { MousePointer2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export function CursorSpotlightPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const enter = () => setIsInside(true);
    const leave = () => setIsInside(false);

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      data-cursor-zone
      className="relative flex h-50 w-96 cursor-none items-center justify-center overflow-hidden rounded-lg border bg-card"
    >
      {/* Hidden content revealed by spotlight */}
      <div className="grid grid-cols-3 gap-3 p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-14 items-center justify-center rounded-md bg-primary/20 text-xs font-medium text-primary"
          >
            Card {i + 1}
          </div>
        ))}
      </div>

      {/* Hint */}
      {!isInside && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MousePointer2 className="h-4 w-4" />
            <span>Hover to reveal</span>
          </div>
        </div>
      )}

      {/* Spotlight overlay */}
      {isInside && (
        <div
          className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`,
          }}
        />
      )}
    </div>
  );
}
