'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function SkeletonLoadingPreview() {
  const [view, setView] = useState<'card' | 'list'>('card');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={view === 'card' ? 'default' : 'outline'}
          onClick={() => setView('card')}
        >
          Card
        </Button>
        <Button
          size="sm"
          variant={view === 'list' ? 'default' : 'outline'}
          onClick={() => setView('list')}
        >
          List
        </Button>
      </div>

      {view === 'card' ? (
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-md" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
