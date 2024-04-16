import { IExpenses } from "@/types";
import { columns } from "./transaction-columns";
import DataTable from "@/components/ui/data-table";
import Loader from "../Loader";

interface TransactionsTableProps {
  expenses: IExpenses[];
  isLoading: boolean;
}

export default function TransactionsTable({
  expenses,
  isLoading,
}: TransactionsTableProps) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={expenses} isNotDashboard={true} />
    </div>
  );
}
