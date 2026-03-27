'use client';

import { dropdown } from '@/lib/framer-motion/framer-motion';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function DropdownMotion({ children, className, onClick }: Props) {
  return (
    <motion.div
      variants={dropdown}
      initial="hidden"
      animate="show"
      exit="exit"
      onClick={onClick}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
