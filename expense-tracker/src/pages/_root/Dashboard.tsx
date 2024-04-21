import { useGetExpenses } from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTableDashboard";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();
  return (
    <div>
      <TransactionsTable
        expenses={expenses?.slice(0, 4) || []}
        isLoading={isExpensesLoading}
      />
    </div>
  );
};

export default Dashboard;
