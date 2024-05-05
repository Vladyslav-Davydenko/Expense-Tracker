import { IExpenses } from "@/types";
import { columns } from "./columns/transactions-columns-dashboard";
import DataTable from "@/components/ui/data-table";

import { TableDashBoardSceleton } from "../Sceletons";

interface TransactionsTableDashboardProps {
  expenses: IExpenses[];
  isLoading: boolean;
}

export default function TransactionsTableDashboard({
  expenses,
  isLoading,
}: TransactionsTableDashboardProps) {
  if (isLoading) {
    return <TableDashBoardSceleton />;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}
