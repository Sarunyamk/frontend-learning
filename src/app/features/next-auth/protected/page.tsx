import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { getFeatureMetadata } from '@/lib/seo/features-metadata';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ProtectedContent } from '@/components/features/next-auth/protected-content';
import type { UserRole } from '@/constants/role.constant';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) return {};
  return getFeatureMetadata(category);
}

export default async function ProtectedPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.NEXT_AUTH);
  if (!category) notFound();

  // proxy.ts guard แล้ว — session ต้องมี
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Protected & RBAC" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Protected & RBAC
        </h1>
        <p className="mt-2 text-muted-foreground">
          หน้านี้ถูก guard ด้วย proxy.ts (cookie check) + getCurrentUser()
          (server-side session) — ลอง logout แล้วเข้าใหม่
        </p>
      </div>
      <ProtectedContent
        user={{
          name: user.name ?? '',
          email: user.email ?? '',
          role: user.role as UserRole,
        }}
      />
    </div>
  );
}
