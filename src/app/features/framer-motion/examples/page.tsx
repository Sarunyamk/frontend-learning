import { AnimationExamples } from '@/components/features/framer-motion/animation-examples';
import { AnimationReadyToUse } from '@/components/features/framer-motion/animation-ready-to-use';
import { FramerMotionSetupInstall } from '@/components/features/framer-motion/setup-framer-install';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'examples';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ExamplesPage() {
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
      <FramerMotionSetupInstall />
      <AnimationReadyToUse />
      <AnimationExamples />
    </div>
  );
}
