'use client';

import { useState, useMemo } from 'react';
import { DataTable, type Column } from '@/components/shared/forms/data-table';
import { Pagination } from '@/components/shared/forms/pagination';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';

const PAGE_SIZE = 5;
const ROLE_OPTIONS = ['All', 'Admin', 'Editor', 'Viewer'] as const;

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
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'outline' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

export function ColumnSearchPreview() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchSearch =
        search === '' ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || user.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = filtered.slice(start, start + PAGE_SIZE);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleRoleChange(value: string) {
    setRoleFilter(value);
    setPage(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา name หรือ email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={roleFilter} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full sm:w-35">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((role) => (
              <SelectItem key={role} value={role}>
                {role === 'All' ? 'ทุก Role' : role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={data} />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} รายการ
        </p>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
