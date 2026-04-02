'use client';

import { useCallback, useState } from 'react';
import { LoadMoreButton } from '@/components/shared/load-more-button';

const ALL_ITEMS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `รายการที่ ${i + 1}`,
}));

const BATCH_SIZE = 5;

export function LoadMorePreview() {
  const [items, setItems] = useState(ALL_ITEMS.slice(0, BATCH_SIZE));
  const [loading, setLoading] = useState(false);

  const hasMore = items.length < ALL_ITEMS.length;

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setItems((prev) => ALL_ITEMS.slice(0, prev.length + BATCH_SIZE));
    setLoading(false);
  }, []);

  return (
    <div className="space-y-4">
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-md border px-3 py-2 text-sm text-foreground"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <LoadMoreButton
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={hasMore}
      />

      {!hasMore && (
        <p className="text-center text-sm text-muted-foreground">
          แสดงข้อมูลทั้งหมดแล้ว ({ALL_ITEMS.length} รายการ)
        </p>
      )}
    </div>
  );
}
