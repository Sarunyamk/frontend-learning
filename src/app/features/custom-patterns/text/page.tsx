import { AnimatedFillText } from '@/components/features/custom-patterns/text/animated-fill/animated-fill-text';
import { ImageFillText } from '@/components/features/custom-patterns/text/image-fill/image-fill-text';
import { TextPrerequisites } from '@/components/features/custom-patterns/text/text-prerequisites';
import { TypeAnimationText } from '@/components/features/custom-patterns/text/type-animation/type-animation-text';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'text';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function TextPatternsPage() {
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
      <FeatureBreadcrumb category={category} subItem="Text" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Text Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม text effect patterns — type animation, image fill text, animated
          fill text พร้อม reusable base components
        </p>
      </div>
      <TextPrerequisites />
      <TypeAnimationText />
      <ImageFillText />
      <AnimatedFillText />
    </div>
  );
}
