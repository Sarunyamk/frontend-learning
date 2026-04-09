import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { DynamicForm } from '@/components/features/form/form-pattern/dynamic-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'dynamic';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function DynamicFieldsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Dynamic Fields" />
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Dynamic Fields</CardTitle>
            <CardDescription>
              useFieldArray — add/remove members with per-field validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
