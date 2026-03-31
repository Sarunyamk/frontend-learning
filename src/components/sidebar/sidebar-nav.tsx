'use client';

import { Separator } from '@/components/ui/separator';
import { FEATURE_CATEGORIES } from '@/constants/feature.constant';
import { SidebarItem } from './sidebar-item';

type SidebarNavProps = {
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function SidebarNav({ pathname, collapsed, onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-3">
      {!collapsed && (
        <p className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Features
        </p>
      )}
      {collapsed && <Separator className="my-2" />}
      <ul className="space-y-0.5">
        {FEATURE_CATEGORIES.map((category) => (
          <SidebarItem
            key={category.key}
            category={{
              key: category.key,
              label: category.label,
              icon: category.icon,
              path: category.path,
              items: category.items,
            }}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}
