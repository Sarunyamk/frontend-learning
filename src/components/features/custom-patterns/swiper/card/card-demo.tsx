'use client';

import { SwiperCarousel } from '@/components/shared/swiper-carousel';

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

const FEATURES: FeatureItem[] = [
  { title: 'Payment', icon: '💳', description: 'Stripe & Omise integration' },
  {
    title: 'Socket.io',
    icon: '🔌',
    description: 'Real-time communication',
  },
  {
    title: 'Tailwind',
    icon: '🎨',
    description: 'Design tokens & theming',
  },
  {
    title: 'NextAuth',
    icon: '🔐',
    description: 'Authentication patterns',
  },
  { title: 'Forms', icon: '📝', description: 'react-hook-form + zod' },
  {
    title: 'Animation',
    icon: '✨',
    description: 'Framer Motion showcase',
  },
];

export function CardDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <SwiperCarousel<FeatureItem>
        slides={FEATURES}
        renderSlide={(feature) => (
          <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        )}
        slidesPerView="auto"
        centeredSlides
        spaceBetween={16}
        grabCursor
        pagination
        slideClassName="w-[250px] py-4"
      />
    </div>
  );
}
