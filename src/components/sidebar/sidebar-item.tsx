'use client';

import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { FeatureCategoryConfig } from '@/constants/feature.constant';

type SidebarItemProps = {
  category: {
    key: FeatureCategoryConfig['key'];
    label: FeatureCategoryConfig['label'];
    path: FeatureCategoryConfig['path'];
    items: FeatureCategoryConfig['items'];
  };
};

export function SidebarItem({ category }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(category.path);

  return (
    <Collapsible defaultOpen={isActive} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            {category.label}
            <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {category.items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={pathname === item.path}>
                    <Link href={item.path}>{item.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
