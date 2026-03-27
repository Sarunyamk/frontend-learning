'use client';

import { fadeUp } from '@/lib/framer-motion/framer-motion';
import { motion, Variants } from 'framer-motion';

type ColumnFadeProps = {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
};

export function ColumnFade({
  children,
  variant = fadeUp,
  delay = 0,
  duration = 0.6,
  className,
}: ColumnFadeProps) {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
