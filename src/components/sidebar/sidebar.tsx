import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { FEATURE_CATEGORIES } from '@/constants/feature.constant';
import { SidebarItem } from './sidebar-item';

export function AppSidebar() {
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <span className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Features
        </span>
      </SidebarHeader>
      <SidebarContent>
        {FEATURE_CATEGORIES.map((category) => (
          <SidebarItem
            key={category.key}
            category={{
              key: category.key,
              label: category.label,
              path: category.path,
              items: category.items,
            }}
          />
        ))}
      </SidebarContent>
    </ShadcnSidebar>
  );
}
