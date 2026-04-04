import type { FeatureItem } from '@/lib/api/features';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type FeatureSubItemsProps = {
  items: readonly FeatureItem[];
};

export function FeatureSubItems({ items }: FeatureSubItemsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.path}
          className="group flex items-center justify-between rounded-lg border bg-card p-5 transition-colors hover:border-2 hover:border-hover-blue"
        >
          <span className="font-medium text-card-foreground">{item.label}</span>
          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}
