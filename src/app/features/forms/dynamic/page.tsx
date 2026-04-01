import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { DynamicForm } from '@/components/features/form/dynamic-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function DynamicFieldsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
