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
