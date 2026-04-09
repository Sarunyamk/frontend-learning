import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ThemeLiveDemo } from '@/components/features/tailwind/theme-live-demo';
import { ThemeSetupGuide } from '@/components/features/tailwind/theme-setup-guide';

const ITEM_KEY = 'themes';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function ThemesPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Setup Themes" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Setup Themes
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup dark/light mode ใน Next.js + Tailwind v4 — ตั้งแต่ install จนใช้งานได้
        </p>
      </div>
      <ThemeSetupGuide />
      <ThemeLiveDemo />
    </div>
  );
}
