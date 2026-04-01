import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { FeatureSubItems } from '@/components/features/feature-sub-items';
import { READY_CUSTOM_PATTERNS_PATHS } from '@/constants/route.constant';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

/** Unique group names in order of appearance */
function getGroups(items: readonly { group?: string }[]): string[] {
  const seen = new Set<string>();
  const groups: string[] = [];
  for (const item of items) {
    if (item.group && !seen.has(item.group)) {
      seen.add(item.group);
      groups.push(item.group);
    }
  }
  return groups;
}

export default async function CustomPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  const groups = getGroups(category.items);

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {category.label}
        </h1>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      </div>

      {groups.map((group) => {
        const groupItems = category.items.filter((item) => item.group === group);
        return (
          <div key={group} className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{group}</h2>
            <FeatureSubItems
              items={groupItems}
              readyPaths={READY_CUSTOM_PATTERNS_PATHS}
            />
          </div>
        );
      })}
    </div>
  );
}
