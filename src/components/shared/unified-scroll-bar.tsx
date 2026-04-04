'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import {
  createParticles,
  ORIENTATION_CONFIG,
  type Particle,
  type ScrollBarOrientation,
} from '@/utils/scroll-bar.helper';

type ScrollBarFeatures = {
  bubbles?: boolean;
  gradient?: boolean;
};

type UnifiedScrollBarProps = {
  orientation?: ScrollBarOrientation;
  features?: ScrollBarFeatures;
  containerRef?: React.RefObject<HTMLElement | null>;
  springConfig?: { stiffness?: number; damping?: number; restDelta?: number };
  hueRange?: [number, number];
  className?: string;
};

const DEFAULT_SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };
const THROTTLE_MS = 50;
const PARTICLE_LIFETIME_MS = 600;

export function UnifiedScrollBar({
  orientation = 'vertical',
  features = {},
  containerRef,
  springConfig,
  hueRange = [0, 120],
  className,
}: UnifiedScrollBarProps) {
  const { bubbles = true, gradient = true } = features;
  const config = ORIENTATION_CONFIG[orientation];
  const spring = { ...DEFAULT_SPRING, ...springConfig };
  const isContainer = !!containerRef;

  // --- Scroll tracking ---
  const scrollOptions = useMemo(
    () => (containerRef ? { container: containerRef } : undefined),
    [containerRef],
  );
  const { scrollYProgress } = useScroll(scrollOptions);
  const scaleProgress = useSpring(scrollYProgress, spring);

  // --- Gradient (hooks always called — rules of hooks) ---
  const hue = useTransform(scrollYProgress, [0, 1], hueRange);
  const gradientBg = useTransform(
    hue,
    (h) =>
      `linear-gradient(${config.gradientDirection}, hsl(${h}, 80%, 55%), hsl(${h + 60}, 80%, 55%))`,
  );

  // --- Particles (throttled + cleanup) ---
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const spawnParticles = useCallback(
    (progress: number) => {
      if (!bubbles) return;

      const now = Date.now();
      if (now - lastSpawnRef.current < THROTTLE_MS) return;
      lastSpawnRef.current = now;

      const size = isContainer
        ? config.getContainerSize(containerRef?.current ?? null)
        : config.getWindowSize();

      const newParticles = createParticles(progress, size);
      const ids = new Set(newParticles.map((p) => p.id));

      setParticles((prev) => [...prev, ...newParticles]);

      const timeout = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
        timeoutsRef.current.delete(timeout);
      }, PARTICLE_LIFETIME_MS);

      timeoutsRef.current.add(timeout);
    },
    [bubbles, isContainer, containerRef, config],
  );

  useEffect(() => {
    const refs = timeoutsRef.current;
    return () => {
      refs.forEach(clearTimeout);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', spawnParticles);

  // --- Position strategy ---
  const barPositionClass = isContainer ? 'sticky' : 'fixed';
  const barClasses = isContainer
    ? config.stickyBarClasses
    : config.fixedBarClasses;
  const particlePositionClass = isContainer ? 'absolute' : 'fixed';

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          [config.scaleProperty]: scaleProgress,
          transformOrigin: config.transformOrigin,
          ...(gradient ? { background: gradientBg } : {}),
        }}
        className={cn(
          barPositionClass,
          barClasses,
          !gradient && 'bg-scroll',
          'z-50',
          className,
        )}
      />
      {/* Particles */}
      {bubbles &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, [config.particleDriftKey]: 0, scale: 1 }}
            animate={{
              opacity: 0,
              [config.particleDriftKey]: p.offset,
              scale: 0.5,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn(
              particlePositionClass,
              config.particleAnchorClass,
              'z-50 rounded-full pointer-events-none',
              gradient ? 'bg-primary/60' : 'bg-scroll/60',
            )}
            style={{
              [config.particlePositionKey]: p.position,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
    </>
  );
}
