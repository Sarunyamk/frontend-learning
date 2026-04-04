'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import type { FeatureCategoryConfig } from '@/constants/feature.constant';
import { FeatureCard } from './feature-card';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

type FeatureCarouselProps = {
  categories: readonly FeatureCategoryConfig[];
};

export function FeatureCarousel({ categories }: FeatureCarouselProps) {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Autoplay]}
      effect="coverflow"
      grabCursor
      centeredSlides
      loop={categories.length >= 5}
      slidesPerView="auto"
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      coverflowEffect={{
        rotate: 15,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={{ clickable: true }}
      className="w-[90%] max-w-5xl"
    >
      {categories.map((category, index) => (
        <SwiperSlide
          key={category.key}
          className="w-70! py-4 md:w-[320px]!"
        >
          <FeatureCard
            label={category.label}
            description={category.description}
            icon={category.icon}
            path={category.path}
            index={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
