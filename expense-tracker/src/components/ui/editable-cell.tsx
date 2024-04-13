import { useEffect, useState } from "react";
import { Input } from "./input";
import { Column, Row } from "@tanstack/react-table";
import { IExpenses } from "@/types";
import { useUpdateExpenses } from "@/lib/react-query/QueriesAndMuntations";

interface EditableCellProps {
  getValue: () => any;
  row: Row<IExpenses>;
  column: Column<IExpenses>;
}

const EditableCell = ({ getValue, row, column }: EditableCellProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue as string);

  const { mutateAsync: updateExpense } = useUpdateExpenses();

  const handleOnBlur = async () => {
    if (value === initialValue) return;
    const newExpense = { ...row.original, [column.id]: value };

    const expense = await updateExpense(newExpense);

    if (expense) console.log(expense);
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
