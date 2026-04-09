import { AlertMessageSection } from '@/components/features/custom-patterns/modal/alert-message/alert-message-section';
import { ConfirmDialogSection } from '@/components/features/custom-patterns/modal/confirm-dialog/confirm-dialog-section';
import { FormDialogSection } from '@/components/features/custom-patterns/modal/form-dialog/form-dialog-section';
import { InfoSheetSection } from '@/components/features/custom-patterns/modal/info-sheet/info-sheet-section';
import { ModalSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-modal';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'modal';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ModalPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
      <ModalSetupInstall />
      <ConfirmDialogSection />
      <FormDialogSection />
      <InfoSheetSection />
      <AlertMessageSection />
    </div>
  );
}
