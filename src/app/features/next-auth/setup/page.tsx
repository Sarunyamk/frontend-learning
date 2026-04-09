import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { AuthSetupContent } from '@/components/features/next-auth/auth-setup-content';

const ITEM_KEY = 'setup';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function AuthSetupPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Auth Setup" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Auth Setup
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup Auth.js v5 (NextAuth) กับ Next.js — install, config,
          callbacks, type extension
        </p>
      </div>
      <AuthSetupContent />
    </div>
  );
}
