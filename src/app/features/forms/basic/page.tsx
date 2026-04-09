import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { BasicForm } from '@/components/features/form/form-pattern/basic-form';
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

const ITEM_KEY = 'basic';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function BasicFormPage() {
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
