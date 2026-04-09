import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { QuizContainer } from '@/components/features/socket/quiz/quiz-container';

import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';

const ITEM_KEY = 'quiz';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item, {
    description: 'Socket.io multiplayer quiz game — create a room, invite friends, answer questions!',
  });
}

export default async function QuizPage() {
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
      <FeatureBreadcrumb category={category} subItem="Mini Kahoot Quiz" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Mini Kahoot Quiz
        </h1>
        <p className="mt-2 text-muted-foreground">
          สร้างห้อง แชร์ Room Code ให้เพื่อน (เปิด tab ใหม่) แล้วแข่งตอบคำถาม!
        </p>
      </div>
      <QuizContainer />
    </div>
  );
}
