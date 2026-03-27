'use client';

import { NAV_ITEMS } from '@/constants/navigation.constant';
import { slideInRight, staggerContainer, staggerItem } from '@/lib/framer-motion/framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle menu">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm"
              onClick={close}
            />

            {/* Slide-in panel */}
            <motion.nav
              variants={slideInRight}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-3/4 max-w-sm border-l bg-background p-6"
            >
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-4"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.key} variants={staggerItem}>
                    <Link
                      href={item.path}
                      onClick={close}
                      className="block rounded-md px-3 py-2 text-lg font-medium transition-colors hover:bg-accent"
                    >
                      {item.key}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
