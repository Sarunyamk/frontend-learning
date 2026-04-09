import { ShikiSetupSteps } from '@/components/features/custom-patterns/code-shiki/shiki-setup-steps';
import { ShikiHowItWorks } from '@/components/features/custom-patterns/code-shiki/shiki-how-it-works';
import { ShikiUsageGuide } from '@/components/features/custom-patterns/code-shiki/shiki-usage-guide';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'code-shiki';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function CodeShikiPage() {
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
