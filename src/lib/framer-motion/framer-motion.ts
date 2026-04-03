import { Variants } from 'framer-motion';

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
};

export const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const shake: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { rotate: { delay: 0.3, duration: 0.5, ease: 'easeInOut' } },
  },
};
