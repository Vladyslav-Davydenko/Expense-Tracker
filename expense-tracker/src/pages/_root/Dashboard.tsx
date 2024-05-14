import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";
import DoughnutChart from "@/components/shared/Charts/DoughnutChart";
import LineChart from "@/components/shared/Charts/LineChart";
import Topbar from "@/components/shared/Topbar";
import DashBoardTopBar from "@/components/shared/DashBoard/DashBoardTopBar";
import { TableDashBoardSceleton } from "@/components/shared/Sceletons";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  const { data: types } = useGetTypes();

  return (
    <div className="container flex flex-col gap-10 mb-10">
      <Topbar />
      <h2 className="text-xl font-semibold tracking-wider uppercase px-8 pt-10">
        Dashboard
      </h2>
      <DashBoardTopBar expenses={expenses ?? []} />
      <div className="flex flex-wrap gap-4">
        <div className=" p-4 rounded-md bg-primary shadow-md flex-1">
          <LineChart expenses={expenses ?? []} />
        </div>
        <div className="w-[400px] h-[400px] p-4 rounded-md bg-primary shadow-md">
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
      </div>
    </div>
  );
};

export default Dashboard;
