'use client';

import { NavLink } from '@/components/shared/ui-primitives/nav-link';
import { Home, Palette, Puzzle } from 'lucide-react';

export function BasicIconPreview() {
  return (
    <div className="space-y-4">
      {/* Without icon */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          Without icon
        </p>
        <nav className="flex items-center gap-4">
          <NavLink href="/" exact>Home</NavLink>
          <NavLink href="/features/tailwind">Tailwind</NavLink>
          <NavLink href="/features/custom-patterns">Custom Patterns</NavLink>
        </nav>
      </div>

      {/* With icon */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">With icon</p>
        <nav className="flex items-center gap-4">
          <NavLink href="/" icon={Home} exact>Home</NavLink>
          <NavLink href="/features/tailwind" icon={Palette}>Tailwind</NavLink>
          <NavLink href="/features/custom-patterns" icon={Puzzle}>
            Custom Patterns
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
