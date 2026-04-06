// ===== Ready-to-Use Code =====

import { CodeSection } from '@/types/share-code-section.type';

export type ReadyToUseCode = {
  name: string;
  description: string;
  filePath: string;
  code: string;
};

export const READY_TO_USE_CODES: readonly ReadyToUseCode[] = [
  {
    name: 'Variant Presets',
    description: 'Animation variants ทั้งหมด — import ไปใช้ได้เลย',
    filePath: 'src/lib/framer-motion/framer-motion.ts',
    code: `import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

export const dropdown: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const slideInRight: Variants = {
  hidden: { x: '100%' },
  show: { x: 0 },
  exit: { x: '100%' },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};`,
  },
  {
    name: 'ColumnFade Component',
    description:
      'Scroll-triggered fade wrapper — รับ variant, delay, duration, once, amount',
    filePath: 'src/components/framer-motion/fade.tsx',
    code: `'use client';

import { fadeUp } from '@/lib/framer-motion/framer-motion';
import { motion, Variants } from 'framer-motion';

type ColumnFadeProps = {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
};

export function ColumnFade({
  children,
  variant = fadeUp,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  className,
}: ColumnFadeProps) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}`,
  },
  {
    name: 'Stagger Components',
    description:
      'Container + Item สำหรับ stagger animation — ใช้กับ list, grid',
    filePath: 'src/components/framer-motion/stagger.tsx',
    code: `'use client';

import {
  staggerContainer,
  staggerItem,
} from '@/lib/framer-motion/framer-motion';
import { motion } from 'framer-motion';

type StaggerContainerProps = {
  children: React.ReactNode;
  once?: boolean;
  amount?: number;
  className?: string;
};

export function StaggerContainer({
  children,
  once = true,
  amount = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}`,
  },
] as const;

export const TRANSITION_READY_TO_USE_CODES: readonly ReadyToUseCode[] = [
  {
    name: 'fadeSlide Variant',
    description: 'Slide เข้าจากขวา ออกทางซ้าย — เหมาะกับ step/tab transitions',
    filePath: 'src/lib/framer-motion/framer-motion.ts',
    code: `export const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};`,
  },
  {
    name: 'StepTransition Component',
    description:
      'AnimatePresence + fadeSlide wrapper — ส่ง stepKey เปลี่ยนทีไร animate ทีนั้น',
    filePath: 'src/components/framer-motion/step-transition.tsx',
    code: `'use client';

import { fadeSlide } from '@/lib/framer-motion/framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

type StepTransitionProps = {
  stepKey: string | number;
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export function StepTransition({
  stepKey,
  children,
  className,
  duration = 0.3,
}: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={fadeSlide}
        initial="hidden"
        animate="show"
        exit="exit"
        transition={{ duration }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}`,
  },
] as const;

// ===== Animation Preset Examples =====

export type AnimationPreset = {
  name: string;
  description: string;
  variantCode: string;
  usageCode: string;
};

export const ANIMATION_PRESETS: readonly AnimationPreset[] = [
  {
    name: 'fadeUp',
    description: 'Fade in + slide up — ใช้กับ card, section ที่ต้องการเน้น',
    variantCode: `export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};`,
    usageCode: `<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>`,
  },
  {
    name: 'fadeIn',
    description: 'Fade in only — ใช้กับ overlay, modal, subtle transitions',
    variantCode: `export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};`,
    usageCode: `<motion.div
  variants={fadeIn}
  initial="hidden"
  animate="show"
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>`,
  },
  {
    name: 'slideDown',
    description:
      'Fade in + slide down — ใช้กับ header, notification ที่เลื่อนลงมา',
    variantCode: `export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
};`,
    usageCode: `<motion.div
  variants={slideDown}
  initial="hidden"
  animate="show"
>
  Notification
</motion.div>`,
  },
  {
    name: 'slideLeft',
    description:
      'Fade in + slide from right — ใช้กับ sidebar, panel ที่เข้ามาจากขวา',
    variantCode: `export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};`,
    usageCode: `<motion.div
  variants={slideLeft}
  initial="hidden"
  animate="show"
>
  Panel
</motion.div>`,
  },
  {
    name: 'slideRight',
    description: 'Fade in + slide from left — ใช้กับ content ที่เข้ามาจากซ้าย',
    variantCode: `export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};`,
    usageCode: `<motion.div
  variants={slideRight}
  initial="hidden"
  animate="show"
>
  Content
</motion.div>`,
  },
  {
    name: 'dropdown',
    description: 'Dropdown menu animation — มี exit state สำหรับปิด',
    variantCode: `export const dropdown: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};`,
    usageCode: `<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={dropdown}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      Menu Items
    </motion.div>
  )}
</AnimatePresence>`,
  },
  {
    name: 'slideInRight',
    description: 'Full slide from right — ใช้กับ mobile nav, drawer',
    variantCode: `export const slideInRight: Variants = {
  hidden: { x: '100%' },
  show: { x: 0 },
  exit: { x: '100%' },
};`,
    usageCode: `<AnimatePresence>
  {isOpen && (
    <motion.nav
      variants={slideInRight}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ type: 'spring', damping: 25 }}
    >
      Navigation
    </motion.nav>
  )}
</AnimatePresence>`,
  },
  {
    name: 'stagger (container + item)',
    description: 'Children ขึ้นมาทีละตัว — ใช้กับ list, grid cards',
    variantCode: `export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};`,
    usageCode: `<motion.ul
  variants={staggerContainer}
  initial="hidden"
  animate="show"
>
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>`,
  },
] as const;

// ===== Scroll Animation Examples =====

export type ScrollExample = {
  name: string;
  description: string;
  code: string;
};

export const SCROLL_EXAMPLES: readonly ScrollExample[] = [
  {
    name: 'whileInView พื้นฐาน',
    description: 'element animate เมื่อ scroll เข้ามาใน viewport',
    code: `<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}         // animate ครั้งเดียว
  transition={{ duration: 0.5 }}
>
  Content appears on scroll
</motion.div>`,
  },
  {
    name: 'viewport options',
    description:
      'ปรับ amount เพื่อกำหนดว่า element ต้องเข้ามาเท่าไหร่ถึง trigger',
    code: `<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{
    once: true,      // true = animate ครั้งเดียว, false = ทุกครั้งที่เข้า viewport
    amount: 0.3,     // 0-1 = element ต้องเข้ามา 30% ถึง trigger
    margin: '-100px', // offset ก่อน trigger (ค่าลบ = trigger เร็วขึ้น)
  }}
>
  Content
</motion.div>`,
  },
  {
    name: 'Stagger on scroll',
    description:
      'cards ขึ้นมาทีละใบเมื่อ scroll ถึง — ใช้ staggerContainer + staggerItem',
    code: `<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.1 }}
  className="grid grid-cols-3 gap-4"
>
  {cards.map((card) => (
    <motion.div key={card.id} variants={staggerItem}>
      <Card>{card.title}</Card>
    </motion.div>
  ))}
</motion.div>`,
  },
] as const;

// ===== Page Transition Examples =====

export type TransitionExample = {
  name: string;
  description: string;
  code: string;
};

export const TRANSITION_EXAMPLES: readonly TransitionExample[] = [
  {
    name: 'AnimatePresence พื้นฐาน',
    description: 'ครอบ element ที่จะมี enter/exit animation — ต้องมี key prop',
    code: `import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}              // เปลี่ยน key = trigger animation
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {content}
  </motion.div>
</AnimatePresence>`,
  },
  {
    name: 'mode options',
    description: 'กำหนดลำดับ exit/enter — "wait" ให้ exit จบก่อนค่อย enter',
    code: `// mode="wait"    — exit จบก่อน → ค่อย enter (สะอาด)
// mode="sync"    — exit + enter พร้อมกัน (default)
// mode="popLayout" — exit + enter พร้อมกัน แต่ layout ไม่กระโดด

<AnimatePresence mode="wait">
  <motion.div key={currentPage}>
    {pageContent}
  </motion.div>
</AnimatePresence>`,
  },
  {
    name: 'ใช้กับ variants',
    description: 'ใช้ variant ที่มี exit state — เช่น dropdown, slideInRight',
    code: `const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

<AnimatePresence mode="wait">
  <motion.div
    key={step}
    variants={fadeSlide}
    initial="hidden"
    animate="show"
    exit="exit"
  >
    <StepContent step={step} />
  </motion.div>
</AnimatePresence>`,
  },
] as const;

export const FRAMER_INSTALL_SECTIONS: readonly CodeSection[] = [
  {
    title: 'Install Framer Motion',
    description: 'ติดตั้ง library สำหรับ component',
    language: 'bash',
    code: `pnpm add framer-motion`,
  },
];
