import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { AnimationExamples } from '@/components/features/framer-motion/animation-examples';
import { AnimationReadyToUse } from '@/components/features/framer-motion/animation-ready-to-use';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ExamplesPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Animation Examples" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Animation Examples
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม animation presets ที่ใช้บ่อย — fade, slide, dropdown, stagger
          พร้อมตัวอย่างโค้ดและ live demo
        </p>
      </div>
      <AnimationReadyToUse />
      <AnimationExamples />
    </div>
  );
}
