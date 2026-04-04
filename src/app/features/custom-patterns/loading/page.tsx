import { DotsLoading } from '@/components/features/custom-patterns/loading/dots/dots-loading';
import { FancyLoading } from '@/components/features/custom-patterns/loading/fancy/fancy-loading';
import { LoadingScreenDemo } from '@/components/features/custom-patterns/loading/loading-screen/loading-screen-demo';
import { SkeletonLoading } from '@/components/features/custom-patterns/loading/skeleton/skeleton-loading';
import { SpinnerLoading } from '@/components/features/custom-patterns/loading/spinner/spinner-loading';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function LoadingPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Loading" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Loading Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม loading patterns ที่ใช้บ่อย — LoadingScreen reusable component
          พร้อม variant ต่างๆ สำหรับใช้ใน loading.tsx
        </p>
      </div>
      <LoadingScreenDemo />
      <SpinnerLoading />
      <SkeletonLoading />
      <DotsLoading />
      <FancyLoading />
    </div>
  );
}
