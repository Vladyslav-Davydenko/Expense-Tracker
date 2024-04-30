import { IExpenses } from "@/types";
import { columns } from "./Columns/transaction-columns";
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
      <h2 className=" text-xl font-semibold tracking-wider uppercase mb-10">
        Transaction Table
      </h2>
      <DataTable columns={columns} data={expenses} isNotDashboard={true} />
    </div>
  );
}
