import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { auth } from '@/lib/auth/auth';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ClientSessionCard } from '@/components/features/next-auth/client-session-card';
import { SessionContent } from '@/components/features/next-auth/session-content';

const ITEM_KEY = 'session';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item);
}

export default async function SessionPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();
  const item = category.items.find((i) => i.key === ITEM_KEY);
  const breadcrumbJsonLd = buildFeatureBreadcrumb(category, item);

  // ไม่ redirect — แสดง null ถ้าไม่ login (เพื่อ demo ความต่าง)
  const session = await auth();

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FeatureBreadcrumb category={category} subItem="Session Info" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Session Info
        </h1>
        <p className="mt-2 text-muted-foreground">
          เปรียบเทียบ Server session (auth()) กับ Client session (useSession())
          — ลอง login/logout ดูผลลัพธ์
        </p>
      </div>
      <SessionContent session={session} />
      <ClientSessionCard />
    </div>
  );
}
