import { CursorFollower } from '@/components/features/custom-patterns/cursor-animation/follower/cursor-follower';
import { NeonCursor } from '@/components/features/custom-patterns/cursor-animation/neon/neon-cursor';
import { CursorSpotlight } from '@/components/features/custom-patterns/cursor-animation/spotlight/cursor-spotlight';
import { CursorTrail } from '@/components/features/custom-patterns/cursor-animation/trail/cursor-trail';
import { PageNeonCursor } from '@/components/shared/cursor/page-neon-cursor';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'cursor-animation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function CursorAnimationPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <PageNeonCursor>
      <div className="space-y-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
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
