import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { ThemeLiveDemo } from '@/components/features/tailwind/theme-live-demo';
import { ThemeSetupGuide } from '@/components/features/tailwind/theme-setup-guide';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ThemesPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.TAILWIND);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
