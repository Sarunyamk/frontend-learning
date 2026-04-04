'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import type { CarouselSlide } from '@/types/swiper.type';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

type AtmosphereCarouselProps = {
  /** Array of image data — { src, alt } */
  images: CarouselSlide[];
  /** Autoplay delay in ms @default 1800 */
  delay?: number;
  /** Additional class for outer container */
  className?: string;
};

export function AtmosphereCarousel({
  images,
  delay = 1800,
  className,
}: AtmosphereCarouselProps) {
  const needsLoop = images.length >= 5;

  if (images.length === 0) return null;

  return (
    <div className={cn('flex w-full justify-center py-10', className)}>
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={needsLoop}
        slidesPerView="auto"
        autoplay={{ delay, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        className="w-[90%] max-w-5xl"
      >
        {images.map((image, i) => (
          <SwiperSlide
            key={`${image.src}-${i}`}
            className="h-50! w-65! overflow-hidden rounded-xl shadow-lg md:h-62.5! md:w-[320px]!"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 260px, 320px"
              priority={i === 0}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
