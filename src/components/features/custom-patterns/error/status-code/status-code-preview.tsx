'use client';

import { useState } from 'react';
import { ErrorCard } from '@/components/shared/error-card';
import { Button } from '@/components/ui/button';

const STATUS_CODES = [401, 403, 500] as const;

const ERROR_INFO: Record<number, { title: string; description: string }> = {
  401: {
    title: 'Unauthorized',
    description: 'Please login to access this page.',
  },
  403: {
    title: 'Access Denied',
    description: "You don't have permission to view this page.",
  },
  500: {
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
  },
};

export function StatusCodePreview() {
  const [activeCode, setActiveCode] = useState<number>(500);

  const info = ERROR_INFO[activeCode];

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-center gap-2">
        {STATUS_CODES.map((code) => (
          <Button
            key={code}
            variant={activeCode === code ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCode(code)}
          >
            {code}
          </Button>
        ))}
      </div>
      <ErrorCard
        statusCode={activeCode}
        title={info.title}
        description={info.description}
        onRetry={() => alert(`Retry for ${activeCode}`)}
      />
    </div>
  );
}
