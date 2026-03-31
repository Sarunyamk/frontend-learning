import type { FeatureItem } from '@/lib/api/features';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type FeatureSubItemsProps = {
  items: readonly FeatureItem[];
  readyPaths?: readonly string[];
};

export function FeatureSubItems({ items, readyPaths = [] }: FeatureSubItemsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const isReady = readyPaths.includes(item.path);

        if (isReady) {
          return (
            <Link
              key={item.key}
              href={item.path}
              className="group flex items-center justify-between rounded-lg border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <span className="font-medium text-card-foreground">
                {item.label}
              </span>
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          );
        }

        return (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-lg border bg-card p-5"
          >
            <span className="font-medium text-card-foreground">
              {item.label}
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              Coming soon
            </span>
          </div>
        );
      })}
    </div>
  );
}
