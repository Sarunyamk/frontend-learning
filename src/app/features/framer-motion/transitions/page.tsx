import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { PageTransitions } from '@/components/features/framer-motion/page-transitions';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function TransitionsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
    </div>
  );
}
