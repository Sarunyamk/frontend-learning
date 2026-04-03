'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ActionToastPreview() {
  function handleUndo() {
    toast('Item deleted', {
      description: 'The item has been removed.',
      action: {
        label: 'Undo',
        onClick: () => toast.success('Item restored'),
      },
    });
  }

  function handleRetry() {
    toast.error('Failed to save', {
      description: 'Network error occurred.',
      action: {
        label: 'Retry',
        onClick: () => {
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
              loading: 'Retrying...',
              success: 'Saved successfully!',
              error: 'Failed again',
            },
          );
        },
      },
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" onClick={handleUndo}>
        Delete with Undo
      </Button>
      <Button size="sm" variant="outline" onClick={handleRetry}>
        Error with Retry
      </Button>
    </div>
  );
}
