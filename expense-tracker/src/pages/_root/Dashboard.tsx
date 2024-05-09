import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";
import DoughnutChart from "@/components/shared/Charts/DoughnutChart";
import BarChart from "@/components/shared/Charts/BarChart";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  const { data: types } = useGetTypes();

  return (
    <div className="container flex flex-col gap-10">
      <h2 className="text-xl font-semibold tracking-wider uppercase px-8 pt-10">
        Dashboard
      </h2>
      <div className="flex flex-wrap gap-4">
        <div className="w-[700px] h-[400px] p-4 border border-white rounded-md">
          <BarChart expenses={expenses ?? []} />
        </div>
        <div className="w-[400px] h-[400px] p-4 border border-white rounded-md">
          <DoughnutChart expenses={expenses ?? []} types={types ?? []} />
        </div>
        <div>
          <TransactionsTable
            expenses={expenses?.slice(0, 4) || []}
            isLoading={isExpensesLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
