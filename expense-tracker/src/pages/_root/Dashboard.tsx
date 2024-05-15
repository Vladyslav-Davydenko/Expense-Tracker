import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";
import DoughnutChart from "@/components/shared/Charts/DoughnutChart";
import LineChart from "@/components/shared/Charts/LineChart";
import Topbar from "@/components/shared/Topbar";
import DashBoardTopBar from "@/components/shared/DashBoard/DashBoardTopBar";
import {
  TableDashBoardSceleton,
  MonthlyComparisonSceleton,
} from "@/components/shared/Sceletons";
import MonthComparison from "@/components/shared/DashBoard/MonthComparison";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  const { data: types, isLoading: isTypesLoading } = useGetTypes();

  return (
    <div className="container flex flex-col gap-10 mb-10">
      <Topbar />
      <h2 className="text-xl font-semibold tracking-wider uppercase px-8 pt-10">
        Dashboard
      </h2>
      <DashBoardTopBar expenses={expenses ?? []} />
      <div className="flex flex-wrap gap-4">
        <div className="rounded-md bg-primary shadow-md flex-1">
          <p className="p-4 rounded-md bg-primary shadow-md">
            All Expenses each year comparison
          </p>
          <LineChart expenses={expenses ?? []} />
        </div>
        <div className="w-[400px] rounded-md bg-primary shadow-md">
          <p className="p-4 rounded-md bg-primary shadow-md">
            Comparison by type expenses
          </p>
          <DoughnutChart expenses={expenses ?? []} types={types ?? []} />
        </div>
        {isExpensesLoading ? (
          <TableDashBoardSceleton />
        ) : (
          <div>
            <TransactionsTable
              expenses={expenses?.slice(0, 4) || []}
              isLoading={isExpensesLoading}
            />
          </div>
        )}
        {isTypesLoading ? (
          <MonthlyComparisonSceleton />
        ) : (
          <div className="flex-1">
            <MonthComparison expenses={expenses || []} types={types ?? []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
