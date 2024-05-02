import { IType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ConfirmToDeleteType from "../dialog/ConfirmToDeleteType";

const TypesColumnsMethods = () => {
  return {
    accessor: "action",
    header: "",
    id: "delete",
    cell: ({ row }) => {
      const item = row.original;
      if (!item.$id) return <></>;

      const id = item.$id.toString();
      return (
        <>
          <ConfirmToDeleteType id={id} />
        </>
      );
    },
  } as ColumnDef<IType>;
};

export default TypesColumnsMethods;
