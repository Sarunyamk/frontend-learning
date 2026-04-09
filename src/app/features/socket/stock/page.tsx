import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { StockDashboard } from '@/components/features/socket/stock/stock-dashboard';

import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';

const ITEM_KEY = 'stock';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item, {
    description: 'Socket.io real-time stock ticker demo — mock price updates every 2 seconds',
  });
}

export default async function StockPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Stock Ticker" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Stock Ticker
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real-time mock stock prices — อัปเดตทุก 2 วินาทีผ่าน Socket.io
        </p>
      </div>
      <StockDashboard />
    </div>
  );
}
