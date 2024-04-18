import { Button } from "@/components/ui/button";
import { IExpenses } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
        <div className="table-action-button-group">
          <Button
            id={id}
            variant="ghost"
            onClick={() => handleRemoveButtonClick(id)}
          >
            <img
              src="/assets/icons/cross.svg"
              alt="delete"
              className="w-[20px] h-[20px]"
            />
          </Button>
        </div>
      );
    },
  } as ColumnDef<IExpenses>;
};

export default TransactionColumnsMethods;
