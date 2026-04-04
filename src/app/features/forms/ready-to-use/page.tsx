import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FormReadyToUse } from '@/components/features/form/form-ready-to-use';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function FormReadyToUsePage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Ready to Use" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to Use
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reusable form components พร้อม copy ไปใช้ — react-hook-form + zod +
          shadcn/ui
        </p>
      </div>
      <FormReadyToUse />
    </div>
  );
}
