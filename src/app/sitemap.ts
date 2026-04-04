import { BASE_URL } from '@/constants/important.constant';
import { ROUTES } from '@/constants/route.constant';
import { BUILD_TIME } from '@/lib/git-buildtime';
import type { MetadataRoute } from 'next';

function getRoutePriority(route: string): number {
  if (route === '/') return 1.0;

  const depth = route.split('/').filter(Boolean).length;

  if (depth === 1) return 0.9; // /about, /contact, /features
  if (depth === 2) return 0.7; // /features/payment, /features/socket
  return 0.5; // /features/payment/stripe (leaf pages)
}

function getChangeFrequency(
  route: string,
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  if (route === '/') return 'weekly';
  if (route.split('/').filter(Boolean).length <= 1) return 'monthly';
  return 'monthly';
}

const EXCLUDED_PREFIXES = [
  '/features/payment',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(ROUTES).filter(
    (route) => !EXCLUDED_PREFIXES.some((prefix) => route.startsWith(prefix)),
  );

  return routes.map((route) => ({
    url: `${BASE_URL}${route === ROUTES.HOME ? '' : route}`,
    lastModified: BUILD_TIME,
    changeFrequency: getChangeFrequency(route),
    priority: getRoutePriority(route),
  }));
}
