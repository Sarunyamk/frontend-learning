import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { FeatureSubItems } from '@/components/features/feature-sub-items';
import { READY_SOCKET_PATHS } from '@/constants/route.constant';
import { SocketTutorial } from '@/components/features/socket/socket-tutorial';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function SocketPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) notFound();

  return (
    <div className="space-y-8">
      <FeatureBreadcrumb category={category} />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {category.label}
        </h1>
        <p className="mt-2 text-muted-foreground">{category.description}</p>
      </div>

      {/* Demo pages */}
      <FeatureSubItems items={category.items} readyPaths={READY_SOCKET_PATHS} />

      {/* Tutorial section */}
      <SocketTutorial />
    </div>
  );
}
