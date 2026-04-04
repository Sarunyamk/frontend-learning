'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { SwiperThumbnailGalleryProps } from '@/types/swiper.type';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export function SwiperThumbnailGallery({
  slides,
  thumbsPerView = 4,
  loop = false,
  className,
  thumbClassName,
  imageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw',
}: SwiperThumbnailGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        loop={loop}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="w-full overflow-hidden rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={imageSizes}
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={thumbsPerView}
        spaceBetween={8}
        watchSlidesProgress
        className={cn('w-full', thumbClassName)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer overflow-hidden rounded-md opacity-60 transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={`${Math.round(100 / thumbsPerView)}vw`}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
