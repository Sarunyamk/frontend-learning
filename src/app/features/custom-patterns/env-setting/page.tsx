import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { EnvOverview } from '@/components/features/custom-patterns/env-setting/env-overview/env-overview';
import { ServerEnv } from '@/components/features/custom-patterns/env-setting/server-env/server-env';
import { ClientEnv } from '@/components/features/custom-patterns/env-setting/client-env/client-env';
import { DotenvStructure } from '@/components/features/custom-patterns/env-setting/dotenv-structure/dotenv-structure';
import { TypeSafeUsage } from '@/components/features/custom-patterns/env-setting/type-safe-usage/type-safe-usage';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'env-setting';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.CUSTOM_PATTERNS);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function EnvSettingPage() {
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
      <FeatureBreadcrumb category={category} subItem="Env Setting" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Env Setting
        </h1>
        <p className="mt-2 text-muted-foreground">
          Environment variable validation ด้วย Zod + server-only — fail fast
          ตอน startup, type-safe ตลอด project
        </p>
      </div>
      <EnvOverview />
      <ServerEnv />
      <ClientEnv />
      <DotenvStructure />
      <TypeSafeUsage />
    </div>
  );
}
