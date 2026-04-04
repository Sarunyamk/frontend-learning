'use client';

import { motion } from 'framer-motion';

export function FancyLoadingPreview() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="size-2.5 rounded-full bg-primary"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Wave</span>
      </div>
    </div>
  );
}
