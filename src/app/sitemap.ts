import { BASE_URL } from '@/constants/important.constant';
import { ROUTES } from '@/constants/route.constant';
import { BUILD_TIME } from '@/lib/git-buildtime';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(ROUTES);

  return routes.map((route) => ({
    url: `${BASE_URL}${route === ROUTES.HOME ? '' : route}`,
    lastModified: BUILD_TIME,
    changeFrequency: 'monthly' as const,
    priority: route === ROUTES.HOME ? 1 : 0.8,
  }));
}
