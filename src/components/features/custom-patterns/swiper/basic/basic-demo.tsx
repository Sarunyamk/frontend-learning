'use client';

import { SwiperCarousel } from '@/components/shared/swiper/swiper-carousel';
import { DEMO_GRADIENT_CLASSES } from '@/constants/custom-patterns/swiper.constant';

const SLIDES = DEMO_GRADIENT_CLASSES.map((gradient, i) => ({
  label: `Slide ${i + 1}`,
  gradient,
}));

export function BasicDemo() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SwiperCarousel
        slides={SLIDES}
        renderSlide={(slide) => (
          <div
            className={`flex aspect-video items-center justify-center rounded-xl bg-linear-to-br ${slide.gradient}`}
          >
            <span className="text-2xl font-bold text-foreground/60">
              {slide.label}
            </span>
          </div>
        )}
        navigation
        pagination
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slideClassName="px-1"
      />
    </div>
  );
}
