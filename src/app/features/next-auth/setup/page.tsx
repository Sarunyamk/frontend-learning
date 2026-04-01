import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { FeatureBreadcrumb } from '@/components/shared/feature-breadcrumb';
import { AuthSetupContent } from '@/components/features/next-auth/auth-setup-content';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function AuthSetupPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Auth Setup" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Auth Setup
        </h1>
        <p className="mt-2 text-muted-foreground">
          วิธี setup Auth.js v5 (NextAuth) กับ Next.js — install, config,
          callbacks, type extension
        </p>
      </div>
      <AuthSetupContent />
    </div>
  );
}
