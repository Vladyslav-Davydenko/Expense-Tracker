import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";

import { IExpenses } from "@/types";

import EditableCell from "./editable-cell";
import ChoiceCell from "./choice-cell";
import HiddenCell from "./hidden-cell";
import DateTimeCell from "./date-time-cell";

export const columns: ColumnDef<IExpenses>[] = [
  {
    accessorKey: "$id",
    enableSorting: false,
    header: () => <div>Expense's ID</div>,
    cell: HiddenCell,
  },
  {
    accessorKey: "type.name",
    header: () => <div className="text-start pl-[12px]">Type</div>,
    cell: ChoiceCell,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterTypes: string[]) => {
      if (filterTypes.length <= 0) return true;
      const type = row.getValue(columnId) as string;
      return filterTypes.includes(type);
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-start pl-[12px]">Description</div>,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "date",
    header: () => <div className="text-start pl-[12px]">Date</div>,
    cell: DateTimeCell,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    sortingFn: (rowA, rowB, columnId) => {
      const amountA = rowA.getValue(columnId) as number;
      const amountB = rowB.getValue(columnId) as number;
      const isSpentA = rowA.original.isSpent;
      const isSpentB = rowB.original.isSpent;
      const formatedAmountA = isSpentA ? amountA * -1 : amountA;
      const formatedAmountB = isSpentB ? amountB * -1 : amountB;
      return formatedAmountA > formatedAmountB
        ? 1
        : formatedAmountA < formatedAmountB
        ? -1
        : 0;
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount")) / 100;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      const isSpent = row.original.isSpent ? "-" : "+";
      const cellClassName = clsx({
        "text-right font-medium min-w-[100px]": true,
        "text-red-500": row.original.isSpent,
        "text-green-500": !row.original.isSpent,
      });
      return <div className={cellClassName}>{`${isSpent} ${formatted}`}</div>;
    },
  },
];
