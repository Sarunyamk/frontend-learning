import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { ScrollAnimations } from '@/components/features/framer-motion/scroll-animations';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ScrollPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FRAMER_MOTION);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
