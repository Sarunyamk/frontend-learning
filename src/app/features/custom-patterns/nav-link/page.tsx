import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { NavLinkSourceDemo } from '@/components/features/custom-patterns/nav-link/nav-link-source/nav-link-source-demo';
import { BasicIcon } from '@/components/features/custom-patterns/nav-link/basic-icon/basic-icon';
import { ActiveUnderline } from '@/components/features/custom-patterns/nav-link/active-underline/active-underline';
import { ActiveHighlight } from '@/components/features/custom-patterns/nav-link/active-highlight/active-highlight';
import { AnimatedUnderline } from '@/components/features/custom-patterns/nav-link/animated-underline/animated-underline';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function NavLinkPatternsPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Nav Link" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Nav Link Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          รวม navigation link patterns — NavLink reusable component พร้อม
          variant: default, underline, highlight, animated
        </p>
      </div>
      <NavLinkSourceDemo />
      <BasicIcon />
      <ActiveUnderline />
      <ActiveHighlight />
      <AnimatedUnderline />
    </div>
  );
}
