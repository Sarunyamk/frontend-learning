'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type LoadMoreButtonProps = {
  onLoadMore: () => void | Promise<void>;
  loading?: boolean;
  hasMore?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
};

export function LoadMoreButton({
  onLoadMore,
  loading = false,
  hasMore = true,
  loadingText = 'กำลังโหลด...',
  children = 'โหลดเพิ่มเติม',
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            {loadingText}
          </span>
        ) : (
          children
        )}
      </Button>
    </div>
  );
}
