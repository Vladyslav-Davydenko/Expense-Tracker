import { IExpenses } from "@/types";
import { columns } from "./transactions-columns-dashboard";
import DataTable from "@/components/ui/data-table";
import Loader from "../Loader";

interface TransactionsTableDashboardProps {
  expenses: IExpenses[];
  isLoading: boolean;
}

export default function TransactionsTableDashboard({
  expenses,
  isLoading,
}: TransactionsTableDashboardProps) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}
