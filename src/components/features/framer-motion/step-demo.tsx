'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useCallback, useState } from 'react';

const STEPS = [
  { title: 'Step 1', description: 'ข้อมูลส่วนตัว' },
  { title: 'Step 2', description: 'ที่อยู่' },
  { title: 'Step 3', description: 'ยืนยัน' },
] as const;

const fadeSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function StepDemo() {
  const [step, setStep] = useState(0);

  const handleNext = useCallback(() => {
    setStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
  }, []);

  const handlePrev = useCallback(() => {
    setStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1));
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Multi-step with Variants</CardTitle>
        <CardDescription>
          ใช้ fadeSlide variant ที่มี exit state — content เลื่อนออกซ้าย
          เข้าจากขวา
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev}>
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            {step + 1} / {STEPS.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext}>
            Next
          </Button>
        </div>
        <div className="relative min-h-20 overflow-hidden rounded-lg bg-muted/50 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={fadeSlide}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-medium">{STEPS[step].title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {STEPS[step].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
