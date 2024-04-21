import { IExpenses } from "@/types";
import { columns } from "./transaction-columns";
import DataTable from "@/components/ui/data-table";
import { TableSceleton } from "../Sceletons";

interface TransactionsTableProps {
  expenses: IExpenses[];
  isLoading: boolean;
}

export default function TransactionsTable({
  expenses,
  isLoading,
}: TransactionsTableProps) {
  if (isLoading) {
    return <TableSceleton />;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={expenses} isNotDashboard={true} />
    </div>
  );
}
