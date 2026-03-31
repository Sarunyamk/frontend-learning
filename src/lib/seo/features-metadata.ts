import type { Metadata } from 'next';
import { BASE_URL } from '@/constants/important.constant';
import type { FeatureCategoryConfig } from '@/lib/api/features';

export function getFeatureMetadata(category: FeatureCategoryConfig): Metadata {
  const title = `${category.label} — Learning Fullstack`;
  const url = `${BASE_URL}/features/${category.key}`;

  return {
    title,
    description: category.description,
    openGraph: {
      title,
      description: category.description,
      url,
      type: 'website',
    },
  };
}
