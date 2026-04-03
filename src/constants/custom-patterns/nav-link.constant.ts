export type NavLinkPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const NAV_LINK_PATTERNS: readonly NavLinkPattern[] = [
  {
    key: 'nav-link',
    title: 'NavLink — Reusable Component',
    description:
      'Wrapper รอบ Next.js Link + usePathname() — auto-detect isActive, รับ variant/icon/exact props',
    code: `// components/shared/nav-link.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type NavLinkVariant = 'default' | 'underline' | 'highlight' | 'animated';

type NavLinkProps = Omit<React.ComponentProps<typeof Link>, 'className'> & {
  icon?: LucideIcon;
  variant?: NavLinkVariant;
  /** exact=true → active เมื่อ pathname === href เท่านั้น (ใช้กับ "/" ป้องกัน active ทุกหน้า) */
  exact?: boolean;
  className?: string;
};

// ─── Variant style map ────────────────────────────────────────────
// แต่ละ variant มี: base (ใส่เสมอ), active, inactive
const VARIANT_STYLES: Record<
  NavLinkVariant,
  { base?: string; active: string; inactive: string }
> = {
  default: {
    active: 'text-foreground',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
  underline: {
    active: 'text-foreground underline underline-offset-4 decoration-primary decoration-2',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
  highlight: {
    base: 'rounded-lg px-3 py-2',
    active: 'bg-accent text-accent-foreground',
    inactive: 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
  },
  animated: {
    base: 'group relative pb-1',
    active: 'text-foreground',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
};

// ─── Component ────────────────────────────────────────────────────
export function NavLink({
  href,
  icon: Icon,
  variant = 'default',
  exact = false,
  className,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === 'string' ? href : (href.pathname ?? '');

  // exact: "/" active เฉพาะ pathname === "/"
  // default: "/features" active ทั้ง /features และ /features/xxx
  const isActive = exact
    ? pathname === hrefStr
    : pathname === hrefStr || pathname.startsWith(hrefStr + '/');

  const style = VARIANT_STYLES[variant];

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium transition-colors',
        style.base,
        isActive ? style.active : style.inactive,
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      {children}

      {/* Animated underline bar — CSS only, no Framer Motion */}
      {variant === 'animated' && (
        <span
          className={cn(
            'absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-300',
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
          )}
        />
      )}
    </Link>
  );
}`,
  },
  {
    key: 'basic-icon',
    title: 'Basic + Icon',
    description:
      'variant="default" — plain link + link with Lucide icon, auto-detect active state',
    code: `import { NavLink } from '@/components/shared/nav-link';
import { Home, Palette, Puzzle } from 'lucide-react';

// Basic — ไม่มี icon
<nav className="flex items-center gap-4">
  <NavLink href="/" exact>Home</NavLink>
  <NavLink href="/features/tailwind">Tailwind</NavLink>
  <NavLink href="/features/custom-patterns">Custom Patterns</NavLink>
</nav>

// With icon — ส่ง icon prop (LucideIcon)
<nav className="flex items-center gap-4">
  <NavLink href="/" icon={Home} exact>Home</NavLink>
  <NavLink href="/features/tailwind" icon={Palette}>Tailwind</NavLink>
  <NavLink href="/features/custom-patterns" icon={Puzzle}>Custom Patterns</NavLink>
</nav>

// exact prop — ใช้กับ path ที่เป็น prefix ของ path อื่น
// เช่น "/" จะ active ทุกหน้า (เพราะทุก path startsWith "/")
// ใส่ exact → active เฉพาะ pathname === href เท่านั้น`,
  },
  {
    key: 'active-underline',
    title: 'Active Underline',
    description:
      'variant="underline" — แสดง underline เมื่อ active (ใช้จริงใน header navigation)',
    code: `import { NavLink } from '@/components/shared/nav-link';
import { Home, Palette, Puzzle } from 'lucide-react';

// Header-style navigation — underline active link
<nav className="flex items-center gap-6">
  <NavLink href="/" variant="underline" icon={Home} exact>
    Home
  </NavLink>
  <NavLink href="/features/tailwind" variant="underline" icon={Palette}>
    Tailwind
  </NavLink>
  <NavLink href="/features/custom-patterns" variant="underline" icon={Puzzle}>
    Custom Patterns
  </NavLink>
</nav>

// isActive ตรวจ:
// exact=true  → pathname === href
// exact=false → pathname === href || pathname.startsWith(href + '/')
// เช่น href="/features/custom-patterns" จะ active ทั้ง /features/custom-patterns และ sub-paths`,
  },
  {
    key: 'active-highlight',
    title: 'Active BG Highlight',
    description:
      'variant="highlight" — rounded bg-accent เมื่อ active (ใช้จริงใน sidebar)',
    code: `import { NavLink } from '@/components/shared/nav-link';
import { Home, Palette, Puzzle, Sparkles } from 'lucide-react';

// Sidebar-style navigation — bg highlight active link
<nav className="flex flex-col gap-1">
  <NavLink href="/" variant="highlight" icon={Home} exact>
    Home
  </NavLink>
  <NavLink href="/features/tailwind" variant="highlight" icon={Palette}>
    Tailwind
  </NavLink>
  <NavLink href="/features/custom-patterns" variant="highlight" icon={Puzzle}>
    Custom Patterns
  </NavLink>
  <NavLink href="/features/framer-motion" variant="highlight" icon={Sparkles}>
    Framer Motion
  </NavLink>
</nav>

// highlight variant เพิ่ม: rounded-lg px-3 py-2
// active → bg-accent text-accent-foreground
// inactive → hover:bg-accent/50`,
  },
  {
    key: 'animated-underline',
    title: 'Animated Underline',
    description:
      'variant="animated" — CSS scaleX transition on hover + active (ไม่ใช้ Framer Motion)',
    code: `import { NavLink } from '@/components/shared/nav-link';

// Animated underline — CSS only (performant, no JS animation)
<nav className="flex items-center gap-6">
  <NavLink href="/" variant="animated" exact>Home</NavLink>
  <NavLink href="/features/tailwind" variant="animated">Tailwind</NavLink>
  <NavLink href="/features/custom-patterns" variant="animated">Custom Patterns</NavLink>
  <NavLink href="/features/framer-motion" variant="animated">Framer Motion</NavLink>
</nav>

// วิธีทำงาน:
// 1. <span> absolute bottom-0 เป็น underline bar (h-0.5 bg-primary)
// 2. default: scale-x-0 (ซ่อน)
// 3. hover: group-hover:scale-x-100 (ขยายจากซ้ายไปขวา)
// 4. active: scale-x-100 (แสดงเสมอ)
// 5. origin-left → animation เริ่มจากซ้าย
// 6. transition-transform duration-300 → smooth 0.3s`,
  },
];
