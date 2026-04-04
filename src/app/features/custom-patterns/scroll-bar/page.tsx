import { ScrollProgress } from '@/components/features/custom-patterns/scroll-bar/progress/scroll-progress';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ScrollBarPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Scroll Bar" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Scroll Bar Animation
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม scroll progress bar patterns — จาก basic ไปจนถึง particle effects
          และ gradient animation ใช้ Framer Motion useScroll
        </p>
      </div>
      <ScrollProgress />
    </div>
  );
}
