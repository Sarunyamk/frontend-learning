'use client';

import { ANIMATION_PRESETS } from '@/constants/framer-motion.constant';
import {
  fadeUp,
  fadeIn,
  slideDown,
  slideLeft,
  slideRight,
  dropdown,
  slideInRight,
  staggerContainer,
  staggerItem,
} from '@/lib/framer-motion/framer-motion';
import { CodeBlock } from '@/components/tailwind/code-block';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useCallback, useState } from 'react';

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

function PresetCard({ preset }: { preset: (typeof ANIMATION_PRESETS)[number] }) {
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
        {/* Live demo area */}
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

        {/* Variant code */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            Variant
          </p>
          <CodeBlock code={preset.variantCode} language="typescript" />
        </div>

        {/* Usage code */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            Usage
          </p>
          <CodeBlock code={preset.usageCode} language="tsx" />
        </div>
      </CardContent>
    </Card>
  );
}

export function AnimationExamples() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2"
    >
      {ANIMATION_PRESETS.map((preset) => (
        <motion.div key={preset.name} variants={staggerItem}>
          <PresetCard preset={preset} />
        </motion.div>
      ))}
    </motion.div>
  );
}
