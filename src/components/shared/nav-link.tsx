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
    active:
      'text-foreground underline underline-offset-4 decoration-primary decoration-2',
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
}
