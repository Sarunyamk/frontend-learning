import { FloatingParticles } from '@/components/features/custom-patterns/background-animation/floating-particles/floating-particles';
import { GradientMesh } from '@/components/features/custom-patterns/background-animation/gradient-mesh/gradient-mesh';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function BackgroundAnimationPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
