'use client';

import { ErrorCard } from '@/components/shared/error-card';

export function ErrorCardPreview() {
  return (
    <ErrorCard
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      onRetry={() => alert('Retry clicked!')}
    />
  );
}
