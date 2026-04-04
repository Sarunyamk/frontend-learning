import { BasicTableSection } from '@/components/features/custom-patterns/table-action/basic/basic-section';
import { ColumnSearchSection } from '@/components/features/custom-patterns/table-action/column-search/column-search-section';
import { SortableSection } from '@/components/features/custom-patterns/table-action/sortable/sortable-section';
import { ExpandableSection } from '@/components/features/custom-patterns/table-action/expandable/expandable-section';
import { RowActionsSection } from '@/components/features/custom-patterns/table-action/row-actions/row-actions-section';
import { RowSelectionSection } from '@/components/features/custom-patterns/table-action/row-selection/row-selection-section';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function TableActionPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
      <BasicTableSection />
      <ColumnSearchSection />
      <SortableSection />
      <ExpandableSection />
      <RowActionsSection />
      <RowSelectionSection />
    </div>
  );
}
