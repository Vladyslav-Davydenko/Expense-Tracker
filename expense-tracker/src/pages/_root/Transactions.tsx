import { useGetExpenses } from "@/lib/react-query/QueriesAndMuntations";

import TransactionsTable from "@/components/shared/Transactions/TransactionsTable";

const Transactions = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();

  return (
    <TransactionsTable
      expenses={expenses || []}
      isLoading={isExpensesLoading}
    />
  );
};

export default Transactions;
