import { BASE_URL } from '@/constants/important.constant';
import type { FeatureCategoryConfig, FeatureItem } from '@/lib/api/features';
import { DEFAULT_OG_IMAGE } from '@/lib/seo/seo.constant';
import type { Metadata } from 'next';

export function getFeatureMetadata(category: FeatureCategoryConfig): Metadata {
  const title = `${category.label} in Next.js (Reusable Component)`;
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
    alternates: {
      canonical: url,
    },
  };
}

export function getFeatureItemMetadata(
  category: FeatureCategoryConfig,
  item: Pick<FeatureItem, 'label' | 'path'>,
  overrides?: { description?: string },
): Metadata {
  const title = `${item.label} — ${category.label} in Next.js`;
  const description = overrides?.description ?? category.description;
  const url = `${BASE_URL}${item.path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    alternates: {
      canonical: url,
    },
  };
}
