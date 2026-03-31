'use client';

import { SCROLL_EXAMPLES } from '@/constants/framer-motion.constant';
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  staggerItem,
} from '@/lib/framer-motion/framer-motion';
import { CodeBlock } from '@/components/tailwind/code-block';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md rounded-lg bg-primary p-6 text-center text-primary-foreground"
          >
            Fade Up on Scroll
          </motion.div>

          <div className="flex w-full gap-4">
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 rounded-lg bg-primary p-6 text-center text-primary-foreground"
            >
              Slide from Left
            </motion.div>
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 rounded-lg bg-primary p-6 text-center text-primary-foreground"
            >
              Slide from Right
            </motion.div>
          </div>
        </div>

        <CodeBlock code={SCROLL_EXAMPLES[0].code} language="tsx" />
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-primary p-6 text-center text-primary-foreground"
          >
            amount: 0.5 — ต้องเห็น 50% ถึง trigger
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-muted p-6 text-center text-foreground"
          >
            once: false — animate ทุกครั้งที่เข้า viewport (ลอง scroll ขึ้น-ลง)
          </motion.div>
        </div>

        <CodeBlock code={SCROLL_EXAMPLES[1].code} language="tsx" />
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {STAGGER_CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={staggerItem}
              className={`${card.color} rounded-lg p-6 text-center text-sm font-medium text-primary-foreground`}
            >
              {card.title}
            </motion.div>
          ))}
        </motion.div>

        <CodeBlock code={SCROLL_EXAMPLES[2].code} language="tsx" />
      </section>
    </div>
  );
}
