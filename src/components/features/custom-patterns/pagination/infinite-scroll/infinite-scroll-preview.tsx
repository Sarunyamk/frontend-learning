'use client';

import { useCallback, useState } from 'react';
import { InfiniteScroll } from '@/components/shared/infinite-scroll';

const ALL_ITEMS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `รายการที่ ${i + 1}`,
}));

const BATCH_SIZE = 8;

export function InfiniteScrollPreview() {
  const [items, setItems] = useState(ALL_ITEMS.slice(0, BATCH_SIZE));
  const [loading, setLoading] = useState(false);

  const hasMore = items.length < ALL_ITEMS.length;

  const handleLoadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => ALL_ITEMS.slice(0, prev.length + BATCH_SIZE));
      setLoading(false);
    }, 800);
  }, [loading]);

  return (
    <div className="max-h-64 overflow-y-auto rounded-md border">
      <InfiniteScroll
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        <ul className="space-y-1 p-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-md border px-3 py-2 text-sm text-foreground"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
