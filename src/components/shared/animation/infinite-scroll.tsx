'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

type InfiniteScrollProps = {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  threshold?: number;
  children: React.ReactNode;
};

export function InfiniteScroll({
  onLoadMore,
  loading = false,
  hasMore = true,
  threshold = 0.1,
  children,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          onLoadMore();
        }
      },
      { threshold }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [onLoadMore, loading, hasMore, threshold]);

  return (
    <div>
      {children}

      <div ref={sentinelRef} className="flex justify-center py-4">
        {loading && (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            กำลังโหลด...
          </span>
        )}
        {!hasMore && !loading && (
          <p className="text-sm text-muted-foreground">แสดงข้อมูลทั้งหมดแล้ว</p>
        )}
      </div>
    </div>
  );
}
