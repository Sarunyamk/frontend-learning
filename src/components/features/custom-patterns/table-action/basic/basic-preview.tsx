'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/components/shared/forms/data-table';
import { Pagination } from '@/components/shared/forms/pagination';
import { Badge } from '@/components/ui/badge';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';

const PAGE_SIZE = 5;

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
  { key: 'joinedAt', header: 'Joined', cell: (row) => row.joinedAt },
];

export function BasicTablePreview() {
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
}
