import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { QuizContainer } from '@/components/features/socket/quiz/quiz-container';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  return {
    title: `Mini Kahoot Quiz | ${category.label}`,
    description: 'Socket.io multiplayer quiz game — create a room, invite friends, answer questions!',
  };
}

export default async function QuizPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) notFound();

  return (
    <div className="space-y-6">
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
