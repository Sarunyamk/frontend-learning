import { FloatingParticles } from '@/components/features/custom-patterns/background-animation/floating-particles/floating-particles';
import { GradientMesh } from '@/components/features/custom-patterns/background-animation/gradient-mesh/gradient-mesh';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'background-animation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function BackgroundAnimationPage() {
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
      <FeatureBreadcrumb category={category} subItem="Background" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Background Animation
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม background effect patterns — Gradient Mesh (CSS keyframes) และ
          Floating Particles (Framer Motion) พร้อม config ปรับแต่งได้
        </p>
      </div>
      <GradientMesh />
      <FloatingParticles />
    </div>
  );
}
