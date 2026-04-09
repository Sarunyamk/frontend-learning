import { TableSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-table';
import { BasicTableSection } from '@/components/features/custom-patterns/table-action/basic/basic-section';
import { ColumnSearchSection } from '@/components/features/custom-patterns/table-action/column-search/column-search-section';
import { ExpandableSection } from '@/components/features/custom-patterns/table-action/expandable/expandable-section';
import { RowActionsSection } from '@/components/features/custom-patterns/table-action/row-actions/row-actions-section';
import { RowSelectionSection } from '@/components/features/custom-patterns/table-action/row-selection/row-selection-section';
import { SortableSection } from '@/components/features/custom-patterns/table-action/sortable/sortable-section';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'table-action';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function TableActionPage() {
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
      <FeatureBreadcrumb category={category} subItem="Table Action" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Table Action Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          Data table patterns — DataTable reusable component คู่กับ Pagination,
          Search/Filter, Sortable, Row Actions, Row Selection, Expandable Rows
        </p>
      </div>
      <TableSetupInstall />
      <BasicTableSection />
      <ColumnSearchSection />
      <SortableSection />
      <ExpandableSection />
      <RowActionsSection />
      <RowSelectionSection />
    </div>
  );
}
