'use client';

import { NavLink } from '@/components/shared/ui-primitives/nav-link';

export function AnimatedUnderlinePreview() {
  return (
    <div className="flex justify-center">
      <nav className="flex items-center gap-6">
        <NavLink href="/" variant="animated" exact>
          Home
        </NavLink>
        <NavLink href="/features/tailwind" variant="animated">
          Tailwind
        </NavLink>
        <NavLink href="/features/custom-patterns" variant="animated">
          Custom Patterns
        </NavLink>
        <NavLink href="/features/framer-motion" variant="animated">
          Framer Motion
        </NavLink>
      </nav>
    </div>
  );
}
