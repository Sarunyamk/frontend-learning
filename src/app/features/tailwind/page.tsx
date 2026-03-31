import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { FeatureSubItems } from '@/components/features/feature-sub-items';
import { READY_TAILWIND_PATHS } from '@/constants/route.constant';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function TailwindPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {category.label}
        </h1>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      </div>
      <FeatureSubItems
        items={category.items}
        readyPaths={READY_TAILWIND_PATHS}
      />
    </div>
  );
}
