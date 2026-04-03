import { FontSetupSteps } from '@/components/features/custom-patterns/font-setting/font-setup-steps';
import { FontHowItWorks } from '@/components/features/custom-patterns/font-setting/font-how-it-works';
import { FontUsageGuide } from '@/components/features/custom-patterns/font-setting/font-usage-guide';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function FontSettingPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
