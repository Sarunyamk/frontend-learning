'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CustomToastPreview() {
  function handleCustom() {
    toast.custom((id) => (
      <div className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-lg">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
          <span className="text-lg">🎉</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Welcome back!</p>
          <p className="text-xs text-muted-foreground">
            You have 3 new notifications
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(id)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Dismiss
        </button>
      </div>
    ));
  }

  return (
    <div className="flex justify-center">
      <Button size="sm" variant="outline" onClick={handleCustom}>
        Custom Toast
      </Button>
    </div>
  );
}
