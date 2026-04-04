'use client';

import { ErrorCard } from '@/components/shared/base-page/error-card';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body className="flex min-h-screen items-center justify-center">
        <ErrorCard
          title="Critical Error"
          description="Something went wrong at the application level."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
