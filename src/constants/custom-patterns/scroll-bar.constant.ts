export type ScrollBarPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const SCROLL_BAR_PATTERNS: readonly ScrollBarPattern[] = [
  {
    key: 'unified-scroll-bar',
    title: 'UnifiedScrollBar — Component',
    description:
      'Scroll bar component ที่รวม bubble particles + gradient ไว้ในตัวเดียว — เลือก orientation, เปิด/ปิด features ผ่าน props',
    code: `'use client';

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

type UnifiedScrollBarProps = {
  orientation?: ScrollBarOrientation;  // 'vertical' | 'horizontal'
  features?: { bubbles?: boolean; gradient?: boolean };
  containerRef?: React.RefObject<HTMLElement | null>;
  springConfig?: { stiffness?: number; damping?: number; restDelta?: number };
  hueRange?: [number, number];
  className?: string;
};

const DEFAULT_SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };
const THROTTLE_MS = 50;          // ← throttle ป้องกัน setState รัว
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

  // Scroll tracking — page-level หรือ container
  const scrollOptions = useMemo(
    () => (containerRef ? { container: containerRef } : undefined),
    [containerRef],
  );
  const { scrollYProgress } = useScroll(scrollOptions);
  const scaleProgress = useSpring(scrollYProgress, spring);

  // Gradient — hooks เรียกเสมอ (rules of hooks)
  const hue = useTransform(scrollYProgress, [0, 1], hueRange);
  const gradientBg = useTransform(hue, (h) =>
    \`linear-gradient(\${config.gradientDirection}, hsl(\${h}, 80%, 55%), hsl(\${h + 60}, 80%, 55%))\`
  );

  // Particles — throttled + timeout cleanup
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const spawnParticles = useCallback((progress: number) => {
    if (!bubbles) return;
    const now = Date.now();
    if (now - lastSpawnRef.current < THROTTLE_MS) return;  // ← throttle
    lastSpawnRef.current = now;

    const size = isContainer
      ? config.getContainerSize(containerRef?.current ?? null)
      : config.getWindowSize();
    const newParticles = createParticles(progress, size);
    const ids = new Set(newParticles.map((p) => p.id));   // ← O(1) lookup

    setParticles((prev) => [...prev, ...newParticles]);
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)));
      timeoutsRef.current.delete(timeout);
    }, PARTICLE_LIFETIME_MS);
    timeoutsRef.current.add(timeout);
  }, [bubbles, isContainer, containerRef, config]);

  // ← Cleanup ป้องกัน memory leak
  useEffect(() => {
    const refs = timeoutsRef.current;
    return () => { refs.forEach(clearTimeout); };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', spawnParticles);

  // Position: fixed (page) vs sticky/absolute (container)
  const barPosition = isContainer ? 'sticky' : 'fixed';
  const barClasses = isContainer ? config.stickyBarClasses : config.fixedBarClasses;
  const particlePosition = isContainer ? 'absolute' : 'fixed';

  return (
    <>
      <motion.div
        style={{
          [config.scaleProperty]: scaleProgress,
          transformOrigin: config.transformOrigin,
          ...(gradient ? { background: gradientBg } : {}),
        }}
        className={cn(barPosition, barClasses, !gradient && 'bg-scroll', 'z-50', className)}
      />
      {bubbles && particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.9, [config.particleDriftKey]: 0, scale: 1 }}
          animate={{ opacity: 0, [config.particleDriftKey]: p.offset, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={cn(
            particlePosition, config.particleAnchorClass,
            'z-50 rounded-full pointer-events-none',
            gradient ? 'bg-primary/60' : 'bg-scroll/60',
          )}
          style={{ [config.particlePositionKey]: p.position, width: p.size, height: p.size }}
        />
      ))}
    </>
  );
}`,
  },
  {
    key: 'unified-scroll-bar-helper',
    title: 'UnifiedScrollBar — Helper',
    description:
      'Pure utility: Particle type, orientation config (vertical/horizontal), createParticles function ที่ใช้ counter แทน Math.random()',
    code: `// utils/scroll-bar.helper.ts

export type Particle = {
  id: number;
  position: number;  // ตำแหน่งตามแกน bar
  size: number;
  offset: number;    // drift ตั้งฉากกับ bar
};

export type ScrollBarOrientation = 'vertical' | 'horizontal';

export type OrientationConfig = {
  scaleProperty: 'scaleY' | 'scaleX';
  transformOrigin: string;
  fixedBarClasses: string;     // page-level (fixed)
  stickyBarClasses: string;    // container-level (sticky)
  particleAnchorClass: string;
  particlePositionKey: 'top' | 'left';
  particleDriftKey: 'x' | 'y';
  gradientDirection: string;
  getContainerSize: (el: HTMLElement | null) => number;
  getWindowSize: () => number;
};

export const ORIENTATION_CONFIG: Record<ScrollBarOrientation, OrientationConfig> = {
  vertical: {
    scaleProperty: 'scaleY',
    transformOrigin: 'top',
    fixedBarClasses: 'top-0 right-0 bottom-0 w-2 rounded-full',
    stickyBarClasses: 'top-0 float-right h-full w-2 rounded-full',
    particleAnchorClass: 'right-0.5',
    particlePositionKey: 'top',
    particleDriftKey: 'x',
    gradientDirection: '180deg',
    getContainerSize: (el) => el?.clientHeight ?? 0,
    getWindowSize: () => window.innerHeight,
  },
  horizontal: {
    scaleProperty: 'scaleX',
    transformOrigin: 'left',
    fixedBarClasses: 'top-0 left-0 right-0 h-1.5 rounded-full',
    stickyBarClasses: 'top-0 h-1.5 rounded-full w-full',
    particleAnchorClass: 'top-0',
    particlePositionKey: 'left',
    particleDriftKey: 'y',
    gradientDirection: '90deg',
    getContainerSize: (el) => el?.clientWidth ?? 0,
    getWindowSize: () => window.innerWidth,
  },
};

// ใช้ counter แทน Math.random() — ไม่มีวัน collision
let idCounter = 0;

export function createParticles(
  progress: number,
  containerSize: number,
): Particle[] {
  const position = progress * containerSize;
  const count = Math.floor(Math.random() * 2) + 1;

  return Array.from({ length: count }, () => ({
    id: ++idCounter,
    position,
    size: Math.random() * 6 + 4,
    offset: (Math.random() - 0.5) * 40,
  }));
}`,
  },
  {
    key: 'unified-scroll-bar-setup',
    title: 'UnifiedScrollBar — Setup & Usage',
    description:
      'ขั้นตอนการ setup: globals.css + layout.tsx + ตัวอย่าง props ต่างๆ',
    code: `/* ===== Step 1: globals.css — ซ่อน native scrollbar ===== */

html,
body {
  overflow-y: auto;
  scrollbar-width: none;  /* Firefox */
}


/* ===== Step 2: globals.css — เพิ่ม scroll color token ===== */

@theme inline {
  --color-scroll: var(--scroll);
}

:root {
  --scroll: oklch(67.766% 0.11932 252.688);  /* light */
}
.dark {
  --scroll: oklch(61.088% 0.15961 254.388);  /* dark */
}


/* ===== Step 3: layout.tsx — ใส่ component (page-level) ===== */

import { UnifiedScrollBar } from '@/components/shared/unified-scroll-bar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <UnifiedScrollBar />
      </body>
    </html>
  );
}


/* ===== Usage Examples ===== */

// Default — vertical, bubble + gradient, page-level
<UnifiedScrollBar />

// Bubble only (ไม่มี gradient) — เหมือน BubbleScrollIndicator เดิม
<UnifiedScrollBar features={{ gradient: false }} />

// Horizontal bar — แถบบน
<UnifiedScrollBar orientation="horizontal" />

// Container-scoped — ใช้ใน scrollable container
const ref = useRef<HTMLDivElement>(null);
<div ref={ref} className="relative h-[400px] overflow-y-auto">
  <UnifiedScrollBar containerRef={ref} />
  {/* content */}
</div>

// Custom gradient range — เปลี่ยนช่วงสี
<UnifiedScrollBar hueRange={[200, 320]} />

// Custom spring — เปลี่ยนความนุ่มของ animation
<UnifiedScrollBar springConfig={{ stiffness: 200, damping: 50 }} />`,
  },
];
