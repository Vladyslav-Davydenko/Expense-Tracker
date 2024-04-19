import { IExpenses } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Confirmation from "../Dialog/Confirmation";

const TransactionColumnsMethods = () => {
  const handleRemoveButtonClick = (id: string) => {
    console.log("deleted: " + id);
  };
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
          <Confirmation action={() => handleRemoveButtonClick(id)} />
        </>
      );
    },
  } as ColumnDef<IExpenses>;
};

export default TransactionColumnsMethods;
