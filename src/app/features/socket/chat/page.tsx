import { ChatRoom } from '@/components/features/socket/chat/chat-room';
import { FeatureBreadcrumb } from '@/components/shared/ui-primitives/feature-breadcrumb';
import { FEATURE_CATEGORY, getFeatureCategory } from '@/lib/api/features';
import { getFeatureItemMetadata } from '@/lib/seo/features-metadata';
import { buildFeatureBreadcrumb } from '@/lib/utils/build-jsonLd.helper';
import { notFound } from 'next/navigation';

const ITEM_KEY = 'chat';

export async function generateMetadata() {
  const category = await getFeatureCategory(FEATURE_CATEGORY.SOCKET);
  if (!category) return {};
  const item = category.items.find((i) => i.key === ITEM_KEY);
  if (!item) return {};
  return getFeatureItemMetadata(category, item, {
    description:
      'Socket.io multiplayer chat demo — join a room and chat across browser tabs',
  });
}

export default async function ChatPage() {
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
      <FeatureBreadcrumb category={category} subItem="Real-time Chat" />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Real-time Chat
        </h1>
        <p className="mt-2 text-muted-foreground">
          Socket.io chat demo — เปิด 2 tabs แล้วกรอก Room ID
          เดียวกันเพื่อทดสอบแชท
        </p>
      </div>
      <ChatRoom />
    </div>
  );
}
