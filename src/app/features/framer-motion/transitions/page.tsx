import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { PageTransitions } from '@/components/features/framer-motion/page-transitions';
import { TransitionReadyToUse } from '@/components/features/framer-motion/transition-ready-to-use';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'transitions';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function TransitionsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Page Transitions" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Page Transitions
        </h1>
        <p className="mt-2 text-muted-foreground">
          AnimatePresence, mode options และ exit animations —
          จัดการ enter/exit ของ elements
        </p>
      </div>
      <PageTransitions />
      <TransitionReadyToUse />
    </div>
  );
}
