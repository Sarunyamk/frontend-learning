'use client';

import { Loader2 } from 'lucide-react';

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

        {/* Loading overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
