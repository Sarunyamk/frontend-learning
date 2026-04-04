import { NAV_ITEMS } from '@/constants/navigation.constant';
import { ROUTES } from '@/constants/route.constant';
import { NavLink } from '@/components/shared/ui-primitives/nav-link';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Link href={ROUTES.HOME} className="text-xl font-bold">
              BRAND
            </Link>
            <p className="text-sm text-muted-foreground">
              Your project description here.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.key} href={item.path}>
                  {item.key}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>email@example.com</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {currentYear} MY LEARNING. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
