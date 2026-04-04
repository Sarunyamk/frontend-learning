'use client';

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
}
