import { FormFieldReadyToUse } from '@/components/features/form/field-pattern/form-ready-to-use';
import { FormFieldSetupInstall } from '@/components/features/form/field-pattern/setup-form-install';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'ready-to-use-2';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.FORMS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function FormReadyToUsePagePattern2() {
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
