'use client';

import { useState } from 'react';
import { Pagination } from '@/components/shared/forms/pagination';

const MOCK_ITEMS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `รายการที่ ${i + 1}`,
}));

const PAGE_SIZE = 5;

export function BasicPaginationPreview() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(MOCK_ITEMS.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const items = MOCK_ITEMS.slice(start, start + PAGE_SIZE);

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

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
