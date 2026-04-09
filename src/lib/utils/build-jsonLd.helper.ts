import { BASE_URL } from '@/constants/important.constant';
import { getBreadcrumbJsonLd } from '../seo/json-ld';

export function buildFeatureBreadcrumb(
  category: { label: string; key: string },
  subItem?: { label: string; path: string },
) {
  const items = [
    { name: 'Home', url: BASE_URL },
    { name: 'Features', url: `${BASE_URL}/features` },
    { name: category.label, url: `${BASE_URL}/features/${category.key}` },
  ];

  if (subItem) {
    items.push({ name: subItem.label, url: `${BASE_URL}${subItem.path}` });
  }

  return getBreadcrumbJsonLd(items);
}
