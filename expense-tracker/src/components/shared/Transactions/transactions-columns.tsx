import { IExpenses } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

export const columns: ColumnDef<IExpenses>[] = [
  {
    accessorKey: "type.name",
    header: "Type",
    cell: ({ row }) => {
      const boxColor = `bg-${row.original.type.color}`;
      const boxClasses = clsx({
        [boxColor]: true,
        "w-[16px] h-[16px] rounded-sm": true,
      });
      return <div className={boxClasses}></div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleString("en-US");
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
