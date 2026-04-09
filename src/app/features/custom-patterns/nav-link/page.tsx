import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { NavLinkSourceDemo } from '@/components/features/custom-patterns/nav-link/nav-link-source/nav-link-source-demo';
import { BasicIcon } from '@/components/features/custom-patterns/nav-link/basic-icon/basic-icon';
import { ActiveUnderline } from '@/components/features/custom-patterns/nav-link/active-underline/active-underline';
import { ActiveHighlight } from '@/components/features/custom-patterns/nav-link/active-highlight/active-highlight';
import { AnimatedUnderline } from '@/components/features/custom-patterns/nav-link/animated-underline/animated-underline';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'nav-link';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function NavLinkPatternsPage() {
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
