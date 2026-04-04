import type { ReactNode } from 'react';
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
};
