import { BASE_DESCRIPTION, BASE_URL } from '@/constants/important.constant';
import { SITE_NAME } from '@/lib/seo/seo.constant';

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: BASE_DESCRIPTION,
    inLanguage: 'th',
  };
}

export function getSoftwareJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    url: BASE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: BASE_DESCRIPTION,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}
type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
