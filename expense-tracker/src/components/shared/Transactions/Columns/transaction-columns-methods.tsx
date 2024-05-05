import { IExpenses } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import ConfirmationToDelete from "../dialog/ConfirmationToDelete";

const TransactionColumnsMethods = () => {
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
          <ConfirmationToDelete id={id} />
        </>
      );
    },
  } as ColumnDef<IExpenses>;
};

export default TransactionColumnsMethods;
