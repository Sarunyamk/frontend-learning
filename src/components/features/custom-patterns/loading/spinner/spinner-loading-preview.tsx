'use client';

import { Loader2 } from 'lucide-react';

export function SpinnerLoadingPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {/* 1. Lucide Loader2 */}
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Lucide</span>
      </div>

      {/* 2. SVG Circle Spinner */}
      <div className="flex flex-col items-center gap-2">
        <svg
          className="size-8 animate-spin text-primary"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="text-xs text-muted-foreground">SVG Circle</span>
      </div>

      {/* 3. Tailwind Border Spinner */}
      <div className="flex flex-col items-center gap-2">
        <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <span className="text-xs text-muted-foreground">Border</span>
      </div>
    </div>
  );
}
