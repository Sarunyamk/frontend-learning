import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { auth } from '@/lib/auth/auth';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { ClientSessionCard } from '@/components/features/next-auth/client-session-card';
import { SessionContent } from '@/components/features/next-auth/session-content';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function SessionPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();

  // ไม่ redirect — แสดง null ถ้าไม่ login (เพื่อ demo ความต่าง)
  const session = await auth();

  return (
    <div className="space-y-6">
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
