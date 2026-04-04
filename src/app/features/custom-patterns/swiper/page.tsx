import { SwiperDemosSection } from '@/components/features/custom-patterns/swiper/swiper-demos-section';
import { SwiperPropsSection } from '@/components/features/custom-patterns/swiper/swiper-props-section';
import { SwiperSourceSection } from '@/components/features/custom-patterns/swiper/swiper-source-section';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function SwiperPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Swiper" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Swiper Carousel
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reusable carousel component รองรับ image slides, custom content
          (renderSlide), และ free-form children — ติดตั้ง:{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            pnpm add swiper
          </code>
        </p>
      </div>
      <SwiperSourceSection />
      <SwiperPropsSection />
      <SwiperDemosSection />
    </div>
  );
}
