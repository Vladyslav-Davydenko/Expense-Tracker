import { useGetExpenses } from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  return (
    <div>
      <h2 className=" text-xl font-semibold tracking-wider uppercase px-8 pt-10">
        Dashboard
      </h2>
      <div>
        <TransactionsTable
          expenses={expenses?.slice(0, 4) || []}
          isLoading={isExpensesLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
