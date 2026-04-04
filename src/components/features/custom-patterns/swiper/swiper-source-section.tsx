import { PatternCard } from '@/components/shared/pattern-card';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';
import { SWIPER_PATTERNS } from '@/constants/custom-patterns/swiper.constant';

const typeSource = SWIPER_PATTERNS.find((p) => p.key === 'type-source')!;
const carouselSource = SWIPER_PATTERNS.find(
  (p) => p.key === 'carousel-source',
)!;
const thumbnailSource = SWIPER_PATTERNS.find(
  (p) => p.key === 'thumbnail-source',
)!;
const atmosphereSource = SWIPER_PATTERNS.find(
  (p) => p.key === 'atmosphere-source',
)!;

const sources = [typeSource, carouselSource, thumbnailSource, atmosphereSource];

export function SwiperSourceSection() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Reusable Components
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Copy ทั้ง 4 ไฟล์ไปวางในโปรเจค (types → components) —
          ใช้ได้ทันที ปรับ config ผ่าน props
        </p>
      </div>

      <div className="space-y-4">
        {sources.map((pattern) => (
          <PatternCard
            key={pattern.key}
            codeSlot={
              <CodeBlockShiki code={pattern.code} language="tsx" />
            }
          >
            <div className="w-full space-y-1">
              <h3 className="font-semibold text-foreground">
                {pattern.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>
            </div>
          </PatternCard>
        ))}
      </div>
    </section>
  );
}
