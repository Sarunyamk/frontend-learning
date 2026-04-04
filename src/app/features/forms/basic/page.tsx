import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { BasicForm } from '@/components/features/form/basic-form';
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

export default async function BasicFormPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Basic Form" />
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Basic Form</CardTitle>
            <CardDescription>
              react-hook-form + zod + shadcn — validation, error messages,
              submit state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BasicForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
