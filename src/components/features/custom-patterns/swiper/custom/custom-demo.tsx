'use client';

import { SwiperCarousel } from '@/components/shared/swiper-carousel';

export function CustomDemo() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SwiperCarousel navigation pagination loop>
        <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/5">
          <h2 className="text-2xl font-bold text-foreground/70">Welcome</h2>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/5">
          <h2 className="text-2xl font-bold text-foreground/70">Features</h2>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/5">
          <h2 className="text-2xl font-bold text-foreground/70">
            Get Started
          </h2>
        </div>
      </SwiperCarousel>
    </div>
  );
}
