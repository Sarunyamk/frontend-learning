import { FeatureCard } from '@/components/home/feature-card';
import { FEATURE_CATEGORIES } from '@/constants/feature.constant';
import { testLoading } from '@/lib/utils/loading.helper';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo/seo.constant';
import { BASE_URL } from '@/constants/important.constant';

const title = `Features — ${SITE_NAME}`;
const description =
  'เลือกหัวข้อที่สนใจ แต่ละ feature มีตัวอย่างและคำอธิบายให้เรียนรู้';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/features`,
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function FeaturesPage() {
  await testLoading(3000);
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
        Features
      </h1>
      <p className="mb-8 text-muted-foreground">
        เลือกหัวข้อที่สนใจ แต่ละ feature มีตัวอย่างและคำอธิบายให้เรียนรู้
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CATEGORIES.map((category, index) => (
          <FeatureCard
            key={category.key}
            label={category.label}
            description={category.description}
            icon={category.icon}
            path={category.path}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
