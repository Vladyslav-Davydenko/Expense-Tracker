import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";

import { IExpenses } from "@/types";

import EditableCell from "./editable-cell";
import ChoiceCell from "./choice-cell";
import HiddenCell from "./hidden-cell";

export const columns: ColumnDef<IExpenses>[] = [
  {
    accessorKey: "$id",
    header: () => <div>Expense's ID</div>,
    cell: HiddenCell,
  },
  {
    accessorKey: "type.name",
    header: "Type",
    cell: ChoiceCell,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-start pl-[12px]">Description</div>,
    cell: EditableCell,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-start">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate =
        date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }) +
        ", " +
        date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount")) / 100;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      const isSpent = row.original.isSpent ? "-" : "+";
      const cellClassName = clsx({
        "text-right font-medium": true,
        "text-red-500": row.original.isSpent,
        "text-green-500": !row.original.isSpent,
      });
      return <div className={cellClassName}>{`${isSpent} ${formatted}`}</div>;
    },
  },
];
