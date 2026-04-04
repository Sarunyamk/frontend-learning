import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ConfirmDialogSection } from '@/components/features/custom-patterns/modal/confirm-dialog/confirm-dialog-section';
import { FormDialogSection } from '@/components/features/custom-patterns/modal/form-dialog/form-dialog-section';
import { InfoSheetSection } from '@/components/features/custom-patterns/modal/info-sheet/info-sheet-section';
import { AlertMessageSection } from '@/components/features/custom-patterns/modal/alert-message/alert-message-section';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ModalPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Modal" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Modal Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reusable modal components — ConfirmDialog, FormDialog, InfoSheet,
          AlertMessage พร้อมใช้งานทันที
        </p>
      </div>
      <ConfirmDialogSection />
      <FormDialogSection />
      <InfoSheetSection />
      <AlertMessageSection />
    </div>
  );
}
