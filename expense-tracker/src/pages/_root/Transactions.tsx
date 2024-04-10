import Loader from "@/components/shared/Loader";
import { useGetExpenses } from "@/lib/react-query/QueriesAndMuntations";
import clsx from "clsx";

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
        //TODO: find a normall solution for colors
        const boxColor = `bg-${expense.type.color}`;
        const boxClasses = clsx({
          [boxColor]: true,
          "w-[16px] h-[16px] rounded-sm": true,
        });
        return (
          <div
            key={expense.$id}
            className="flex gap-2 justify-start items-center"
          >
            <span className={boxClasses}></span>
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
            {/* Do not use this */}
            <span className=" bg-yellow-500 bg-pink-500 bg-blue-500"></span>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
