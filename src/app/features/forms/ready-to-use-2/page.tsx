import { FormFieldReadyToUse } from '@/components/features/form/field-pattern/form-ready-to-use';
import { FormFieldSetupInstall } from '@/components/features/form/field-pattern/setup-form-install';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function FormReadyToUsePagePattern2() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Ready to Use" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Ready to Use form pattern (use field pattern)
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reusable form components with field พร้อม copy ไปใช้ — react-hook-form + zod +
          shadcn/ui
        </p>
      </div>
      <FormFieldSetupInstall />
      <FormFieldReadyToUse />
    </div>
  );
}
