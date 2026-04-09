import { FontSetupSteps } from '@/components/features/custom-patterns/font-setting/font-setup-steps';
import { FontHowItWorks } from '@/components/features/custom-patterns/font-setting/font-how-it-works';
import { FontUsageGuide } from '@/components/features/custom-patterns/font-setting/font-usage-guide';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'font-setting';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function FontSettingPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Font Setting" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Font Setting — next/font Setup
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup font ใน Next.js — แยก config เป็น lib, ใช้ semantic token,
          รองรับ Google Font + Local Font
        </p>
      </div>
      <FontSetupSteps />
      <FontHowItWorks />
      <FontUsageGuide />
    </div>
  );
}
