'use client';

import { useState } from 'react';
import { Pagination } from '@/components/shared/forms/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TOTAL_ITEMS = 50;
const PAGE_SIZE_OPTIONS = [5, 10, 25];

const MOCK_ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  name: `รายการที่ ${i + 1}`,
}));

export function WithSizePreview() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, TOTAL_ITEMS);
  const items = MOCK_ITEMS.slice(start, start + pageSize);

  function handlePageSizeChange(value: string) {
    setPageSize(Number(value));
    setPage(1);
  }

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

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          แสดง {start + 1}-{end} จาก {TOTAL_ITEMS} รายการ
        </p>

        <div className="flex items-center gap-3">
          <Select
            value={String(pageSize)}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} / หน้า
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
