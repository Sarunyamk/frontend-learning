import type { Metadata } from 'next';
import { BASE_URL } from '@/constants/important.constant';
import type { FeatureCategoryConfig } from '@/lib/api/features';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/seo.constant';

export function getFeatureMetadata(category: FeatureCategoryConfig): Metadata {
  const title = `${category.label} — ${SITE_NAME}`;
  const url = `${BASE_URL}/features/${category.key}`;

  return {
    title,
    description: category.description,
    openGraph: {
      title,
      description: category.description,
      url,
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: category.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
