import { NotFoundCard } from '@/components/shared/base-page/not-found-card';
import { ROUTES } from '@/constants/route.constant';

export default function NotFoundPage() {
  return <NotFoundCard backHref={ROUTES.HOME} />;
}
