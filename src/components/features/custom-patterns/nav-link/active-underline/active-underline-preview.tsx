'use client';

import { NavLink } from '@/components/shared/ui-primitives/nav-link';
import { Home, Palette, Puzzle } from 'lucide-react';

export function ActiveUnderlinePreview() {
  return (
    <div className="flex justify-center">
      <nav className="flex items-center gap-6">
        <NavLink href="/" variant="underline" icon={Home} exact>
          Home
        </NavLink>
        <NavLink href="/features/tailwind" variant="underline" icon={Palette}>
          Tailwind
        </NavLink>
        <NavLink
          href="/features/custom-patterns"
          variant="underline"
          icon={Puzzle}
        >
          Custom Patterns
        </NavLink>
      </nav>
    </div>
  );
}
