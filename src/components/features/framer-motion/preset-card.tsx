'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { AnimationPreset } from '@/constants/framer-motion.constant';
import {
  fadeUp,
  fadeIn,
  slideDown,
  slideLeft,
  slideRight,
  dropdown,
  slideInRight,
  staggerItem,
} from '@/lib/framer-motion/framer-motion';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { type ReactNode, useCallback, useState } from 'react';

const VARIANT_MAP: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  slideDown,
  slideLeft,
  slideRight,
  dropdown,
  slideInRight,
  'stagger (container + item)': staggerItem,
};

type PresetCardProps = {
  preset: AnimationPreset;
  codeSlot: ReactNode;
};

export function PresetCard({ preset, codeSlot }: PresetCardProps) {
  const [key, setKey] = useState(0);
  const variant = VARIANT_MAP[preset.name];

  const handleReplay = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-sm">{preset.name}</CardTitle>
        <CardDescription>{preset.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Live demo area — Client */}
        <div className="relative flex min-h-24 items-center justify-center overflow-hidden rounded-lg bg-muted/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              variants={variant}
              initial="hidden"
              animate="show"
              exit={variant?.exit ? 'exit' : undefined}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {preset.name}
            </motion.div>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleReplay}
            aria-label={`Replay ${preset.name} animation`}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Code blocks — passed from Server parent */}
        {codeSlot}
      </CardContent>
    </Card>
  );
}
