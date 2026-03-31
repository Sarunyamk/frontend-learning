'use client';

import { NAV_ITEMS } from '@/constants/navigation.constant';
import { ROUTES } from '@/constants/route.constant';
import { useScroll } from '@/hooks/useScroll';
import { headerVariants } from '@/lib/framer-motion/header';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from '../theme/theme-toggle';
import { MobileNav } from './mobile-nav';

export default function HeaderClient() {
  const scrolled = useScroll(20);
  return (
    <motion.header
      variants={headerVariants}
      animate={scrolled ? 'scrolled' : 'top'}
      transition={{ duration: 0.25 }}
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled ? 'bg-background/85 backdrop-blur-sm' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={ROUTES.HOME} className="text-xl font-bold">
          Brand
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.path}>
              {item.key}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
