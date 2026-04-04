import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { TokenShowcase } from '@/components/features/tailwind/token-showcase';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function TokensPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Setup Tokens" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Setup Tokens
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup semantic color tokens ใน Tailwind CSS v4 — CSS Variable + @theme inline
        </p>
      </div>
      <TokenShowcase />
    </div>
  );
}
