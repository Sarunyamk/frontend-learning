import { NotFoundCardSection } from '@/components/features/custom-patterns/not-found/not-found-card/not-found-card-section';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function NotFoundPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Not Found" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Not Found Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          404 page component — NotFoundCard reusable พร้อมใช้งานใน
          not-found.tsx ทันที
        </p>
      </div>
      <NotFoundCardSection />
    </div>
  );
}
