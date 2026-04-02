'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { showToast } from '@/components/shared/show-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';

const PAGE_SIZE = 5;

export function RowActionsPreview() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<MockUser[]>([...MOCK_USERS]);
  const [deleteTarget, setDeleteTarget] = useState<MockUser | null>(null);
  const [editTarget, setEditTarget] = useState<MockUser | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = users.slice(start, start + PAGE_SIZE);

  function handleDelete() {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    showToast({
      type: 'success',
      title: 'ลบสำเร็จ',
      description: `ลบ ${deleteTarget.name} แล้ว`,
    });
    setDeleteTarget(null);
    if (data.length === 1 && page > 1) setPage(page - 1);
  }

  function openEdit(user: MockUser) {
    setEditTarget(user);
    setEditName(user.name);
    setEditEmail(user.email);
  }

  function handleSaveEdit() {
    if (!editTarget) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editTarget.id ? { ...u, name: editName, email: editEmail } : u
      )
    );
    showToast({
      type: 'success',
      title: 'แก้ไขสำเร็จ',
      description: `อัปเดต ${editName} แล้ว`,
    });
    setEditTarget(null);
  }

  const columns: Column<MockUser>[] = [
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
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteTarget(row)}
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      className: 'w-10',
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="ลบข้อมูล"
        description={`ต้องการลบ "${deleteTarget?.name}" หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`}
        onConfirm={handleDelete}
        variant="destructive"
        confirmText="ลบ"
        cancelText="ยกเลิก"
      />

      <Dialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูล</DialogTitle>
            <DialogDescription>
              แก้ไข name และ email ของ user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveEdit}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
