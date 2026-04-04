'use client';

import { NavLink } from '@/components/shared/ui-primitives/nav-link';
import { Home, Palette, Puzzle, Sparkles } from 'lucide-react';

export function ActiveHighlightPreview() {
  return (
    <div className="mx-auto flex max-w-xs justify-center">
      <nav className="flex w-full flex-col gap-1">
        <NavLink href="/" variant="highlight" icon={Home} exact>
          Home
        </NavLink>
        <NavLink href="/features/tailwind" variant="highlight" icon={Palette}>
          Tailwind
        </NavLink>
        <NavLink
          href="/features/custom-patterns"
          variant="highlight"
          icon={Puzzle}
        >
          Custom Patterns
        </NavLink>
        <NavLink
          href="/features/framer-motion"
          variant="highlight"
          icon={Sparkles}
        >
          Framer Motion
        </NavLink>
      </nav>
    </div>
  );
}
