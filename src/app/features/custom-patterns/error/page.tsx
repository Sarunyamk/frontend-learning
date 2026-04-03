import { ErrorCardSection } from '@/components/features/custom-patterns/error/error-card/error-card-section';
import { StatusCodeSection } from '@/components/features/custom-patterns/error/status-code/status-code-section';
import { GlobalErrorSection } from '@/components/features/custom-patterns/error/global-error/global-error-section';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ErrorPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Error" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Error Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          Error handling components — ErrorCard reusable (animated), Status
          Code, Global Error พร้อมใช้งานใน error.tsx ทันที
        </p>
      </div>
      <ErrorCardSection />
      <StatusCodeSection />
      <GlobalErrorSection />
    </div>
  );
}
