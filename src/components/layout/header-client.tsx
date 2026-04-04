'use client';

import { NavLink } from '@/components/shared/ui-primitives/nav-link';
import { NAV_ITEMS } from '@/constants/navigation.constant';
import { ROUTES } from '@/constants/route.constant';
import { useScroll } from '@/hooks/useScroll';
import { headerVariants } from '@/lib/framer-motion/header';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from '../theme/theme-toggle';

export default function HeaderClient() {
  const scrolled = useScroll(20);
  return (
    <motion.header
      variants={headerVariants}
      animate={scrolled ? 'scrolled' : 'top'}
      transition={{ duration: 0.25 }}
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled ? 'bg-background/85 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-6 md:flex md:justify-between">
        {/* Left spacer on mobile — keeps Brand centered */}
        <div className="md:hidden" />

        <Link
          href={ROUTES.HOME}
          className="justify-self-center text-xl font-bold md:justify-self-auto"
        >
          My Learning
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {/* {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} href={item.path}>
              {item.key}
            </NavLink>
          ))} */}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <ThemeToggle />
          {/* <MobileNav/> */}
        </div>
      </div>
    </motion.header>
  );
}
