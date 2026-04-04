'use client';

import { useState } from 'react';

import { FloatingParticles } from '@/components/shared/floating-particles';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Preset = 'default' | 'dense' | 'slow';

const PRESETS: Record<
  Preset,
  {
    count: number;
    sizeRange: [number, number];
    speedRange: [number, number];
    floatDistance: number;
  }
> = {
  default: {
    count: 25,
    sizeRange: [4, 12],
    speedRange: [6, 14],
    floatDistance: 30,
  },
  dense: {
    count: 50,
    sizeRange: [2, 6],
    speedRange: [4, 10],
    floatDistance: 40,
  },
  slow: {
    count: 15,
    sizeRange: [8, 18],
    speedRange: [12, 22],
    floatDistance: 20,
  },
};

export function FloatingParticlesPreview() {
  const [preset, setPreset] = useState<Preset>('default');
  const config = PRESETS[preset];

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground">Preset:</span>
        {(Object.keys(PRESETS) as Preset[]).map((p) => (
          <Button
            key={p}
            size="sm"
            variant="ghost"
            onClick={() => setPreset(p)}
            className={cn(
              'h-7 px-2.5 text-xs capitalize',
              preset === p
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            {p}
          </Button>
        ))}
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-lg border bg-background/50">
        <FloatingParticles
          key={preset}
          count={config.count}
          sizeRange={config.sizeRange}
          speedRange={config.speedRange}
          floatDistance={config.floatDistance}
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-sm font-medium text-foreground/70">
            Floating Particles — Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}
