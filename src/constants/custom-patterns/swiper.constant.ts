export type SwiperPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const SWIPER_PATTERNS: readonly SwiperPattern[] = [
  {
    key: 'type-source',
    title: 'Type Definitions — swiper.type.ts',
    description:
      'Type สำหรับ SwiperCarousel และ ThumbnailGallery — copy ไปวางที่ types/ ก่อนใช้ component',
    code: `import type { ReactNode } from 'react';
import type { SwiperOptions } from 'swiper/types';

// ===== Slide Data =====

export type CarouselSlide = {
  src: string;
  alt: string;
};

// ===== SwiperCarousel Props =====

export type SwiperCarouselProps<T = CarouselSlide> = {
  // --- Data (เลือก 1 ใน 3 mode) ---
  /** Array of slide data — ถ้าไม่มี renderSlide จะ render <Image> อัตโนมัติ */
  slides?: T[];
  /** Custom render function — ยืดหยุ่น ใส่อะไรก็ได้ */
  renderSlide?: (item: T, index: number) => ReactNode;
  /** Free-form children — แต่ละ child = 1 slide */
  children?: ReactNode;

  // --- Effect ---
  effect?: 'slide' | 'fade' | 'coverflow';
  coverflowEffect?: {
    rotate?: number;
    stretch?: number;
    depth?: number;
    modifier?: number;
    slideShadows?: boolean;
  };

  // --- Behavior ---
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  loop?: boolean;
  grabCursor?: boolean;
  centeredSlides?: boolean;
  speed?: number;

  // --- Layout ---
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  breakpoints?: SwiperOptions['breakpoints'];

  // --- Modules (auto-resolve from props) ---
  navigation?: boolean;
  pagination?: boolean;

  // --- Styling ---
  className?: string;
  slideClassName?: string;

  // --- Image options (เฉพาะ default image mode) ---
  imageSizes?: string;
  imagePriority?: boolean;
};

// ===== SwiperThumbnailGallery Props =====

export type SwiperThumbnailGalleryProps = {
  slides: CarouselSlide[];
  thumbsPerView?: number;
  loop?: boolean;
  className?: string;
  thumbClassName?: string;
  imageSizes?: string;
};`,
  },
  {
    key: 'carousel-source',
    title: 'SwiperCarousel — Component',
    description:
      'Reusable carousel component รองรับ 3 mode: image slides, renderSlide (custom content), children (free-form) — auto-resolve Swiper modules จาก props',
    code: `'use client';

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
}`,
  },
  {
    key: 'thumbnail-source',
    title: 'SwiperThumbnailGallery — Component',
    description:
      'Thumbnail gallery — 2 Swiper sync กัน (main + thumbs), click thumbnail เพื่อเลือก slide',
    code: `'use client';

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
                sizes={\`\${Math.round(100 / thumbsPerView)}vw\`}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}`,
  },
  {
    key: 'atmosphere-source',
    title: 'AtmosphereCarousel — Component',
    description:
      'Coverflow 3D carousel สำเร็จรูป — ส่งแค่ images array, effect ทั้งหมดจัดการให้ (auto loop เมื่อ >= 5 slides)',
    code: `'use client';

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
            key={\`\${image.src}-\${i}\`}
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
}`,
  },
  {
    key: 'basic-usage',
    title: 'Basic Carousel — Usage',
    description:
      'Carousel พื้นฐาน — navigation arrows, pagination dots, autoplay loop',
    code: `import { SwiperCarousel } from '@/components/shared/swiper-carousel';

const slides = [
  { src: '/images/slide-1.jpg', alt: 'Slide 1' },
  { src: '/images/slide-2.jpg', alt: 'Slide 2' },
  { src: '/images/slide-3.jpg', alt: 'Slide 3' },
  { src: '/images/slide-4.jpg', alt: 'Slide 4' },
];

export function BasicExample() {
  return (
    <SwiperCarousel
      slides={slides}
      navigation
      pagination
      slideClassName="aspect-video"
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    />
  );
}`,
  },
  {
    key: 'coverflow-usage',
    title: 'AtmosphereCarousel — Usage',
    description:
      'Coverflow 3D effect — slide ตรงกลางใหญ่ ข้างๆ เอียง+เล็กลง, เหมาะสำหรับ gallery, portfolio, atmosphere section',
    code: `import { AtmosphereCarousel } from '@/components/shared/atmosphere-carousel';

const images = [
  { src: '/images/photo-1.jpg', alt: 'Photo 1' },
  { src: '/images/photo-2.jpg', alt: 'Photo 2' },
  { src: '/images/photo-3.jpg', alt: 'Photo 3' },
  { src: '/images/photo-4.jpg', alt: 'Photo 4' },
  { src: '/images/photo-5.jpg', alt: 'Photo 5' },
  { src: '/images/photo-6.jpg', alt: 'Photo 6' },
];

export function AtmosphereExample() {
  // แค่ส่ง images — coverflow effect ทั้งหมดจัดการให้แล้ว
  return <AtmosphereCarousel images={images} />;

  // ปรับ delay ได้:
  // <AtmosphereCarousel images={images} delay={2500} />
}`,
  },
  {
    key: 'card-usage',
    title: 'Card Carousel — Usage',
    description:
      'Card carousel แบบเห็น card ข้างๆ — ใช้ renderSlide สำหรับ custom content',
    code: `import { SwiperCarousel } from '@/components/shared/swiper-carousel';

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  { title: 'Payment', icon: '💳', description: 'Stripe & Omise integration' },
  { title: 'Socket.io', icon: '🔌', description: 'Real-time communication' },
  { title: 'Tailwind', icon: '🎨', description: 'Design tokens & theming' },
  { title: 'NextAuth', icon: '🔐', description: 'Authentication patterns' },
  { title: 'Forms', icon: '📝', description: 'react-hook-form + zod' },
];

export function CardCarouselExample() {
  return (
    <SwiperCarousel<Feature>
      slides={features}
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
      slideClassName="w-[280px] py-4"
    />
  );
}`,
  },
  {
    key: 'thumbnail-usage',
    title: 'Thumbnail Gallery — Usage',
    description:
      'Gallery แบบมี thumbnail — click thumbnail เพื่อเลือก slide, navigation arrows บน main',
    code: `import { SwiperThumbnailGallery } from '@/components/shared/swiper-thumbnail-gallery';

const slides = [
  { src: '/images/slide-1.jpg', alt: 'Photo 1' },
  { src: '/images/slide-2.jpg', alt: 'Photo 2' },
  { src: '/images/slide-3.jpg', alt: 'Photo 3' },
  { src: '/images/slide-4.jpg', alt: 'Photo 4' },
  { src: '/images/slide-5.jpg', alt: 'Photo 5' },
  { src: '/images/slide-6.jpg', alt: 'Photo 6' },
];

export function ThumbnailExample() {
  return (
    <SwiperThumbnailGallery
      slides={slides}
      thumbsPerView={4}
      loop
    />
  );
}`,
  },
  {
    key: 'custom-usage',
    title: 'Children Mode — Usage',
    description:
      'ใส่ content อะไรก็ได้เป็น slide — แต่ละ child element = 1 slide',
    code: `import { SwiperCarousel } from '@/components/shared/swiper-carousel';

export function ChildrenExample() {
  return (
    <SwiperCarousel
      navigation
      pagination
      loop
    >
      <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-blue-500/20 to-blue-500/5">
        <h2 className="text-2xl font-bold">Welcome</h2>
      </div>
      <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-purple-500/20 to-purple-500/5">
        <h2 className="text-2xl font-bold">Features</h2>
      </div>
      <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-green-500/20 to-green-500/5">
        <h2 className="text-2xl font-bold">Get Started</h2>
      </div>
    </SwiperCarousel>
  );
}`,
  },
] as const;

export const DEMO_GRADIENT_CLASSES = [
  'from-blue-500/20 to-cyan-500/5',
  'from-purple-500/20 to-pink-500/5',
  'from-green-500/20 to-emerald-500/5',
  'from-orange-500/20 to-amber-500/5',
  'from-rose-500/20 to-red-500/5',
  'from-indigo-500/20 to-violet-500/5',
] as const;
