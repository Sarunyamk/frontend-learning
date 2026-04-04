import { FEATURE_CATEGORIES } from '@/constants/feature.constant';
import { FeatureCarousel } from './feature-carousel';

export function FeatureSection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">
          Features
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          เลือกหัวข้อที่สนใจ แต่ละ feature มีตัวอย่างและคำอธิบายให้เรียนรู้
        </p>
        {/* //? template for feature card animation */}
        {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div> */}

        {/* //? template for feature swiper animation */}
        <FeatureCarousel categories={FEATURE_CATEGORIES} />
      </div>
    </section>
  );
}
