import { BasicPaginationSection } from '@/components/features/custom-patterns/pagination/basic/basic-section';
import { InfiniteScrollSection } from '@/components/features/custom-patterns/pagination/infinite-scroll/infinite-scroll-section';
import { LoadMoreSection } from '@/components/features/custom-patterns/pagination/load-more/load-more-section';
import { WithSizeSection } from '@/components/features/custom-patterns/pagination/with-size/with-size-section';
import { PaginationSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-pagination';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'pagination';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function PaginationPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
