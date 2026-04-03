'use client';

import { useState, useMemo } from 'react';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { showToast } from '@/components/shared/show-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';

const PAGE_SIZE = 5;

export function RowSelectionPreview() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<MockUser[]>([...MOCK_USERS]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = users.slice(start, start + PAGE_SIZE);

  const allPageSelected = useMemo(
    () => data.length > 0 && data.every((u) => selectedIds.has(u.id)),
    [data, selectedIds]
  );

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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
  }

  function handleBulkDelete() {
    setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)));
    showToast({
      type: 'success',
      title: 'ลบสำเร็จ',
      description: `ลบ ${selectedIds.size} รายการแล้ว`,
    });
    setSelectedIds(new Set());
    setShowConfirm(false);
    setPage(1);
  }

  const columns: Column<MockUser>[] = [
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
          aria-label={`Select ${row.name}`}
        />
      ),
      className: 'w-10',
    },
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

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2">
          <span className="text-sm text-muted-foreground">
            เลือก {selectedIds.size} รายการ
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 className="mr-2 size-4" />
            ลบที่เลือก
          </Button>
        </div>
      )}

      <DataTable columns={columns} data={data} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="ลบข้อมูลที่เลือก"
        description={`ต้องการลบ ${selectedIds.size} รายการที่เลือกหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`}
        onConfirm={handleBulkDelete}
        variant="destructive"
        confirmText="ลบทั้งหมด"
        cancelText="ยกเลิก"
      />
    </div>
  );
}
