'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  columns,
  data,
  emptyMessage = 'ไม่มีข้อมูล',
  className,
  renderRow,
}: DataTableProps<T>) {
  return (
    <div className={cn('rounded-md border', className)}>
    <Table>
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
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
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
    </div>
  );
}
