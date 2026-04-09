import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ToastReuseDemo } from '@/components/features/custom-patterns/toast/toast-reuse/toast-reuse-demo';
import { ActionToast } from '@/components/features/custom-patterns/toast/action/action-toast';
import { PromiseToast } from '@/components/features/custom-patterns/toast/promise/promise-toast';
import { CustomToast } from '@/components/features/custom-patterns/toast/custom/custom-toast';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';
import { ToastSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-sonner';

const ITEM_KEY = 'toast';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ToastPatternsPage() {
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
      <FeatureBreadcrumb category={category} subItem="Toast" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Toast Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม toast patterns — showToast reusable function พร้อม action,
          promise, custom styles
        </p>
      </div>
      <ToastSetupInstall/>
      <ToastReuseDemo />
      <ActionToast />
      <PromiseToast />
      <CustomToast />
    </div>
  );
}
