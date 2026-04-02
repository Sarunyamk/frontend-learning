export type PaginationPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const PAGINATION_PATTERNS: readonly PaginationPattern[] = [
  // ─────────────────────────────────────────────
  // 1. Basic Pagination — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'basic-pagination',
    title: 'Basic Pagination',
    description:
      'Reusable pagination — page numbers, ellipsis อัตโนมัติ, prev/next พร้อม disabled state',
    code: `// ============================================
// src/utils/get-page-range.ts
// ============================================
export function getPageRange(
  current: number,
  total: number,
  siblings: number
) {
  const range: (number | 'ellipsis')[] = [];

  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  range.push(1);

  if (showLeftEllipsis) {
    range.push('ellipsis');
  } else {
    for (let i = 2; i < leftSibling; i++) range.push(i);
  }

  for (let i = leftSibling; i <= rightSibling; i++) range.push(i);

  if (showRightEllipsis) {
    range.push('ellipsis');
  } else {
    for (let i = rightSibling + 1; i < total; i++) range.push(i);
  }

  if (total > 1) range.push(total);

  return range;
}

// ============================================
// src/components/shared/pagination.tsx
// ============================================
'use client';

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPageRange } from '@/utils/get-page-range';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblings);

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="ก่อนหน้า"
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <PaginationItem key={\`ellipsis-\${i}\`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            text="ถัดไป"
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}`,
  },
  {
    key: 'basic-pagination-usage',
    title: 'Basic Pagination — Usage',
    description:
      'ตัวอย่างการใช้งาน: hardcode (demo) และใช้จริงกับ API',
    code: `import { useState } from 'react';
import { Pagination } from '@/components/shared/pagination';

// ============================================
// 1. Hardcode (demo) — ข้อมูลอยู่ใน client
// ============================================
const PAGE_SIZE = 5;
const MOCK_ITEMS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: \`รายการที่ \${i + 1}\`,
}));

function ProductListDemo() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(MOCK_ITEMS.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const items = MOCK_ITEMS.slice(start, start + PAGE_SIZE);

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

// ============================================
// 2. ใช้จริง — totalPages มาจาก API response
// ============================================
const { data, totalPages } = await getProducts({
  page,
  pageSize: 10,
});

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={(p) => router.push(\`?page=\${p}\`)}
/>`,
  },

  // ─────────────────────────────────────────────
  // 2. With Per-page Size — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'with-size',
    title: 'Pagination + Per-page Size',
    description:
      'Compose Pagination + Select — ไม่แยก component เพราะ layout ต่าง project ไม่เหมือนกัน',
    code: `// ============================================
// Compose: Pagination + Select
// ไม่แยก component — layout ต่าง project ไม่เหมือนกัน
// ============================================
'use client';

import { useState } from 'react';
import { Pagination } from '@/components/shared/pagination';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

function ProductList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);

  return (
    <div className="flex flex-col items-center gap-3
      sm:flex-row sm:justify-between">
      <p className="text-sm text-muted-foreground">
        แสดง {start + 1}-{end} จาก {totalItems} รายการ
      </p>

      <div className="flex items-center gap-3">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => {
            setPageSize(Number(v));
            setPage(1); // reset เมื่อเปลี่ยน size
          }}
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
  );
}`,
  },
  {
    key: 'with-size-usage',
    title: 'Pagination + Per-page Size — Usage',
    description:
      'ตัวอย่าง: hardcode (demo) และใช้จริงกับ API ที่รับ page + pageSize',
    code: `// ============================================
// 1. Hardcode (demo)
// ============================================
const TOTAL_ITEMS = 50;
const MOCK_ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i + 1,
  name: \`รายการที่ \${i + 1}\`,
}));

const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);
const items = MOCK_ITEMS.slice(start, start + pageSize);

// ============================================
// 2. ใช้จริง — ส่ง page + pageSize ไป API
// ============================================
const { data, totalItems, totalPages } = await getProducts({
  page,
  pageSize,
});

// เปลี่ยน URL เมื่อ user เปลี่ยนหน้า/size
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={(p) => router.push(\`?page=\${p}&size=\${pageSize}\`)}
/>`,
  },

  // ─────────────────────────────────────────────
  // 3. Load More — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'load-more',
    title: 'Load More Button',
    description:
      'ปุ่ม Load more — auto loading spinner, ซ่อนเมื่อหมด. เหมาะกับ feed, comment list',
    code: `// ============================================
// src/components/shared/load-more-button.tsx
// ============================================
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
      <Button variant="outline" onClick={onLoadMore} disabled={loading}>
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
}`,
  },
  {
    key: 'load-more-usage',
    title: 'Load More Button — Usage',
    description:
      'ตัวอย่าง: hardcode (demo) และใช้จริงกับ cursor-based API',
    code: `import { useCallback, useState } from 'react';
import { LoadMoreButton } from '@/components/shared/load-more-button';

// ============================================
// 1. Hardcode (demo)
// ============================================
const ALL_ITEMS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: \`รายการที่ \${i + 1}\`,
}));

function CommentList() {
  const [items, setItems] = useState(ALL_ITEMS.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setItems((prev) => ALL_ITEMS.slice(0, prev.length + 5));
    setLoading(false);
  }, []);

  return (
    <>
      {items.map((item) => <div key={item.id}>{item.name}</div>)}
      <LoadMoreButton
        onLoadMore={handleLoadMore}
        loading={loading}
        hasMore={items.length < ALL_ITEMS.length}
      />
    </>
  );
}

// ============================================
// 2. ใช้จริง — cursor-based API
// ============================================
const { data, nextCursor } = await getComments({
  cursor,
  limit: 10,
});

<LoadMoreButton
  onLoadMore={() => fetchNextPage(nextCursor)}
  loading={isFetching}
  hasMore={!!nextCursor}
/>`,
  },

  // ─────────────────────────────────────────────
  // 4. Infinite Scroll — source + usage
  // ─────────────────────────────────────────────
  {
    key: 'infinite-scroll',
    title: 'Infinite Scroll',
    description:
      'Auto-load เมื่อ scroll ถึง — ใช้ IntersectionObserver. เหมาะกับ social feed, gallery',
    code: `// ============================================
// src/components/shared/infinite-scroll.tsx
// ============================================
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
          <span className="flex items-center gap-2 text-sm
            text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            กำลังโหลด...
          </span>
        )}
        {!hasMore && !loading && (
          <p className="text-sm text-muted-foreground">
            แสดงข้อมูลทั้งหมดแล้ว
          </p>
        )}
      </div>
    </div>
  );
}`,
  },
  {
    key: 'infinite-scroll-usage',
    title: 'Infinite Scroll — Usage',
    description:
      'ตัวอย่าง: hardcode (demo) และใช้จริงกับ react-query useInfiniteQuery',
    code: `import { useCallback, useState } from 'react';
import { InfiniteScroll } from '@/components/shared/infinite-scroll';

// ============================================
// 1. Hardcode (demo)
// ============================================
const ALL_ITEMS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: \`รายการที่ \${i + 1}\`,
}));

function FeedList() {
  const [items, setItems] = useState(ALL_ITEMS.slice(0, 8));
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => ALL_ITEMS.slice(0, prev.length + 8));
      setLoading(false);
    }, 800);
  }, [loading]);

  return (
    <InfiniteScroll
      onLoadMore={handleLoadMore}
      loading={loading}
      hasMore={items.length < ALL_ITEMS.length}
    >
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </InfiniteScroll>
  );
}

// ============================================
// 2. ใช้จริง — react-query useInfiniteQuery
// ============================================
const { data, fetchNextPage, hasNextPage, isFetching } =
  useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  });

<InfiniteScroll
  onLoadMore={fetchNextPage}
  loading={isFetching}
  hasMore={!!hasNextPage}
>
  {data.pages.flat().map((item) => (
    <FeedCard key={item.id} {...item} />
  ))}
</InfiniteScroll>`,
  },
] as const;
