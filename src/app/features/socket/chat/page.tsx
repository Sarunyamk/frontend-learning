import { notFound } from 'next/navigation';
import { getFeatureCategory, FEATURE_CATEGORY } from '@/lib/api/features';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { ChatRoom } from '@/components/features/socket/chat/chat-room';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  return {
    title: `Real-time Chat | ${category.label}`,
    description: 'Socket.io real-time chat demo — join a room and chat across browser tabs',
  };
}

export default async function ChatPage() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <FeatureBreadcrumb category={category} subItem="Real-time Chat" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Real-time Chat
        </h1>
        <p className="mt-2 text-muted-foreground">
          Socket.io chat demo — เปิด 2 tabs แล้วกรอก Room ID เดียวกันเพื่อทดสอบแชท
        </p>
      </div>
      <ChatRoom />
    </div>
  );
}
