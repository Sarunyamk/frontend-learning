'use client';

import { ErrorCard } from '@/components/shared/base-page/error-card';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorCard
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      onRetry={reset}
    />
  );
}
