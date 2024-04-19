import { DateTimePicker } from "@/components/ui/date-time-picker";
import { IExpenses } from "@/types";
import { Row } from "@tanstack/react-table";

interface DateTimeCellProps {
  getValue: () => string;
  row: Row<IExpenses>;
}

export default function DateTimeCellProps({
  getValue,
  row,
}: DateTimeCellProps) {
  const initialDate = new Date(getValue());
  const expense = row.original;
  return (
    <DateTimePicker
      initialDate={initialDate}
      expense={expense}
    ></DateTimePicker>
  );
}
