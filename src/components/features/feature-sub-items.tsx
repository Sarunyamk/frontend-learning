import type { FeatureItem } from '@/lib/api/features';

type FeatureSubItemsProps = {
  items: readonly FeatureItem[];
};

export function FeatureSubItems({ items }: FeatureSubItemsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center justify-between rounded-lg border bg-card p-5"
        >
          <span className="font-medium text-card-foreground">{item.label}</span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            Coming soon
          </span>
        </div>
      ))}
    </div>
  );
}
