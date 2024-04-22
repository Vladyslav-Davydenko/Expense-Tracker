import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ColumnFilter from "../shared/Transactions/Filters/column-filter";
import CreateExpense from "../shared/Dialog/CreateExpense";
import TypeFilter from "../shared/Transactions/Filters/type-filter";
import Pagination from "../shared/Pagination/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isNotDashboard?: boolean;
}

export interface IColumnFilters {
  id: string;
  value: string | string[];
}

function DataTable<TData, TValue>({
  data,
  columns,
  isNotDashboard = false,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<IColumnFilters[]>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 8, //custom default page size
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {isNotDashboard && (
        <div className="grid grid-cols-6 gap-4 mb-8">
          <div className="flex-1 col-span-2">
            <ColumnFilter
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          </div>
          <div>
            <TypeFilter
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          </div>
          <div className="col-span-2" />
          <div className="flex justify-end items-center gap-4">
            <CreateExpense />
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <div className="flex items-center justify-between ">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <img
                            src="/assets/icons/sort.svg"
                            alt="sort"
                            className="w-[18px] h-[18px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            onClick={header.column.getToggleSortingHandler()}
                          />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isNotDashboard && (
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          setPageIndex={table.setPageIndex}
        />
      )}
    </>
  );
}

export default DataTable;
