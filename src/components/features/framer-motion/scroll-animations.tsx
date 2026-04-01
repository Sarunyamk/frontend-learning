import { SCROLL_EXAMPLES } from '@/constants/framer-motion.constant';
import { ColumnFade } from '@/components/framer-motion/fade';
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/framer-motion/stagger';
import { slideLeft, slideRight } from '@/lib/framer-motion/framer-motion';
import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';

const STAGGER_CARDS = [
  { id: 1, title: 'Card 1', color: 'bg-primary' },
  { id: 2, title: 'Card 2', color: 'bg-primary' },
  { id: 3, title: 'Card 3', color: 'bg-primary' },
  { id: 4, title: 'Card 4', color: 'bg-primary' },
  { id: 5, title: 'Card 5', color: 'bg-primary' },
  { id: 6, title: 'Card 6', color: 'bg-primary' },
] as const;

export function ScrollAnimations() {
  return (
    <div className="space-y-12">
      {/* Section 1: whileInView basic */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          1. whileInView พื้นฐาน
        </h2>
        <p className="text-sm text-muted-foreground">
          element animate เมื่อ scroll เข้ามาใน viewport — ลอง scroll ลงมาดู
        </p>

        <div className="flex flex-col items-center gap-6">
          <ColumnFade className="w-full max-w-md rounded-lg bg-primary p-6 text-center text-primary-foreground">
            Fade Up on Scroll
          </ColumnFade>

          <div className="flex w-full gap-4">
            <ColumnFade
              variant={slideRight}
              className="flex-1 rounded-lg bg-primary p-6 text-center text-primary-foreground"
            >
              Slide from Left
            </ColumnFade>
            <ColumnFade
              variant={slideLeft}
              className="flex-1 rounded-lg bg-primary p-6 text-center text-primary-foreground"
            >
              Slide from Right
            </ColumnFade>
          </div>
        </div>

        <CodeBlockShiki code={SCROLL_EXAMPLES[0].code} language="tsx" />
      </section>

      {/* Section 2: viewport options */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          2. viewport options
        </h2>
        <p className="text-sm text-muted-foreground">
          ปรับ amount เพื่อกำหนดว่า element ต้องเข้ามาเท่าไหร่ถึง trigger
        </p>

        <div className="flex flex-col gap-4">
          <ColumnFade
            amount={0.5}
            duration={0.5}
            className="rounded-lg bg-primary p-6 text-center text-primary-foreground"
          >
            amount: 0.5 — ต้องเห็น 50% ถึง trigger
          </ColumnFade>
          <ColumnFade
            once={false}
            amount={0.3}
            duration={0.5}
            className="rounded-lg bg-muted p-6 text-center text-foreground"
          >
            once: false — animate ทุกครั้งที่เข้า viewport (ลอง scroll ขึ้น-ลง)
          </ColumnFade>
        </div>

        <CodeBlockShiki code={SCROLL_EXAMPLES[1].code} language="tsx" />
      </section>

      {/* Section 3: Stagger on scroll */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          3. Stagger on Scroll
        </h2>
        <p className="text-sm text-muted-foreground">
          cards ขึ้นมาทีละใบเมื่อ scroll ถึง — ใช้ staggerContainer +
          staggerItem
        </p>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {STAGGER_CARDS.map((card) => (
            <StaggerItem
              key={card.id}
              className={`${card.color} rounded-lg p-6 text-center text-sm font-medium text-primary-foreground`}
            >
              {card.title}
            </StaggerItem>
          ))}
        </StaggerContainer>

        <CodeBlockShiki code={SCROLL_EXAMPLES[2].code} language="tsx" />
      </section>
    </div>
  );
}
