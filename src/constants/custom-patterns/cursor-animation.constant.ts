export type CursorAnimationPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const CURSOR_ANIMATION_PATTERNS: readonly CursorAnimationPattern[] = [
  {
    key: 'cursor-follower-source',
    title: 'Cursor Follower — Component',
    description:
      'วงกลมที่ลอยตาม mouse ด้วย spring animation — รองรับ children สำหรับใส่ icon หรือ custom element',
    code: `'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CursorFollowerProps = {
  /** Container ref — track mouse ภายใน element นี้ */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Spring config */
  springConfig?: { stiffness?: number; damping?: number };
  /** Size ของ follower (px) */
  size?: number;
  /** Custom content แทน dot — เช่น Lucide icon, emoji */
  children?: ReactNode;
  className?: string;
};

const DEFAULT_SPRING = { stiffness: 150, damping: 15 };

export function CursorFollower({
  containerRef,
  springConfig,
  size = 32,
  children,
  className,
}: CursorFollowerProps) {
  const spring = { ...DEFAULT_SPRING, ...springConfig };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - size / 2);
      mouseY.set(e.clientY - rect.top - size / 2);
    },
    [containerRef, mouseX, mouseY, size],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, handleMouseMove]);

  return (
    <motion.div
      style={{ x, y, width: size, height: size }}
      className={cn(
        'pointer-events-none absolute left-0 top-0 z-50',
        'flex items-center justify-center',
        !children && 'rounded-full bg-primary/50',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}`,
  },
  {
    key: 'cursor-follower-usage',
    title: 'Cursor Follower — Usage',
    description:
      'ตัวอย่างการใช้งาน: default dot, custom icon, custom size + spring',
    code: `import { useRef } from 'react';
import { CursorFollower } from '@/components/cursor/cursor-follower';
import { Heart, MousePointer2, Sparkles } from 'lucide-react';

// === 1. Default — วงกลมตาม mouse ===
function BasicExample() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorFollower containerRef={ref} />
      <p>Move your mouse here</p>
    </div>
  );
}

// === 2. Custom Icon — ใส่ Lucide icon ===
function IconExample() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorFollower containerRef={ref} size={40}>
        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
      </CursorFollower>
    </div>
  );
}

// === 3. Custom Spring — ช้าลง (lag มากขึ้น) ===
function SlowFollower() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorFollower
        containerRef={ref}
        size={48}
        springConfig={{ stiffness: 50, damping: 10 }}
      >
        <Sparkles className="h-8 w-8 text-yellow-400" />
      </CursorFollower>
    </div>
  );
}`,
  },
  {
    key: 'cursor-spotlight-source',
    title: 'Cursor Spotlight — Component',
    description:
      'Overlay มืดที่เปิดเผยเนื้อหาด้วยวงแสง radial-gradient ตรงตำแหน่ง mouse',
    code: `'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type CursorSpotlightProps = {
  /** Container ref — track mouse ภายใน element นี้ */
  containerRef: React.RefObject<HTMLElement | null>;
  /** รัศมีวงแสง (px) */
  radius?: number;
  /** ความเข้มของ overlay (0-1) */
  overlayOpacity?: number;
  className?: string;
};

export function CursorSpotlight({
  containerRef,
  radius = 120,
  overlayOpacity = 0.85,
  className,
}: CursorSpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      });
    },
    [containerRef],
  );

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
  }, [containerRef, handleMouseMove]);

  if (!isInside) return null;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-40 transition-opacity duration-300',
        className,
      )}
      style={{
        background: \`radial-gradient(circle \${radius}px at \${position.x}px \${position.y}px, transparent 0%, rgba(0,0,0,\${overlayOpacity}) 100%)\`,
      }}
    />
  );
}`,
  },
  {
    key: 'cursor-spotlight-usage',
    title: 'Cursor Spotlight — Usage',
    description:
      'ตัวอย่างการใช้งาน: basic reveal, custom radius, card hover spotlight',
    code: `import { useRef } from 'react';
import { CursorSpotlight } from '@/components/cursor/cursor-spotlight';

// === 1. Basic — เปิดเผย text ด้วยวงแสง ===
function BasicSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden bg-card">
      <p className="p-8 text-lg">Secret content revealed by spotlight...</p>
      <CursorSpotlight containerRef={ref} />
    </div>
  );
}

// === 2. Large Radius — วงแสงใหญ่ ===
function LargeSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <img src="/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
      <CursorSpotlight containerRef={ref} radius={200} overlayOpacity={0.9} />
    </div>
  );
}

// === 3. Card Reveal — spotlight บน grid ===
function CardReveal() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative overflow-hidden p-6">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-muted p-4 text-center">
            Card {i + 1}
          </div>
        ))}
      </div>
      <CursorSpotlight containerRef={ref} radius={150} />
    </div>
  );
}`,
  },
  {
    key: 'cursor-trail-source',
    title: 'Cursor Trail — Component',
    description:
      'จุดหลายจุดตาม mouse path แล้ว fade out — รองรับ custom renderDot สำหรับเปลี่ยนเป็น icon/emoji',
    code: `'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TrailDot = {
  id: number;
  x: number;
  y: number;
};

type CursorTrailProps = {
  /** Container ref — track mouse ภายใน element นี้ */
  containerRef: React.RefObject<HTMLElement | null>;
  /** จำนวน dot สูงสุดที่แสดงพร้อมกัน */
  maxDots?: number;
  /** อายุของแต่ละ dot (ms) */
  lifetime?: number;
  /** Throttle (ms) — ยิ่งต่ำ dot ยิ่งถี่ */
  throttleMs?: number;
  /** Size ของ dot (px) */
  dotSize?: number;
  /** Custom render function — เปลี่ยน dot เป็น icon/emoji */
  renderDot?: (dot: TrailDot) => ReactNode;
  className?: string;
};

let trailIdCounter = 0;

export function CursorTrail({
  containerRef,
  maxDots = 20,
  lifetime = 500,
  throttleMs = 30,
  dotSize = 8,
  renderDot,
  className,
}: CursorTrailProps) {
  const [dots, setDots] = useState<TrailDot[]>([]);
  const lastSpawnRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < throttleMs) return;
      lastSpawnRef.current = now;

      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dot: TrailDot = {
        id: ++trailIdCounter,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      setDots((prev) => [...prev.slice(-maxDots + 1), dot]);

      const timeout = setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== dot.id));
        timeoutsRef.current.delete(timeout);
      }, lifetime);
      timeoutsRef.current.add(timeout);
    },
    [containerRef, maxDots, lifetime, throttleMs],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    const refs = timeoutsRef.current;
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      refs.forEach(clearTimeout);
    };
  }, [containerRef, handleMouseMove]);

  return (
    <>
      {dots.map((dot) =>
        renderDot ? (
          <motion.div
            key={dot.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: lifetime / 1000, ease: 'easeOut' }}
            className={cn('pointer-events-none absolute z-50', className)}
            style={{ left: dot.x, top: dot.y, transform: 'translate(-50%, -50%)' }}
          >
            {renderDot(dot)}
          </motion.div>
        ) : (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: lifetime / 1000, ease: 'easeOut' }}
            className={cn(
              'pointer-events-none absolute z-50 rounded-full bg-primary/60',
              className,
            )}
            style={{
              left: dot.x - dotSize / 2,
              top: dot.y - dotSize / 2,
              width: dotSize,
              height: dotSize,
            }}
          />
        ),
      )}
    </>
  );
}`,
  },
  {
    key: 'cursor-trail-usage',
    title: 'Cursor Trail — Usage',
    description:
      'ตัวอย่างการใช้งาน: default dots, emoji trail, icon trail, fast trail',
    code: `import { useRef } from 'react';
import { CursorTrail } from '@/components/cursor/cursor-trail';
import { Star, Sparkles } from 'lucide-react';

// === 1. Default — จุดกลม fade out ===
function BasicTrail() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorTrail containerRef={ref} />
      <p>Move your mouse to see trail</p>
    </div>
  );
}

// === 2. Emoji Trail — ใช้ renderDot ===
function EmojiTrail() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorTrail
        containerRef={ref}
        lifetime={800}
        renderDot={() => <span className="text-lg">✨</span>}
      />
    </div>
  );
}

// === 3. Icon Trail — Lucide icon ===
function IconTrail() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorTrail
        containerRef={ref}
        throttleMs={50}
        lifetime={600}
        renderDot={() => (
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        )}
      />
    </div>
  );
}

// === 4. Fast Dense Trail ===
function FastTrail() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="relative h-[300px] overflow-hidden">
      <CursorTrail
        containerRef={ref}
        throttleMs={16}
        maxDots={40}
        dotSize={6}
        lifetime={400}
      />
    </div>
  );
}`,
  },
  {
    key: 'neon-cursor-source',
    title: 'Neon Cursor — Component (NeonCursor)',
    description:
      'Multi-layer circles + orbiting dots ตาม mouse — ใช้ useMotionValue + useSpring (0 React re-renders) + event delegation + CSS orbit animation — ใช้จริงในหน้านี้',
    code: `'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

// Center circle (static) + 2 inner orbiting circles
const CENTER = { size: 30, opacity: 0.7, blur: 0, color: 'var(--cursor-1)' };

const INNER_ORBITS = [
  { size: 24, opacity: 0.8, blur: 0.5, color: 'var(--cursor-2)', radius: 22, duration: '2s' },
  { size: 18, opacity: 0.9, blur: 1, color: 'var(--cursor-3)', radius: 20, duration: '3s', reverse: true },
] as const;

const ORBIT_SIZES = [60, 80, 100] as const;
const ORBIT_DURATIONS = ['3s', '4s', '5s'] as const;
const CURSOR_OFFSET_Y = 20;

const ORBIT_COLORS = ['bg-cursor-orbit-1', 'bg-cursor-orbit-2', 'bg-cursor-orbit-3'];
const ORBIT_COLOR_VALUES = ['var(--cursor-orbit-1)', 'var(--cursor-orbit-2)', 'var(--cursor-orbit-3)'];

export function NeonCursor({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);
  const [isInPreview, setIsInPreview] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 25 });

  const isClicked = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const scale = useTransform(
    [isClicked, isHovered],
    ([clicked, hovered]: number[]) => (clicked ? 0.8 : hovered ? 1.2 : 1),
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const inPreview = !!(e.target as HTMLElement).closest('[data-cursor-zone]');
    setIsInPreview(inPreview);
    mouseX.set(e.clientX);
    mouseY.set(e.clientY + CURSOR_OFFSET_Y);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => setIsInside(true);
    const onLeave = () => { setIsInside(false); isClicked.set(0); isHovered.set(0); };
    const onDown = () => isClicked.set(1);
    const onUp = () => isClicked.set(0);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
    };
  }, [handleMouseMove, isClicked, isHovered]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea',
      );
      isHovered.set(target ? 1 : 0);
    };
    el.addEventListener('mouseover', handler);
    return () => el.removeEventListener('mouseover', handler);
  }, [isHovered]);

  const show = isInside && !isInPreview;

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Center circle */}
      {show && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{
            x: springX, y: springY, scale, borderRadius: '50%',
            width: CENTER.size, height: CENTER.size,
            marginLeft: -CENTER.size / 2, marginTop: -CENTER.size / 2,
            backgroundColor: CENTER.color, opacity: CENTER.opacity,
            boxShadow: \`0 0 \${CENTER.size / 2}px \${CENTER.color}\`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Inner orbiting circles */}
      {show && INNER_ORBITS.map((orbit, i) => (
        <motion.div
          key={\`inner-\${i}\`}
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{
            x: springX, y: springY,
            width: orbit.radius * 2, height: orbit.radius * 2,
            marginLeft: -orbit.radius, marginTop: -orbit.radius,
          }}
        >
          <div
            className="absolute inset-0 animate-spin"
            style={{
              animationDuration: orbit.duration,
              animationDirection: 'reverse' in orbit && orbit.reverse ? 'reverse' : 'normal',
            }}
          >
            <div
              className="absolute left-1/2 top-0 rounded-full"
              style={{
                width: orbit.size, height: orbit.size,
                marginLeft: -orbit.size / 2, marginTop: -orbit.size / 2,
                backgroundColor: orbit.color, opacity: orbit.opacity,
                filter: orbit.blur > 0 ? \`blur(\${orbit.blur}px)\` : undefined,
                boxShadow: \`0 0 \${orbit.size / 2}px \${orbit.color}\`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Outer orbiting dots */}
      {show && ORBIT_SIZES.map((orbitSize, i) => (
        <motion.div
          key={\`orbit-\${i}\`}
          className="pointer-events-none fixed left-0 top-0 z-40"
          style={{
            x: springX, y: springY,
            width: orbitSize, height: orbitSize,
            marginLeft: -orbitSize / 2, marginTop: -orbitSize / 2,
            opacity: 0.6,
          }}
        >
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: ORBIT_DURATIONS[i] }}>
            <div
              className={\`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full \${ORBIT_COLORS[i]}\`}
              style={{ boxShadow: \`0 0 10px 2px \${ORBIT_COLOR_VALUES[i]}\`, opacity: 0.8 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}`,
  },
  {
    key: 'neon-cursor-usage',
    title: 'Neon Cursor — Setup & Tokens',
    description:
      'ขั้นตอน setup: globals.css tokens + page.tsx wrapper — สีเปลี่ยนได้ที่ globals.css',
    code: `/* ===== Step 1: globals.css — เพิ่ม cursor color tokens ===== */

@theme inline {
  --color-cursor-1: var(--cursor-1);
  --color-cursor-2: var(--cursor-2);
  --color-cursor-3: var(--cursor-3);
  --color-cursor-4: var(--cursor-4);
  --color-cursor-5: var(--cursor-5);
  --color-cursor-orbit-1: var(--cursor-orbit-1);
  --color-cursor-orbit-2: var(--cursor-orbit-2);
  --color-cursor-orbit-3: var(--cursor-orbit-3);
}

:root {
  --cursor-1: oklch(55% 0.2 270);       /* น้ำเงิน */
  --cursor-2: oklch(65% 0.18 300);      /* ม่วง */
  --cursor-3: oklch(70% 0.15 30);       /* ส้ม */
  --cursor-orbit-1: oklch(55% 0.18 290);
  --cursor-orbit-2: oklch(65% 0.15 200);
  --cursor-orbit-3: oklch(60% 0.2 340);
}

.dark {
  --cursor-1: oklch(70% 0.22 270);
  --cursor-2: oklch(75% 0.18 300);
  --cursor-3: oklch(78% 0.15 30);
  --cursor-orbit-1: oklch(65% 0.2 290);
  --cursor-orbit-2: oklch(72% 0.15 200);
  --cursor-orbit-3: oklch(70% 0.22 340);
}


/* ===== Step 2: page.tsx — ครอบ content ด้วย NeonCursor ===== */

import { NeonCursor } from '@/components/neon/page-neon-cursor';

export default function MyPage() {
  return (
    <NeonCursor>
      <div className="space-y-6">
        <h1>My Page Content</h1>
        {/* neon cursor จะทำงานทั้งหน้านี้ */}
      </div>
    </NeonCursor>
  );
}


/* ===== Step 3: Preview zones — ซ่อน neon ใน preview boxes ===== */

// เพิ่ม data-cursor-zone บน element ที่ต้องการให้ neon cursor หายไป
// เช่น preview box ที่มี cursor effect ของตัวเอง
<div data-cursor-zone className="relative overflow-hidden">
  {/* neon cursor จะหายไปเมื่อ mouse อยู่ใน zone นี้ */}
  <MyOtherCursorEffect />
</div>`,
  },
];
