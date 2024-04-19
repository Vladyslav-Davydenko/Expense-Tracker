import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateExpenses } from "@/lib/react-query/QueriesAndMuntations";

import { IExpenses } from "@/types";

import { Input } from "../../ui/input";
import { Column, Row } from "@tanstack/react-table";

interface EditableCellProps {
  getValue: () => unknown;
  row: Row<IExpenses>;
  column: Column<IExpenses>;
}

const EditableCell = ({ getValue, row, column }: EditableCellProps) => {
  const initialValue = getValue() as string;

  const { toast } = useToast();
  const [value, setValue] = useState(initialValue);
  const { mutateAsync: updateExpense } = useUpdateExpenses();

  const handleOnBlur = async () => {
    if (value === initialValue) return;
    const newExpense = { ...row.original, [column.id]: value };

    const expense = await updateExpense(newExpense);

    if (!expense) {
      return toast({
        title: "Update failed. Please try again.",
      });
    }

    return toast({
      title: "Update successed.",
    });
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <Input
      onBlur={handleOnBlur}
      value={value}
      className="bg-transparent border-0 hover:bg-primary"
      onChange={(e) => setValue(e.target.value)}
    ></Input>
  );
};

export default EditableCell;
