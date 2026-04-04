import { FeatureCard } from '@/components/home/feature-card';
import { FEATURE_CATEGORIES } from '@/constants/feature.constant';
import { testLoading } from '@/lib/utils/loading.helper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — Learning Fullstack',
  description:
    'เลือกหัวข้อที่สนใจ แต่ละ feature มีตัวอย่างและคำอธิบายให้เรียนรู้',
};

export default async function FeaturesPage() {
  // TODO: ลบ delay นี้ — ใส่ชั่วคราวเพื่อทดสอบ loading.tsx
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
