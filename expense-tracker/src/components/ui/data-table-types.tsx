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

import ColumnFilter from "../shared/Types/filters/column-filter";
import Pagination from "../shared/Pagination/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { INewType } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setType: React.Dispatch<React.SetStateAction<INewType & { $id: string }>>;
}

export interface IColumnFilters {
  id: string;
  value: string | string[];
}

function DataTableTypes<TData, TValue>({
  data,
  columns,
  setType,
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
        pageSize: 4, //custom default page size
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="mb-8">
        <ColumnFilter
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <div className="rounded-md bg-primary shadow-md drop-shadow-md">
        <p className="p-4 rounded-md bg-primary shadow-md">Types</p>
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
                  className="hover:bg-primary-light cursor-pointer"
                  onClick={() => {
                    const id = row.getValue(
                      row.getVisibleCells()[0].column.id
                    ) as string;
                    const name = row.getValue(
                      row.getVisibleCells()[1].column.id
                    ) as string;
                    const color = row.getValue(
                      row.getVisibleCells()[2].column.id
                    ) as string;
                    setType({
                      $id: id,
                      name,
                      color,
                    });
                  }}
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
      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        setPageIndex={table.setPageIndex}
        totalOnSinglePage={table.initialState.pagination.pageSize}
        totalEntries={table.getRowCount()}
      />
    </>
  );
}

export default DataTableTypes;
