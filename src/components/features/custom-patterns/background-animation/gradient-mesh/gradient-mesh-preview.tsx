'use client';

import { useState } from 'react';

import { GradientMesh } from '@/components/shared/gradient-mesh';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Speed = 'slow' | 'medium' | 'fast';

const BLOB_COUNTS = [2, 3, 4, 5] as const;
const SPEEDS: Speed[] = ['slow', 'medium', 'fast'];

export function GradientMeshPreview() {
  const [blobCount, setBlobCount] = useState<2 | 3 | 4 | 5>(3);
  const [speed, setSpeed] = useState<Speed>('medium');

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Blobs:</span>
          {BLOB_COUNTS.map((count) => (
            <Button
              key={count}
              size="sm"
              variant="ghost"
              onClick={() => setBlobCount(count)}
              className={cn(
                'h-7 px-2.5 text-xs',
                blobCount === count
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {count}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Speed:</span>
          {SPEEDS.map((s) => (
            <Button
              key={s}
              size="sm"
              variant="ghost"
              onClick={() => setSpeed(s)}
              className={cn(
                'h-7 px-2.5 text-xs capitalize',
                speed === s
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80',
              )}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative h-60 w-full overflow-hidden rounded-lg border bg-background/50">
        <GradientMesh
          key={`${blobCount}-${speed}`}
          blobCount={blobCount}
          speed={speed}
          opacity={0.4}
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-sm font-medium text-foreground/70">
            Animated Gradient Mesh — CSS Only
          </p>
        </div>
      </div>
    </div>
  );
}
