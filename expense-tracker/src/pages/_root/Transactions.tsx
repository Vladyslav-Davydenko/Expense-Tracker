import Loader from "@/components/shared/Loader";
import { useGetExpenses } from "@/lib/react-query/QueriesAndMuntations";

const Transactions = () => {
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();

  if (isExpensesLoading) {
    return <Loader />;
  }

  return (
    <div>
      {expenses?.map((expense) => {
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <div
            key={expense.$id}
            className="flex gap-2 justify-start items-center"
          >
            <p>{expense.type.name}</p>
            <p>{expense.description}</p>
            <p>{formattedDate}</p>
            <p
              className={`${
                expense.isSpent ? "text-red-500" : "text-green-500"
              }`}
            >
              {expense.isSpent ? "- " : "+ "}
              {expense.amount / 100} $
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
