import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";

export interface IListTable<T> {
  rows: T[];
  columns: ColumnDef<T>[];
}

export function useListTable<T>({ rows, columns }: IListTable<T>) {
  return useReactTable<T>({
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
}
