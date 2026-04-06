import { BasicPaginationSection } from '@/components/features/custom-patterns/pagination/basic/basic-section';
import { InfiniteScrollSection } from '@/components/features/custom-patterns/pagination/infinite-scroll/infinite-scroll-section';
import { LoadMoreSection } from '@/components/features/custom-patterns/pagination/load-more/load-more-section';
import { WithSizeSection } from '@/components/features/custom-patterns/pagination/with-size/with-size-section';
import { PaginationSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-pagination';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function PaginationPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Pagination" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Pagination Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reusable pagination components — Basic, Per-page size, Load more,
          Infinite scroll พร้อมใช้งานทันที
        </p>
      </div>
      <PaginationSetupInstall />
      <BasicPaginationSection />
      <WithSizeSection />
      <LoadMoreSection />
      <InfiniteScrollSection />
    </div>
  );
}
