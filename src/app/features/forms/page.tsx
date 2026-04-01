import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { FeatureSubItems } from '@/components/shared/feature-sub-items';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function FormsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
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
      <FeatureSubItems items={category.items} />
    </div>
  );
}
