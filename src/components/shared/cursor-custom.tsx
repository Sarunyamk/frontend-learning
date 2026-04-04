'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

const DOT_SIZE = 12;
const GLOW_SIZE = 28;
const CURSOR_OFFSET_Y = 18;

const EMPTY_SUB = () => () => {};

function useCanHover() {
  return useSyncExternalStore(
    EMPTY_SUB,
    () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return hasHover && !reducedMotion;
    },
    () => false, // SSR → disabled
  );
}

export function CursorCustom({ children }: { children: React.ReactNode }) {
  const enabled = useCanHover();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dot — snappy, almost instant
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 40 });

  // Glow — slightly laggy for depth effect
  const glowX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const isClicked = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const dotScale = useTransform(
    [isClicked, isHovered],
    ([clicked, hovered]: number[]) =>
      clicked ? 0.7 : hovered ? 1.4 : 1,
  );

  const glowScale = useTransform(
    [isClicked, isHovered],
    ([clicked, hovered]: number[]) =>
      clicked ? 0.6 : hovered ? 1.6 : 1,
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY + CURSOR_OFFSET_Y);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    if (!enabled) return;

    const onDown = () => isClicked.set(1);
    const onUp = () => isClicked.set(0);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [enabled, handleMouseMove, isClicked]);

  // Link hover — event delegation on document
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea',
      );
      isHovered.set(target ? 1 : 0);
    };

    document.addEventListener('mouseover', handler);
    return () => document.removeEventListener('mouseover', handler);
  }, [enabled, isHovered]);

  if (!enabled) return <>{children}</>;

  return (
    <>
      {children}

      {/* Glow — outer soft circle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          scale: glowScale,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          marginLeft: -GLOW_SIZE / 2,
          marginTop: -GLOW_SIZE / 2,
          backgroundColor: 'var(--cursor-1)',
          opacity: 0.4,
          filter: 'blur(4px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Dot — inner solid circle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          scale: dotScale,
          width: DOT_SIZE,
          height: DOT_SIZE,
          marginLeft: -DOT_SIZE / 2,
          marginTop: -DOT_SIZE / 2,
          backgroundColor: 'var(--cursor-2)',
          opacity: 0.9,
          boxShadow: '0 0 6px var(--cursor-2)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
