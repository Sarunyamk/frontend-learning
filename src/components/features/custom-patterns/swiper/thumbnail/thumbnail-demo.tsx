'use client';

import { SwiperThumbnailGallery } from '@/components/shared/swiper/swiper-thumbnail-gallery';

const COLORS = [
  { bg: '4f8cff', text: 'fff' },
  { bg: 'a855f7', text: 'fff' },
  { bg: '22c55e', text: 'fff' },
  { bg: 'f97316', text: 'fff' },
  { bg: 'ef4444', text: 'fff' },
  { bg: '6366f1', text: 'fff' },
];

function createPlaceholderSvg(label: string, bg: string, text: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect fill="%23${bg}" width="640" height="360"/><text x="320" y="190" text-anchor="middle" fill="%23${text}" font-size="32" font-family="system-ui">${label}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

const SLIDES = COLORS.map((c, i) => ({
  src: createPlaceholderSvg(`Photo ${i + 1}`, c.bg, c.text),
  alt: `Photo ${i + 1}`,
}));

export function ThumbnailDemo() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SwiperThumbnailGallery slides={SLIDES} thumbsPerView={4} loop />
    </div>
  );
}
