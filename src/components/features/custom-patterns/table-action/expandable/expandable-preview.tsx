'use client';

import { useState } from 'react';
import { DataTable, type Column } from '@/components/shared/data-table';
import { Pagination } from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { MOCK_USERS, type MockUser } from '../_data/mock-users';
import React from 'react';

const PAGE_SIZE = 5;

export function ExpandablePreview() {
  const [page, setPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  function toggleExpand(id: number) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const totalPages = Math.ceil(MOCK_USERS.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const data = MOCK_USERS.slice(start, start + PAGE_SIZE);

  const columns: Column<MockUser>[] = [
    {
      key: 'expand',
      header: '',
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0"
          onClick={() => toggleExpand(row.id)}
          aria-expanded={expandedIds.has(row.id)}
        >
          {expandedIds.has(row.id) ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
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
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
