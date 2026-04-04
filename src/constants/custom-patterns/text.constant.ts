export type TextPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const TEXT_PATTERNS: readonly TextPattern[] = [
  // ===== Type Definition (ใช้ร่วมกันทุก component) =====
  {
    key: 'text-types',
    title: 'Type Definition — types/text.type.ts',
    description:
      'Type สำหรับ Text components ทั้งหมด — copy ไปวางที่ types/text.type.ts',
    code: `// types/text.type.ts

// ===== Text Type Animation =====

/** ข้อความแต่ละตัวใน sequence */
export type TextSequenceItem = {
  /** ข้อความที่จะพิมพ์ */
  text: string;
  /** เวลารอ (ms) หลังพิมพ์เสร็จ ก่อนเริ่มลบ */
  delay: number;
};

export type TextTypeAnimationProps = {
  /** array ของข้อความที่จะพิมพ์วนซ้ำ */
  items: TextSequenceItem[];
  /** ความเร็วพิมพ์แต่ละตัวอักษร (ms) — default 50 */
  typingSpeed?: number;
  /** ความเร็วลบแต่ละตัวอักษร (ms) — default 30 */
  deletingSpeed?: number;
  /** แสดง cursor กะพริบ — default true */
  cursor?: boolean;
  /** Tailwind class สำหรับ styling */
  className?: string;
};

// ===== Text Image Fill =====

export type TextImageFillProps = {
  /** ข้อความที่แสดง — ยิ่งใหญ่ยิ่งเห็นภาพชัด */
  text: string;
  /** path รูปภาพที่จะ fill ในตัวหนังสือ */
  imageSrc: string;
  /** Tailwind class — ควรใช้ font ใหญ่ (text-6xl+) */
  className?: string;
};

// ===== Text Animated Fill =====

/** ความเร็ว animation: slow (12s) | normal (6s) | fast (3s) */
export type TextAnimatedFillSpeed = 'slow' | 'normal' | 'fast';

export type TextAnimatedFillProps = {
  /** ข้อความที่แสดง — ยิ่งใหญ่ยิ่งเห็นภาพชัด */
  text: string;
  /** path รูปภาพที่จะ fill + เคลื่อนไหวในตัวหนังสือ */
  imageSrc: string;
  /** ความเร็ว animation — default 'normal' */
  speed?: TextAnimatedFillSpeed;
  /** Tailwind class — ควรใช้ font ใหญ่ (text-6xl+) */
  className?: string;
};`,
  },

  // ===== useTypeAnimation Hook =====
  {
    key: 'use-type-animation-hook',
    title: 'useTypeAnimation — Custom Hook',
    description:
      'Hook ที่ทำ typing effect — copy ไปวางที่ hooks/useTypeAnimation.ts (ใช้คู่กับ TextTypeAnimation)',
    code: `// hooks/useTypeAnimation.ts
'use client';

import { useEffect, useRef, useState } from 'react';

import type { TextSequenceItem } from '@/types/text.type';

type UseTypeAnimationOptions = {
  items: TextSequenceItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
};

export function useTypeAnimation({
  items,
  typingSpeed = 50,
  deletingSpeed = 30,
}: UseTypeAnimationOptions) {
  const [displayText, setDisplayText] = useState('');
  const stateRef = useRef({
    index: 0,
    phase: 'typing' as 'typing' | 'waiting' | 'deleting',
    char: 0,
  });

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    const state = stateRef.current;
    state.index = 0;
    state.char = 0;
    state.phase = 'typing';

    const tick = () => {
      const current = items[state.index];
      if (!current) return;

      if (state.phase === 'typing') {
        state.char += 1;
        setDisplayText(current.text.slice(0, state.char));

        if (state.char >= current.text.length) {
          state.phase = 'waiting';
          timerId = setTimeout(tick, current.delay);
          return;
        }
        timerId = setTimeout(tick, typingSpeed);
        return;
      }

      if (state.phase === 'waiting') {
        state.phase = 'deleting';
        timerId = setTimeout(tick, deletingSpeed);
        return;
      }

      // deleting
      state.char -= 1;
      setDisplayText(current.text.slice(0, state.char));

      if (state.char <= 0) {
        state.index = (state.index + 1) % items.length;
        state.phase = 'typing';
        timerId = setTimeout(tick, typingSpeed);
        return;
      }
      timerId = setTimeout(tick, deletingSpeed);
    };

    timerId = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timerId);
  }, [items, typingSpeed, deletingSpeed]);

  return displayText;
}`,
  },

  // ===== Type Animation =====
  {
    key: 'type-animation',
    title: 'TextTypeAnimation — Reusable Component',
    description:
      'พิมพ์ทีละตัว + ลบ + วนซ้ำ — ส่ง items array เป็น props, ไม่ต้องลง lib เพิ่ม',
    code: `// components/shared/ui-primitives/text-type-animation.tsx
'use client';

import { useTypeAnimation } from '@/hooks/useTypeAnimation';
import type { TextTypeAnimationProps } from '@/types/text.type';
import { cn } from '@/lib/utils';

export function TextTypeAnimation({
  items,
  typingSpeed,
  deletingSpeed,
  cursor = true,
  className,
}: TextTypeAnimationProps) {
  const displayText = useTypeAnimation({ items, typingSpeed, deletingSpeed });

  return (
    <span className={cn('inline-block', className)}>
      {displayText}
      {cursor && (
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-current">
          &nbsp;
        </span>
      )}
    </span>
  );
}`,
  },
  {
    key: 'type-animation-usage',
    title: 'TextTypeAnimation — Usage',
    description:
      'สร้าง constant แล้วส่ง items เข้า component — ปรับ speed, cursor ได้',
    code: `import { TextTypeAnimation } from '@/components/shared/ui-primitives/text-type-animation';
import type { TextSequenceItem } from '@/types/text.type';

// items — array ของข้อความที่จะพิมพ์วนซ้ำ
// text: ข้อความที่แสดง
// delay: เวลารอ (ms) หลังพิมพ์เสร็จก่อนเริ่มลบ
const HERO_TEXTS: TextSequenceItem[] = [
  { text: 'The Best Platform', delay: 1000 },
  { text: 'The Best Education', delay: 2000 },
  { text: 'The Best Partner', delay: 2000 },
];

export function HeroSection() {
  return (
    <h1 className="text-4xl font-bold">
      <TextTypeAnimation
        items={HERO_TEXTS}       // ข้อความที่จะพิมพ์วนซ้ำ (required)
        typingSpeed={50}          // ความเร็วพิมพ์แต่ละตัวอักษร ms (default: 50)
        deletingSpeed={30}        // ความเร็วลบแต่ละตัวอักษร ms (default: 30)
        cursor={true}             // แสดง cursor กะพริบ (default: true)
        className="text-primary"  // Tailwind class สำหรับ styling
      />
    </h1>
  );
}`,
  },

  // ===== Image Fill =====
  {
    key: 'image-fill',
    title: 'TextImageFill — Reusable Component',
    description:
      'ตัวหนังสือใหญ่ที่ใช้ภาพนิ่งเป็น fill — background-clip: text, pure CSS',
    code: `// components/shared/ui-primitives/text-image-fill.tsx
'use client';

import type { TextImageFillProps } from '@/types/text.type';
import { cn } from '@/lib/utils';

export function TextImageFill({ text, imageSrc, className }: TextImageFillProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-cover bg-center',
        className,
      )}
      style={{ backgroundImage: \`url(\${imageSrc})\` }}
    >
      {text}
    </span>
  );
}`,
  },
  {
    key: 'image-fill-usage',
    title: 'TextImageFill — Usage',
    description: 'ส่ง text + imageSrc — ตัวหนังสือยิ่งใหญ่ยิ่งเห็นภาพชัด',
    code: `import { TextImageFill } from '@/components/shared/ui-primitives/text-image-fill';

export function BannerSection() {
  return (
    <div className="flex items-center justify-center py-20">
      <TextImageFill
        text="ADVENTURE"             // ข้อความที่แสดง — ยิ่งใหญ่ยิ่งเห็นภาพชัด (required)
        imageSrc="/images/nature.jpg" // path รูปภาพที่จะ fill ในตัวหนังสือ (required)
        className="text-8xl font-black tracking-wide" // ควรใช้ font ใหญ่ (text-6xl+) ถึงจะเห็นภาพ
      />
    </div>
  );
}`,
  },

  // ===== Animated Fill =====
  {
    key: 'animated-fill',
    title: 'TextAnimatedFill — Reusable Component',
    description:
      'เหมือน TextImageFill แต่ภาพข้างในเคลื่อนไหว — animate background-position, GPU-accelerated',
    code: `// components/shared/ui-primitives/text-animated-fill.tsx
'use client';

import type { TextAnimatedFillProps, TextAnimatedFillSpeed } from '@/types/text.type';
import { cn } from '@/lib/utils';

const SPEED_DURATION: Record<TextAnimatedFillSpeed, string> = {
  slow: '12s',
  normal: '6s',
  fast: '3s',
};

export function TextAnimatedFill({
  text,
  imageSrc,
  speed = 'normal',
  className,
}: TextAnimatedFillProps) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-size-[200%_200%]',
        className,
      )}
      style={{
        backgroundImage: \`url(\${imageSrc})\`,
        animation: \`text-bg-pan \${SPEED_DURATION[speed]} linear infinite\`,
      }}
    >
      {text}
      <style>{\`
        @keyframes text-bg-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      \`}</style>
    </span>
  );
}`,
  },
  {
    key: 'animated-fill-usage',
    title: 'TextAnimatedFill — Usage',
    description:
      'ส่ง text + imageSrc + speed (slow/normal/fast) — ภาพเคลื่อนไหวใน text',
    code: `import { TextAnimatedFill } from '@/components/shared/ui-primitives/text-animated-fill';

export function HeroAnimated() {
  return (
    <div className="flex items-center justify-center py-20">
      <TextAnimatedFill
        text="OCEAN WAVE"             // ข้อความที่แสดง — ยิ่งใหญ่ยิ่งเห็นภาพชัด (required)
        imageSrc="/images/ocean.jpg"   // path รูปภาพที่จะ fill + เคลื่อนไหวในตัวหนังสือ (required)
        speed="slow"                   // ความเร็ว animation: 'slow' (12s) | 'normal' (6s) | 'fast' (3s) — default: 'normal'
        className="text-8xl font-black tracking-wide" // ควรใช้ font ใหญ่ (text-6xl+) ถึงจะเห็นภาพ
      />
    </div>
  );
}`,
  },
] as const;
