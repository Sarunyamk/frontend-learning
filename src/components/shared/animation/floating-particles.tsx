'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { generateParticles, type Particle } from '@/utils/generate-particles';

type FloatingParticlesProps = {
  /**
   * จำนวน particles ที่จะ render
   * ⚠️ ยิ่งเยอะยิ่งหนัก — แนะนำ 20-50 สำหรับ page background, ไม่เกิน 100
   * @default 30
   */
  count?: number;
  /**
   * ขนาด min-max ของ particle (px) — [ตัวเล็กสุด, ตัวใหญ่สุด]
   * แต่ละตัวจะ random ขนาดระหว่าง 2 ค่านี้
   * เช่น [3, 8] → particle จะมีขนาด 3px ถึง 8px
   * @default [4, 12]
   */
  sizeRange?: [number, number];
  /**
   * ช่วง duration ของ 1 รอบ animation (วินาที) — [เร็วสุด, ช้าสุด]
   * ⚠️ ตัวเลขยิ่งสูง = ยิ่งช้า (ใช้เวลานานกว่าจะครบ 1 รอบ ลอยขึ้น → ลงกลับ)
   * แต่ละ particle จะ random duration ระหว่าง 2 ค่านี้ เพื่อให้ดู organic
   * เช่น [8, 20] → บางตัวครบรอบใน 8s (เร็ว), บางตัว 20s (ช้า)
   * @default [6, 14]
   */
  speedRange?: [number, number];
  /**
   * Tailwind class สำหรับสี particle
   * ⚠️ ต้องเป็น Tailwind bg class — ไม่ใช่ hex/oklch (ต่างจาก GradientMesh ที่รับ CSS color)
   * เช่น 'bg-primary/20', 'bg-brand-100/30', 'bg-white/10'
   * @default 'bg-primary/20'
   */
  particleClass?: string;
  /**
   * Opacity ของ layer ทั้งชั้น (0-1)
   * ใช้ control ความเด่นรวมของ particles ทั้งหมดพร้อมกัน
   * @default 1
   */
  opacity?: number;
  /**
   * ระยะที่ particle ลอยขึ้น-ลง (px)
   * ⚠️ ค่าสูงมาก (>80) อาจลอยออกนอก container ถ้า container เล็ก
   * @default 30
   */
  floatDistance?: number;
  /** เพิ่ม class ให้ container — ใช้สำหรับ override position/z-index */
  className?: string;
};

export function FloatingParticles({
  count = 30,
  sizeRange = [4, 12],
  speedRange = [6, 14],
  particleClass = 'bg-primary/20',
  opacity = 1,
  floatDistance = 30,
  className,
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(count, sizeRange, speedRange));
  }, [count, sizeRange, speedRange]);

  if (particles.length === 0) return null;

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
            left: `${p.x}%`,
            top: `${p.y}%`,
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
}
