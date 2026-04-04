'use client';

import { useState, useMemo } from 'react';
import { DataTable, type Column } from '@/components/shared/forms/data-table';
import { Pagination } from '@/components/shared/forms/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  sortByField,
  type SortConfig,
  type SortDirection,
} from '@/utils/sort-by-field';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';

const PAGE_SIZE = 5;

type SortableField = 'name' | 'email' | 'joinedAt';

function SortHeader({
  label,
  field,
  sortConfig,
  onSort,
}: {
  label: string;
  field: SortableField;
  sortConfig: SortConfig<MockUser>;
  onSort: (field: SortableField) => void;
}) {
  const isActive = sortConfig?.field === field;
  const direction = isActive ? sortConfig.direction : null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => onSort(field)}
    >
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

export function SortablePreview() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<MockUser>>(null);

  function handleSort(field: SortableField) {
    setSortConfig((prev) => {
      if (prev?.field !== field) return { field, direction: 'asc' };
      if (prev.direction === 'asc') return { field, direction: 'desc' as SortDirection };
      return null;
    });
    setPage(1);
  }

  const sorted = useMemo(
    () => sortByField(MOCK_USERS, sortConfig),
    [sortConfig]
  );

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = sorted.slice(start, start + PAGE_SIZE);

  const columns: Column<MockUser>[] = [
    {
      key: 'name',
      header: (
        <SortHeader
          label="Name"
          field="name"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ),
      cell: (row) => row.name,
    },
    {
      key: 'email',
      header: (
        <SortHeader
          label="Email"
          field="email"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ),
      cell: (row) => row.email,
    },
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
      key: 'joinedAt',
      header: (
        <SortHeader
          label="Joined"
          field="joinedAt"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ),
      cell: (row) => row.joinedAt,
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
    </div>
  );
}
