import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { TokenShowcase } from '@/components/features/tailwind/token-showcase';

const ITEM_KEY = 'tokens';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function TokensPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
