import { CursorFollower } from '@/components/features/custom-patterns/cursor-animation/follower/cursor-follower';
import { NeonCursor } from '@/components/features/custom-patterns/cursor-animation/neon/neon-cursor';
import { CursorSpotlight } from '@/components/features/custom-patterns/cursor-animation/spotlight/cursor-spotlight';
import { CursorTrail } from '@/components/features/custom-patterns/cursor-animation/trail/cursor-trail';
import { PageNeonCursor } from '@/components/shared/cursor/page-neon-cursor';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function CursorAnimationPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <PageNeonCursor>
      <div className="space-y-6">
        <FeatureBreadcrumb category={category} subItem="Cursor" />
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Cursor Animation
          </h1>
          <p className="mt-2 text-muted-foreground">
            รวม cursor effect patterns — follower, spotlight, trail ใช้ Framer
            Motion + CSS รองรับ custom icon และ element
          </p>
        </div>
        <CursorFollower />
        <CursorSpotlight />
        <CursorTrail />
        <NeonCursor />
      </div>
    </PageNeonCursor>
  );
}
