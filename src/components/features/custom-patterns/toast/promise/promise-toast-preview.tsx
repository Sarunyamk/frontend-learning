'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

async function mockSaveSuccess() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { name: 'Data' };
}

async function mockSaveFail() {
  await new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Network error')), 2000),
  );
}

export function PromiseToastPreview() {
  function handleSuccess() {
    toast.promise(mockSaveSuccess(), {
      loading: 'Saving...',
      success: (data) => `${data.name} has been saved!`,
      error: 'Failed to save',
    });
  }

  function handleFail() {
    toast.promise(mockSaveFail(), {
      loading: 'Saving...',
      success: 'Saved!',
      error: 'Failed to save — network error',
    });
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" onClick={handleSuccess}>
        Promise (Success)
      </Button>
      <Button size="sm" variant="outline" onClick={handleFail}>
        Promise (Fail)
      </Button>
    </div>
  );
}
