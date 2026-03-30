import 'server-only';

import {
  FEATURE_CATEGORIES,
  FEATURE_CATEGORY,
  type FeatureCategory,
  type FeatureCategoryConfig,
} from '@/constants/feature.constant';

// TODO: swap เป็น fetch(env.API_URL + '/features', { next: { tags: ['features'] } }) เมื่อมี backend
export async function getFeatureCategories(): Promise<
  readonly FeatureCategoryConfig[]
> {
  return FEATURE_CATEGORIES;
}

// TODO: swap เป็น fetch(env.API_URL + `/features/${key}`, { next: { tags: ['features', key] } }) เมื่อมี backend
export async function getFeatureCategory(
  key: FeatureCategory,
): Promise<FeatureCategoryConfig | undefined> {
  return FEATURE_CATEGORIES.find((cat) => cat.key === key);
}

export { FEATURE_CATEGORY };
export type { FeatureCategory, FeatureCategoryConfig };
