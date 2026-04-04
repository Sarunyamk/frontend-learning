'use client';

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
}
