import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";
import DoughnutChart from "@/components/shared/Charts/DoughnutChart";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  const { data: types } = useGetTypes();

  return (
    <div className="container flex flex-col gap-10">
      <h2 className="text-xl font-semibold tracking-wider uppercase px-8 pt-10">
        Dashboard
      </h2>
      <div className="flex flex-wrap gap-4">
        <div>
          <TransactionsTable
            expenses={expenses?.slice(0, 4) || []}
            isLoading={isExpensesLoading}
          />
        </div>
        <div className="w-[400px] h-[400px] p-4 border border-white rounded-md">
          <DoughnutChart expenses={expenses ?? []} types={types ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
