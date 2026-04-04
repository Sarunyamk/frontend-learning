'use client';

import { cn } from '@/lib/utils';

type GradientMeshProps = {
  /**
   * จำนวน gradient blob (2-5 ตัว)
   * ⚠️ ยิ่งเยอะยิ่ง blur หนัก — 3 ตัวเหมาะสำหรับ background ทั่วไป
   * @default 3
   */
  blobCount?: 2 | 3 | 4 | 5;
  /**
   * ความเร็ว animation — เป็น duration ของ 1 รอบ (ลอยไป-กลับ)
   * slow: 20s (แทบไม่รู้สึก), medium: 12s (ลอยนุ่มๆ), fast: 6s (เห็นชัด)
   * @default 'medium'
   */
  speed?: 'slow' | 'medium' | 'fast';
  /**
   * Blur intensity (px) — ยิ่งสูงยิ่ง soft/ละลาย
   * ⚠️ ค่าสูงมาก (>150) อาจกระทบ performance บนมือถือ — แนะนำ 60-120
   * @default 80
   */
  blur?: number;
  /**
   * สีของแต่ละ blob — ใช้ CSS color value (oklch/rgb/hex/var)
   * ⚠️ ต่างจาก FloatingParticles — ที่นี่รับ CSS color string ไม่ใช่ Tailwind class
   * blob ที่ i จะใช้ colors[i % colors.length] (วนถ้า blob > สี)
   * @default ใช้ CSS variable --gradient-1 ถึง --gradient-5 (auto dark/light จาก globals.css)
   */
  colors?: string[];
  /**
   * Opacity ของ mesh layer ทั้งชั้น (0-1)
   * ⚠️ ค่าสูง (>0.5) จะเด่นมาก — แนะนำ 0.15-0.3 สำหรับ background
   * @default 0.3
   */
  opacity?: number;
  /** เพิ่ม class ให้ container — ใช้สำหรับ override position/z-index */
  className?: string;
};

const SPEED_MAP = { slow: '20s', medium: '12s', fast: '6s' } as const;

const DEFAULT_COLORS = [
  'var(--gradient-1)',
  'var(--gradient-2)',
  'var(--gradient-3)',
  'var(--gradient-4)',
  'var(--gradient-5)',
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
            width: `${40 + i * 10}%`,
            height: `${40 + i * 10}%`,
            background: colors[i % colors.length],
            filter: `blur(${blur}px)`,
            top: `${20 + (i * 25) % 60}%`,
            left: `${10 + (i * 30) % 70}%`,
            transform: 'translate(-50%, -50%)',
            animation: `gradient-float-${i % 3} ${duration} ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
    </div>
  );
}
