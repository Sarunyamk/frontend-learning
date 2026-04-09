import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ScrollAnimations } from '@/components/features/framer-motion/scroll-animations';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'scroll';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ScrollPage() {
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
      <FeatureBreadcrumb category={category} subItem="Scroll Animations" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Scroll Animations
        </h1>
        <p className="mt-2 text-muted-foreground">
          whileInView, viewport options และ stagger on scroll — animate elements
          เมื่อ scroll เข้ามาใน viewport
        </p>
      </div>
      <ScrollAnimations />
    </div>
  );
}
