import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { FeatureBreadcrumb } from '@/components/features/feature-breadcrumb';
import { StockDashboard } from '@/components/features/socket/stock/stock-dashboard';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  return {
    title: `Stock Ticker | ${category.label}`,
    description: 'Socket.io real-time stock ticker demo — mock price updates every 2 seconds',
  };
}

export default async function StockPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
