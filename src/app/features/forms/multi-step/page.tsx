import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { MultiStepForm } from '@/components/features/form/form-pattern/multi-step-form';
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

export default async function MultiStepFormPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Multi-step Form" />
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Multi-step Form</CardTitle>
            <CardDescription>
              Wizard pattern — per-step validation, progress bar, back/next
              navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultiStepForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
