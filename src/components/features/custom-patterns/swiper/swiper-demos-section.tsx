import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { SWIPER_PATTERNS } from '@/constants/custom-patterns/swiper.constant';

import { AtmosphereCarouselDemo } from './atmosphere/atmosphere-demo';
import { BasicDemo } from './basic/basic-demo';
import { CardDemo } from './card/card-demo';
import { CustomDemo } from './custom/custom-demo';
import { ThumbnailDemo } from './thumbnail/thumbnail-demo';

function getPattern(key: string) {
  return SWIPER_PATTERNS.find((p) => p.key === key)!;
}

const demos = [
  { key: 'basic-usage', Demo: BasicDemo },
  { key: 'coverflow-usage', Demo: AtmosphereCarouselDemo },
  { key: 'card-usage', Demo: CardDemo },
  { key: 'thumbnail-usage', Demo: ThumbnailDemo },
  { key: 'custom-usage', Demo: CustomDemo },
] as const;

export function SwiperDemosSection() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Live Demos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          แต่ละ variant ใช้ SwiperCarousel ตัวเดียว เปลี่ยนแค่ props
        </p>
      </div>

      <div className="space-y-4">
        {demos.map(({ key, Demo }) => {
          const pattern = getPattern(key);
          return (
            <div key={key} className="space-y-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {pattern.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pattern.description}
                </p>
              </div>
              <PatternCard
                codeSlot={<CodeBlockShiki code={pattern.code} language="tsx" />}
              >
                <div className="w-full">
                  <Demo />
                </div>
              </PatternCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
