import { ShikiSetupSteps } from '@/components/features/custom-patterns/code-shiki/shiki-setup-steps';
import { ShikiHowItWorks } from '@/components/features/custom-patterns/code-shiki/shiki-how-it-works';
import { ShikiUsageGuide } from '@/components/features/custom-patterns/code-shiki/shiki-usage-guide';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function CodeShikiPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Code Shiki" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Code Shiki — Syntax Highlighting
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup Shiki syntax highlighter สำหรับ Next.js — ตั้งแต่ install
          จนใช้งานได้
        </p>
      </div>
      <ShikiSetupSteps />
      <ShikiHowItWorks />
      <ShikiUsageGuide />
    </div>
  );
}
