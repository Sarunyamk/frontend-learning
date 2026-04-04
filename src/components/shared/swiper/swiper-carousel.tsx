'use client';

import { Children, useMemo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
import type { SwiperModule } from 'swiper/types';
import type { CarouselSlide, SwiperCarouselProps } from '@/types/swiper.type';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';

const EFFECT_MODULE_MAP: Record<string, SwiperModule> = {
  fade: EffectFade,
  coverflow: EffectCoverflow,
};

function isCarouselSlide(item: unknown): item is CarouselSlide {
  return (
    typeof item === 'object' &&
    item !== null &&
    'src' in item &&
    'alt' in item
  );
}

export function SwiperCarousel<T = CarouselSlide>({
  slides,
  renderSlide,
  children,
  effect = 'slide',
  coverflowEffect,
  autoplay,
  loop = false,
  grabCursor = true,
  centeredSlides = false,
  speed,
  slidesPerView = 1,
  spaceBetween = 0,
  breakpoints,
  navigation = false,
  pagination = false,
  className,
  slideClassName,
  imageSizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  imagePriority = false,
}: SwiperCarouselProps<T>) {
  // Auto-resolve modules from props
  const modules = useMemo(() => {
    const mods: SwiperModule[] = [];
    if (navigation) mods.push(Navigation);
    if (pagination) mods.push(Pagination);
    if (autoplay) mods.push(Autoplay);
    const effectModule = EFFECT_MODULE_MAP[effect];
    if (effectModule) mods.push(effectModule);
    return mods;
  }, [navigation, pagination, autoplay, effect]);

  // Resolve autoplay config
  const autoplayConfig =
    autoplay === true
      ? { delay: 3000, disableOnInteraction: false }
      : autoplay || undefined;

  // Resolve pagination config
  const paginationConfig = pagination ? { clickable: true } : false;

  // --- Render slides ---
  const renderSlides = () => {
    // Mode 1: children (free-form)
    if (children) {
      return Children.map(children, (child, index) => (
        <SwiperSlide key={index} className={slideClassName}>
          {child}
        </SwiperSlide>
      ));
    }

    // Mode 2 & 3: slides array
    if (slides) {
      return slides.map((item, index) => (
        <SwiperSlide key={index} className={slideClassName}>
          {renderSlide ? (
            renderSlide(item, index)
          ) : isCarouselSlide(item) ? (
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={imageSizes}
                priority={imagePriority && index === 0}
                className="object-cover"
              />
            </div>
          ) : null}
        </SwiperSlide>
      ));
    }

    return null;
  };

  return (
    <Swiper
      modules={modules}
      effect={effect}
      coverflowEffect={
        effect === 'coverflow'
          ? {
              rotate: 20,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: true,
              ...coverflowEffect,
            }
          : undefined
      }
      autoplay={autoplayConfig}
      loop={loop}
      grabCursor={grabCursor}
      centeredSlides={centeredSlides}
      speed={speed}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      navigation={navigation}
      pagination={paginationConfig}
      className={cn('w-full', className)}
    >
      {renderSlides()}
    </Swiper>
  );
}
