export type BackgroundAnimationPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const BACKGROUND_ANIMATION_PATTERNS: readonly BackgroundAnimationPattern[] =
  [
    // ─── Variant 1: Animated Gradient Mesh (CSS only) ───
    {
      key: 'gradient-mesh-source',
      title: 'Animated Gradient Mesh — Component',
      description:
        'Background gradient blob ที่เคลื่อนไหวด้วย CSS keyframes เท่านั้น — ไม่ใช้ JS animation, 0 KB extra bundle, SSR-safe',
      code: `'use client';

import { cn } from '@/lib/utils';

type GradientMeshProps = {
  /** จำนวน gradient blob (2-5) — ยิ่งเยอะยิ่ง blur หนัก, แนะนำ 3 @default 3 */
  blobCount?: 2 | 3 | 4 | 5;
  /** ความเร็ว = duration 1 รอบ — slow: 20s (แทบไม่รู้สึก), medium: 12s, fast: 6s (เห็นชัด) @default 'medium' */
  speed?: 'slow' | 'medium' | 'fast';
  /** Blur intensity (px) — ยิ่งสูงยิ่ง soft ⚠️ >150 อาจหนักบนมือถือ, แนะนำ 60-120 @default 80 */
  blur?: number;
  /** สี blob — รับ CSS color (oklch/rgb/hex) ⚠️ ไม่ใช่ Tailwind class @default 5 สี oklch */
  colors?: string[];
  /** Opacity ทั้ง layer (0-1) — ⚠️ >0.5 จะเด่นมาก, แนะนำ 0.15-0.3 สำหรับ bg @default 0.3 */
  opacity?: number;
  /** เพิ่ม class ให้ container */
  className?: string;
};

const SPEED_MAP = { slow: '20s', medium: '12s', fast: '6s' } as const;

const DEFAULT_COLORS = [
  'oklch(70% 0.15 250)',  // blue
  'oklch(70% 0.15 310)',  // purple
  'oklch(75% 0.12 160)',  // teal
  'oklch(70% 0.18 30)',   // orange
  'oklch(70% 0.15 130)',  // green
];

export function GradientMesh({
  blobCount = 3,
  speed = 'medium',
  blur = 80,
  colors = DEFAULT_COLORS,
  opacity = 0.3,
  className,
}: GradientMeshProps) {
  const duration = SPEED_MAP[speed];

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      {Array.from({ length: blobCount }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: \`\${40 + i * 10}%\`,
            height: \`\${40 + i * 10}%\`,
            background: colors[i % colors.length],
            filter: \`blur(\${blur}px)\`,
            top: \`\${20 + (i * 25) % 60}%\`,
            left: \`\${10 + (i * 30) % 70}%\`,
            transform: 'translate(-50%, -50%)',
            animation: \`gradient-float-\${i % 3} \${duration} ease-in-out infinite\`,
            animationDelay: \`\${i * -3}s\`,
          }}
        />
      ))}
    </div>
  );
}

/* --- globals.css --- เพิ่ม keyframes เหล่านี้ ---

@keyframes gradient-float-0 {
  0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
  33%      { transform: translate(-50%, -50%) translate(30px, -50px); }
  66%      { transform: translate(-50%, -50%) translate(-20px, 20px); }
}

@keyframes gradient-float-1 {
  0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
  33%      { transform: translate(-50%, -50%) translate(-40px, 30px); }
  66%      { transform: translate(-50%, -50%) translate(20px, -40px); }
}

@keyframes gradient-float-2 {
  0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
  33%      { transform: translate(-50%, -50%) translate(50px, 20px); }
  66%      { transform: translate(-50%, -50%) translate(-30px, -30px); }
}
*/`,
    },
    {
      key: 'gradient-mesh-usage',
      title: 'Animated Gradient Mesh — Usage & Config',
      description:
        'วิธีใช้งาน: ระดับ section, full page, และ config ทั้งหมด',
      code: `import { GradientMesh } from '@/components/shared/gradient-mesh';

/* ===== กฎสำคัญ =====
  1. Parent ต้องมี \`relative overflow-hidden\`
     → GradientMesh ใช้ absolute inset-0 จะเต็มแค่ parent ที่ relative
  2. Content ต้องมี \`relative z-10\`
     → ไม่งั้น gradient จะทับ content
  3. globals.css ต้องมี @keyframes gradient-float-0/1/2
     → ถ้าไม่มี blob จะไม่เคลื่อนไหว
===== */


// ─── ระดับ Section — ครอบแค่ส่วนเดียว ───

function SectionBackground() {
  return (
    <section className="relative min-h-[400px] overflow-hidden">
      <GradientMesh />
      <div className="relative z-10 p-8">
        <h1>Content on top of gradient</h1>
      </div>
    </section>
  );
}


// ─── ระดับ Full Page — ครอบทั้งหน้า (page.tsx) ───

// ⚠️ ใส่ relative + overflow-hidden ที่ <main>
// → GradientMesh จะครอบทุก section ในหน้า

// app/page.tsx (Server Component)
import { GradientMesh } from '@/components/shared/gradient-mesh';
import { HeroSection } from '@/components/home/hero-section';
import { FeatureSection } from '@/components/home/feature-section';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <GradientMesh speed="slow" opacity={0.2} blobCount={3} blur={100} />
      <HeroSection />   {/* content ข้างใน ต้อง relative z-10 */}
      <FeatureSection />
    </main>
  );
}


// ─── Custom Colors ───

function BrandBackground() {
  return (
    <section className="relative overflow-hidden">
      <GradientMesh
        colors={[
          'oklch(65% 0.2 270)',   // brand blue
          'oklch(70% 0.18 300)',  // brand purple
          'oklch(75% 0.15 200)',  // brand teal
        ]}
        blobCount={3}
        opacity={0.25}
      />
      <div className="relative z-10">Content</div>
    </section>
  );
}


// ─── Card / Small Container ───

function CardBackground() {
  return (
    <div className="relative overflow-hidden rounded-xl p-8">
      <GradientMesh speed="fast" blobCount={5} blur={60} opacity={0.4} />
      <div className="relative z-10">Card content</div>
    </div>
  );
}

/* ===== Config Reference =====
| Prop       | Type                  | Default    | Description                     |
|------------|-----------------------|------------|---------------------------------|
| blobCount  | 2 | 3 | 4 | 5       | 3          | จำนวน gradient blobs            |
| speed      | 'slow'|'medium'|'fast'| 'medium'   | ความเร็ว animation              |
| blur       | number                | 80         | Blur intensity (px)             |
| colors     | string[]              | 5 defaults | Gradient colors (oklch/rgb/hex) |
| opacity    | number (0-1)          | 0.3        | Opacity ของ mesh layer          |
| className  | string                | —          | เพิ่ม class ให้ container        |
===== */`,
    },

    // ─── Variant 2: Floating Particles (Framer Motion) ───
    {
      key: 'floating-particles-source',
      title: 'Floating Particles — Component',
      description:
        'อนุภาคลอยขึ้น-ลงด้วย Framer Motion animate + infinite repeat — รองรับ custom size, count, speed, color',
      code: `'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

type FloatingParticlesProps = {
  /** จำนวน particles ⚠️ ยิ่งเยอะยิ่งหนัก — แนะนำ 20-50, ไม่เกิน 100 @default 30 */
  count?: number;
  /** ขนาด [min, max] px — แต่ละตัว random ระหว่าง 2 ค่า เช่น [3,8] → 3-8px @default [4,12] */
  sizeRange?: [number, number];
  /** duration 1 รอบ [เร็วสุด, ช้าสุด] วินาที ⚠️ ตัวเลขยิ่งสูง = ยิ่งช้า เช่น [8,20] → บางตัว 8s บางตัว 20s @default [6,14] */
  speedRange?: [number, number];
  /** สี particle — ⚠️ ต้องเป็น Tailwind bg class ไม่ใช่ hex/oklch (ต่างจาก GradientMesh) @default 'bg-primary/20' */
  particleClass?: string;
  /** Opacity ทั้ง layer (0-1) @default 1 */
  opacity?: number;
  /** ระยะลอยขึ้น-ลง (px) ⚠️ >80 อาจลอยออกนอก container ถ้า container เล็ก @default 30 */
  floatDistance?: number;
  /** เพิ่ม class ให้ container */
  className?: string;
};

function generateParticles(
  count: number,
  sizeRange: [number, number],
  speedRange: [number, number],
): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    duration: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
    delay: Math.random() * -20,
  }));
}

export function FloatingParticles({
  count = 30,
  sizeRange = [4, 12],
  speedRange = [6, 14],
  particleClass = 'bg-primary/20',
  opacity = 1,
  floatDistance = 30,
  className,
}: FloatingParticlesProps) {
  const particles = useMemo(
    () => generateParticles(count, sizeRange, speedRange),
    [count, sizeRange, speedRange],
  );

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn('absolute rounded-full', particleClass)}
          style={{
            width: p.size,
            height: p.size,
            left: \`\${p.x}%\`,
            top: \`\${p.y}%\`,
          }}
          animate={{
            y: [0, -floatDistance, 0],
            x: [0, floatDistance * 0.3, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}`,
    },
    {
      key: 'floating-particles-usage',
      title: 'Floating Particles — Usage & Config',
      description:
        'วิธีใช้งาน: ระดับ section, full page, combined, และ config ทั้งหมด',
      code: `import { FloatingParticles } from '@/components/shared/floating-particles';

/* ===== กฎสำคัญ (เหมือน GradientMesh) =====
  1. Parent ต้องมี \`relative overflow-hidden\`
     → FloatingParticles ใช้ absolute inset-0
  2. Content ต้องมี \`relative z-10\`
     → ไม่งั้น particles จะทับ content
  3. ไม่ต้องเพิ่ม CSS — ใช้ Framer Motion ล้วน
===== */


// ─── ระดับ Section — ครอบแค่ส่วนเดียว ───

function SectionParticles() {
  return (
    <section className="relative min-h-[400px] overflow-hidden">
      <FloatingParticles />
      <div className="relative z-10 p-8">
        <h1>Content with floating particles</h1>
      </div>
    </section>
  );
}


// ─── ระดับ Full Page — ครอบทั้งหน้า (page.tsx) ───

// ⚠️ ใส่ relative + overflow-hidden ที่ <main>
// → particles จะครอบทุก section ในหน้า

// app/page.tsx (Server Component)
import { FloatingParticles } from '@/components/shared/floating-particles';
import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <FloatingParticles count={80} sizeRange={[3, 8]} opacity={0.5} />
      <HeroSection />   {/* content ข้างใน ต้อง relative z-10 */}
    </main>
  );
}


// ─── Custom Color — brand particles ───

function BrandParticles() {
  return (
    <section className="relative overflow-hidden">
      <FloatingParticles
        count={20}
        particleClass="bg-brand-100/30"
        sizeRange={[6, 16]}
        speedRange={[10, 20]}
      />
      <div className="relative z-10">Branded section</div>
    </section>
  );
}


// ─── Combined — Gradient Mesh + Particles ซ้อนกัน ───

import { GradientMesh } from '@/components/shared/gradient-mesh';

function CombinedBackground() {
  return (
    <main className="relative overflow-hidden">
      <GradientMesh speed="slow" opacity={0.15} />
      <FloatingParticles count={25} sizeRange={[3, 8]} opacity={0.6} />
      <div className="relative z-10 p-8">
        <h1>Layered background effects</h1>
      </div>
    </main>
  );
}

/* ===== Config Reference =====
| Prop          | Type            | Default         | Description                      |
|---------------|-----------------|-----------------|----------------------------------|
| count         | number          | 30              | จำนวน particles                  |
| sizeRange     | [min, max]      | [4, 12]         | ขนาด particle (px)               |
| speedRange    | [min, max]      | [6, 14]         | ช่วง duration animation (s)      |
| particleClass | string          | 'bg-primary/20' | Tailwind class สำหรับสี           |
| opacity       | number (0-1)    | 1               | Opacity ของ layer                 |
| floatDistance  | number          | 30              | ระยะลอยขึ้น-ลง (px)              |
| className     | string          | —               | เพิ่ม class ให้ container          |
===== */`,
    },
  ];
