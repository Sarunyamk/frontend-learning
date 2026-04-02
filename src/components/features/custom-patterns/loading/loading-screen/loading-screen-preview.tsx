'use client';

import { LoadingScreen } from '@/components/shared/loading-screen';

export function LoadingScreenPreview() {
  return (
    <div className="w-full">
      <div className="relative mx-auto h-64 overflow-hidden rounded-lg border bg-background">
        {/* Fake content behind */}
        <div className="space-y-4 p-6 opacity-40">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 rounded-lg bg-muted" />
            <div className="h-20 rounded-lg bg-muted" />
            <div className="h-20 rounded-lg bg-muted" />
          </div>
        </div>

        {/* Loading overlay — reuse shared component */}
        <LoadingScreen />
      </div>
    </div>
  );
}
