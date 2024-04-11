import { useGetLatestExpenses } from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTable";

const Dashboard = () => {
  const { data: expenses, isLoading: isExpensesLoading } =
    useGetLatestExpenses();
  return (
    <div>
      <TransactionsTable
        expenses={expenses || []}
        isLoading={isExpensesLoading}
      />
    </div>
  );
};

export default Dashboard;
