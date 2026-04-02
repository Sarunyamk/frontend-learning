export type TableActionPattern = {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly code: string;
};

export const TABLE_ACTION_PATTERNS: readonly TableActionPattern[] = [
  // ─── 1. Basic Data Table ───
  {
    key: 'basic-table',
    title: 'DataTable — Reusable Component',
    description:
      'Generic table component — map columns + data → shadcn Table. ใช้คู่กับ Pagination ได้ทันที',
    code: `// components/shared/data-table.tsx
'use client';

import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  renderRow?: (row: T, defaultRow: React.ReactNode) => React.ReactNode;
};

export function DataTable<T extends { id: number | string }>({
  columns, data, emptyMessage = 'ไม่มีข้อมูล',
  className, renderRow,
}: DataTableProps<T>) {
  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length}
              className="h-24 text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => {
            const defaultRow = (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            );
            return renderRow ? renderRow(row, defaultRow) : defaultRow;
          })
        )}
      </TableBody>
    </Table>
  );
}`,
  },
  {
    key: 'basic-table-usage',
    title: 'DataTable — Usage with Pagination',
    description:
      'ตัวอย่างการใช้ DataTable คู่กับ Pagination — columns + mock data + page state',
    code: `// ตัวอย่างการใช้งาน DataTable + Pagination
'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
};

const MOCK_USERS: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
  role: (['Admin', 'Editor', 'Viewer'] as const)[i % 3],
  status: i % 5 === 0 ? 'Inactive' : 'Active',
}));

const PAGE_SIZE = 5;

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name },
  { key: 'email', header: 'Email', cell: (row) => row.email },
  {
    key: 'role',
    header: 'Role',
    cell: (row) => (
      <Badge variant={row.role === 'Admin' ? 'default' : 'secondary'}>
        {row.role}
      </Badge>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'outline' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

export function UserTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(MOCK_USERS.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = MOCK_USERS.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}`,
  },

  {
    key: 'basic-table-api',
    title: 'DataTable — API Fetch (Server Component)',
    description:
      'ดึงข้อมูลจาก API ใน Server Component — searchParams pagination, ไม่ต้อง useEffect',
    code: `// ตัวอย่างการใช้ DataTable กับ API (Server Component — ไม่ต้อง 'use client')
// ❌ ห้าม useEffect fetch — Google ไม่เห็น content, SEO เสีย
// ✅ fetch ใน Server Component → HTML พร้อมข้อมูลตั้งแต่ server render

// ─── 1. API Response Type ───
type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ─── 2. Server Action / Fetch Function (lib/actions/) ───
// แยก fetch logic ออกจาก page — reuse + test ได้
async function getUsers(params: {
  page?: number;
  limit?: number;
}) {
  const res = await fetch(
    \`\${API_URL}/users?page=\${params.page ?? 1}&limit=\${params.limit ?? 20}\`,
    { cache: 'no-store' } // dynamic data — ไม่ cache
  );
  return res.json() as Promise<PaginatedResponse<User>>;
}

// ─── 3. Page (Server Component) ───
// searchParams เปลี่ยน page โดยไม่ต้อง useState
export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { page, limit } = await searchParams;

  const { data: users, meta } = await getUsers({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
  });

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={users} />
      <AdminPagination
        page={meta.page}
        totalPages={meta.totalPages}
        total={meta.total}
        limit={meta.limit}
      />
    </div>
  );
}

// ─── เปรียบเทียบ ───
// Mock:   MOCK_USERS.slice() → client-side, ใช้ useState
// API:    fetch ใน Server Component → server render พร้อมข้อมูล
// Page:   searchParams จัดการ pagination → URL shareable
//
// GET /users?page=2&limit=20
// → { data: [...], meta: { page: 2, totalPages: 5, total: 100, limit: 20 } }`,
  },

  // ─── 2. Column Search/Filter ───
  {
    key: 'column-search',
    title: 'Column Search/Filter',
    description:
      'Input ค้นหา name/email + Select filter role — reset page เป็น 1 เมื่อ filter เปลี่ยน',
    code: `// Pattern: Search + Filter + DataTable + Pagination
// Key concepts:
// 1. useMemo สำหรับ filtered data — ไม่ filter ทุก render
// 2. Reset page เป็น 1 เมื่อ filter เปลี่ยน
// 3. แยก handler function (handleSearchChange, handleRoleChange)

import { useState, useMemo } from 'react';

// Filter logic
const filtered = useMemo(() => {
  return users.filter((user) => {
    const matchSearch =
      search === '' ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || user.role === roleFilter;
    return matchSearch && matchRole;
  });
}, [search, roleFilter]);

// Reset page on filter change
function handleSearchChange(value: string) {
  setSearch(value);
  setPage(1); // ← สำคัญ! ไม่งั้น user อาจอยู่ page ที่ไม่มีข้อมูล
}`,
  },
  {
    key: 'column-search-usage',
    title: 'Column Search/Filter — Live Demo',
    description:
      'ตัวอย่างเต็ม — Input + Select + DataTable + Pagination + filtered count',
    code: `// ตัวอย่างการใช้งาน Search + Filter
'use client';

import { useState, useMemo } from 'react';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export function SearchableTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    return USERS.filter((user) => {
      const matchSearch = search === ''
        || user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || user.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const data = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา name หรือ email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8"
          />
        </div>
        <Select value={roleFilter}
          onValueChange={(v) => { setRoleFilter(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">ทุก Role</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={data} />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} รายการ
        </p>
        <Pagination currentPage={page} totalPages={totalPages}
          onPageChange={setPage} />
      </div>
    </div>
  );
}`,
  },

  // ─── 3. Row Actions (Edit/Delete) ───
  {
    key: 'row-actions',
    title: 'Row Actions (Edit/Delete)',
    description:
      'DropdownMenu per row — Edit (Dialog) + Delete (ConfirmDialog) + showToast feedback',
    code: `// Pattern: Row Actions with DropdownMenu
// Reuse: ConfirmDialog (shared), showToast (shared), Dialog (shadcn)
//
// Key concepts:
// 1. DropdownMenu ใน actions column
// 2. Delete → ConfirmDialog (destructive) → ลบจาก state → showToast
// 3. Edit → Dialog pre-filled → save → showToast
// 4. เช็ค: ถ้า page ปัจจุบันหมดข้อมูล → setPage(page - 1)

import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { showToast } from '@/components/shared/show-toast';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

// Actions column definition
{
  key: 'actions',
  header: '',
  cell: (row) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="size-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openEdit(row)}>
          <Pencil className="mr-2 size-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive"
          onClick={() => setDeleteTarget(row)}>
          <Trash2 className="mr-2 size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  className: 'w-10',
}`,
  },
  {
    key: 'row-actions-usage',
    title: 'Row Actions — Full Example',
    description:
      'ตัวอย่างเต็ม — DropdownMenu + Edit Dialog + ConfirmDialog + showToast',
    code: `// State management สำหรับ Row Actions
const [users, setUsers] = useState<User[]>([...MOCK_USERS]);
const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
const [editTarget, setEditTarget] = useState<User | null>(null);

// Delete handler
function handleDelete() {
  if (!deleteTarget) return;
  setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
  showToast({
    type: 'success',
    title: 'ลบสำเร็จ',
    description: \`ลบ \${deleteTarget.name} แล้ว\`,
  });
  setDeleteTarget(null);
  // ถ้า page ปัจจุบันหมดข้อมูล → ย้อนกลับ
  if (data.length === 1 && page > 1) setPage(page - 1);
}

// Edit handler
function handleSaveEdit() {
  if (!editTarget) return;
  setUsers((prev) =>
    prev.map((u) =>
      u.id === editTarget.id
        ? { ...u, name: editName, email: editEmail }
        : u
    )
  );
  showToast({ type: 'success', title: 'แก้ไขสำเร็จ' });
  setEditTarget(null);
}

// ConfirmDialog for delete
<ConfirmDialog
  open={!!deleteTarget}
  onOpenChange={(open) => !open && setDeleteTarget(null)}
  title="ลบข้อมูล"
  description={\`ต้องการลบ "\${deleteTarget?.name}" หรือไม่?\`}
  onConfirm={handleDelete}
  variant="destructive"
/>`,
  },

  // ─── 4. Sortable Columns ───
  {
    key: 'sortable-columns',
    title: 'Sortable Columns',
    description:
      'Clickable header toggle asc/desc/none — ใช้ sortByField() utility',
    code: `// utils/sort-by-field.ts — Pure sort helper
export type SortDirection = 'asc' | 'desc';

export type SortConfig<T> = {
  field: keyof T;
  direction: SortDirection;
} | null;

export function sortByField<T>(
  items: readonly T[],
  config: SortConfig<T>
): T[] {
  if (!config) return [...items];
  const { field, direction } = config;
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// Sort cycle: none → asc → desc → none
function handleSort(field: SortableField) {
  setSortConfig((prev) => {
    if (prev?.field !== field) return { field, direction: 'asc' };
    if (prev.direction === 'asc') return { field, direction: 'desc' };
    return null; // reset
  });
  setPage(1);
}`,
  },
  {
    key: 'sortable-columns-usage',
    title: 'Sortable Columns — Live Demo',
    description:
      'ตัวอย่างเต็ม — SortHeader component + ArrowUpDown icons + sortByField',
    code: `// SortHeader — reusable sort button for table header
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sortByField, type SortConfig } from '@/utils/sort-by-field';

function SortHeader({ label, field, sortConfig, onSort }) {
  const isActive = sortConfig?.field === field;
  const direction = isActive ? sortConfig.direction : null;

  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8"
      onClick={() => onSort(field)}>
      {label}
      {direction === 'asc' ? (
        <ArrowUp className="ml-1 size-3.5" />
      ) : direction === 'desc' ? (
        <ArrowDown className="ml-1 size-3.5" />
      ) : (
        <ArrowUpDown className="ml-1 size-3.5 text-muted-foreground" />
      )}
    </Button>
  );
}

// Usage in columns definition
const columns: Column<User>[] = [
  {
    key: 'name',
    header: (
      <SortHeader label="Name" field="name"
        sortConfig={sortConfig} onSort={handleSort} />
    ),
    cell: (row) => row.name,
  },
  // ... more sortable columns
];

// Sort data with useMemo
const sorted = useMemo(
  () => sortByField(MOCK_USERS, sortConfig),
  [sortConfig]
);`,
  },

  // ─── 5. Row Selection + Bulk Actions ───
  {
    key: 'row-selection',
    title: 'Row Selection + Bulk Actions',
    description:
      'Checkbox column + Select All (current page) + floating action bar + bulk delete',
    code: `// Pattern: Row Selection with Checkbox
// Key concepts:
// 1. selectedIds: Set<number> — track ข้าม pages ได้
// 2. Select All = เฉพาะ current page (ไม่ใช่ทั้งหมด)
// 3. Floating bar แสดงเมื่อ selectedIds.size > 0
// 4. Bulk delete → ConfirmDialog → ลบ → reset selectedIds

import { Checkbox } from '@/components/ui/checkbox';

// Checkbox column
{
  key: 'select',
  header: (
    <Checkbox
      checked={allPageSelected}
      onCheckedChange={toggleSelectAll}
      aria-label="Select all"
    />
  ),
  cell: (row) => (
    <Checkbox
      checked={selectedIds.has(row.id)}
      onCheckedChange={() => toggleSelect(row.id)}
      aria-label={\`Select \${row.name}\`}
    />
  ),
  className: 'w-10',
}

// Select All logic (current page only)
const allPageSelected = useMemo(
  () => data.length > 0 && data.every((u) => selectedIds.has(u.id)),
  [data, selectedIds]
);

function toggleSelectAll() {
  setSelectedIds((prev) => {
    const next = new Set(prev);
    if (allPageSelected) {
      data.forEach((u) => next.delete(u.id));
    } else {
      data.forEach((u) => next.add(u.id));
    }
    return next;
  });
}`,
  },
  {
    key: 'row-selection-usage',
    title: 'Row Selection — Floating Action Bar',
    description:
      'ตัวอย่างเต็ม — floating bar + bulk delete + ConfirmDialog',
    code: `// Floating action bar — แสดงเมื่อมีรายการที่เลือก
{selectedIds.size > 0 && (
  <div className="flex items-center justify-between rounded-lg
    border bg-muted/50 px-4 py-2">
    <span className="text-sm text-muted-foreground">
      เลือก {selectedIds.size} รายการ
    </span>
    <Button variant="destructive" size="sm"
      onClick={() => setShowConfirm(true)}>
      <Trash2 className="mr-2 size-4" />
      ลบที่เลือก
    </Button>
  </div>
)}

// Bulk delete handler
function handleBulkDelete() {
  setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)));
  showToast({
    type: 'success',
    title: 'ลบสำเร็จ',
    description: \`ลบ \${selectedIds.size} รายการแล้ว\`,
  });
  setSelectedIds(new Set());
  setShowConfirm(false);
  setPage(1); // reset page
}

// ConfirmDialog for bulk delete
<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="ลบข้อมูลที่เลือก"
  description={\`ต้องการลบ \${selectedIds.size} รายการหรือไม่?\`}
  onConfirm={handleBulkDelete}
  variant="destructive"
  confirmText="ลบทั้งหมด"
/>`,
  },

  // ─── 6. Expandable Rows ───
  {
    key: 'expandable-rows',
    title: 'Expandable Rows',
    description:
      'Chevron toggle → expand row detail (colSpan full width) — ใช้ renderRow prop ของ DataTable',
    code: `// Pattern: Expandable Rows with renderRow
// Key concepts:
// 1. DataTable รับ renderRow prop — custom render per row
// 2. expandedIds: Set<number> — track ว่า row ไหนกาง
// 3. Expanded row ใช้ TableRow + TableCell colSpan={columns.length}
// 4. React.Fragment key={row.id} ครอบ default row + expanded row

import { TableRow, TableCell } from '@/components/ui/table';
import { ChevronRight, ChevronDown } from 'lucide-react';
import React from 'react';

// Expand/collapse column
{
  key: 'expand',
  header: '',
  cell: (row) => (
    <Button variant="ghost" size="sm" className="size-8 p-0"
      onClick={() => toggleExpand(row.id)}
      aria-expanded={expandedIds.has(row.id)}>
      {expandedIds.has(row.id)
        ? <ChevronDown className="size-4" />
        : <ChevronRight className="size-4" />}
    </Button>
  ),
  className: 'w-10',
}

// Toggle logic
function toggleExpand(id: number) {
  setExpandedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
}`,
  },
  {
    key: 'expandable-rows-usage',
    title: 'Expandable Rows — renderRow Pattern',
    description:
      'ตัวอย่างเต็ม — DataTable renderRow + expanded detail card',
    code: `// ใช้ renderRow prop ของ DataTable
<DataTable
  columns={columns}
  data={data}
  renderRow={(row, defaultRow) => (
    <React.Fragment key={row.id}>
      {defaultRow}
      {expandedIds.has(row.id) && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={columns.length} className="p-4">
            <div className="grid gap-2 text-sm sm:grid-cols-3">
              <div>
                <span className="font-medium text-muted-foreground">
                  Department:{' '}
                </span>
                {row.department}
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Joined:{' '}
                </span>
                {row.joinedAt}
              </div>
              <div className="sm:col-span-3">
                <span className="font-medium text-muted-foreground">
                  Bio:{' '}
                </span>
                {row.bio}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  )}
/>`,
  },
];
