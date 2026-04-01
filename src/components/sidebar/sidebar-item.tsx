'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  ClipboardList,
  CreditCard,
  Puzzle,
  Radio,
  Palette,
  Shield,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FeatureCategoryConfig } from '@/constants/feature.constant';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardList,
  CreditCard,
  Puzzle,
  Radio,
  Palette,
  Shield,
  Sparkles,
};

type SidebarItemProps = {
  category: {
    key: FeatureCategoryConfig['key'];
    label: FeatureCategoryConfig['label'];
    icon: FeatureCategoryConfig['icon'];
    path: FeatureCategoryConfig['path'];
    items: FeatureCategoryConfig['items'];
  };
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
};

export function SidebarItem({
  category,
  pathname,
  collapsed,
  onNavigate,
}: SidebarItemProps) {
  const isActive = pathname.startsWith(category.path);
  const [isOpen, setIsOpen] = useState(true);
  const Icon = ICON_MAP[category.icon];

  // Collapsed mode — icon only + tooltip
  if (collapsed) {
    return (
      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={category.path}
              onClick={onNavigate}
              className={cn(
                'flex items-center justify-center rounded-lg px-2 py-2 transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              )}
            >
              {Icon && <Icon className="size-5 shrink-0" />}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{category.label}</TooltipContent>
        </Tooltip>
      </li>
    );
  }

  // Expanded mode — collapsible with sub-items
  return (
    <li>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
          )}
        >
          {Icon && <Icon className="size-4.5 shrink-0" />}
          <span className="flex-1 text-left">{category.label}</span>
          <ChevronRight
            className={cn(
              'size-4 transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-border pl-3">
            {category.items.map((item) => {
              const isItemActive = pathname === item.path;

              return (
                <li key={item.key}>
                  <Link
                    href={item.path}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-lg px-3 py-1.5 text-sm transition-colors',
                      isItemActive
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
