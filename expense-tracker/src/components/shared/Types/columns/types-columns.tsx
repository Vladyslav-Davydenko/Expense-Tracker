import { IType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import HiddenCell from "../../Transactions/Cells/hidden-cell";
import TypesColumnsMethods from "./types-columns-methods";

export const columns: ColumnDef<IType>[] = [
  {
    accessorKey: "$id",
    enableSorting: false,
    header: () => <div>Type's ID</div>,
    cell: HiddenCell,
  },
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
  },
  {
    accessorKey: "color",
    header: () => <p className="text-end w-full">Color</p>,
    enableSorting: false,
    cell: ({ row }) => {
      const boxColor = row.original.color;
      return (
        <div className="flex justify-end items-center">
          <div
            className="w-[16px] h-[16px] rounded-sm"
            style={{ backgroundColor: boxColor }}
          ></div>
        </div>
      );
    },
  },
  TypesColumnsMethods(),
];
