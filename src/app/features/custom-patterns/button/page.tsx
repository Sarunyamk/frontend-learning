import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { BasicButtons } from '@/components/features/custom-patterns/button/basic/basic-buttons';
import { GradientButtons } from '@/components/features/custom-patterns/button/gradient/gradient-buttons';
import { IconTextButtons } from '@/components/features/custom-patterns/button/icon/icon-text-buttons';
import { LoadingButton } from '@/components/features/custom-patterns/button/loading/loading-button';
import { ShimmerButton } from '@/components/features/custom-patterns/button/shimmer/shimmer-button';
import { MagneticButton } from '@/components/features/custom-patterns/button/magnetic/magnetic-button';
import { GlowButtons } from '@/components/features/custom-patterns/button/shadow/glow-buttons';
import { CopyButtonDemo } from '@/components/features/custom-patterns/button/copy-button/copy-button-demo';
import { SocialButtons } from '@/components/features/custom-patterns/button/social/social-buttons';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';
import { ButtonSetupInstall } from '@/components/features/custom-patterns/setup-install-section/install-button';

const ITEM_KEY = 'button';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ButtonPatternsPage() {
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
      <FeatureBreadcrumb category={category} subItem="Button" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Button Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม button patterns ที่ใช้บ่อย — copy-paste ready พร้อม live demo
        </p>
      </div>
      <ButtonSetupInstall />
      <BasicButtons />
      <GradientButtons />
      <IconTextButtons />
      <LoadingButton />
      <ShimmerButton />
      <MagneticButton />
      <GlowButtons />
      <CopyButtonDemo />
      <SocialButtons />
    </div>
  );
}
