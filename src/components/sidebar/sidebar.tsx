'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Menu, PanelLeftClose, PanelLeftOpen, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarNav } from './sidebar-nav';

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      {/* Mobile sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b px-4 py-4">
            <SheetTitle className="flex items-center gap-2 text-left">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="size-4" />
              </div>
              Learning Fullstack
            </SheetTitle>
          </SheetHeader>
          <SidebarNav
            pathname={pathname}
            collapsed={false}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex md:flex-col border-r bg-background transition-all duration-200',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b px-3">
          {!collapsed && (
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold"
            >
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="size-4" />
              </div>
              Learning Fullstack
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <SidebarNav pathname={pathname} collapsed={collapsed} />
      </aside>
    </TooltipProvider>
  );
}
