import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { GoogleOAuthContent } from '@/components/features/next-auth/google-oauth-content';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function GoogleOAuthPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Google OAuth" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Google OAuth
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธีเพิ่ม Google OAuth provider — สร้าง credentials, เพิ่ม provider,
          sign-in flow
        </p>
      </div>
      <GoogleOAuthContent />
    </div>
  );
}
