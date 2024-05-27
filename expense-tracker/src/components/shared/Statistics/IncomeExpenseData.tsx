import { IExpenses } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

import { calculateLargest, filterExpensesBasedOnMonth } from "@/lib/utils";

interface IncomeExpenseDataProps {
  expenses: IExpenses[];
}

const IncomeExpenseData = ({ expenses }: IncomeExpenseDataProps) => {
  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth > 0 ? currentMonth - 1 : 11;

  // Biggest Income
  const currentMonthBiggestIncome = calculateLargest({
    expenses,
    isSpent: false,
    month: currentMonth,
  });
  const previousMonthBiggestIncome = calculateLargest({
    expenses,
    isSpent: false,
    month: previousMonth,
  });
  const incomeDifferencePercentage =
    previousMonthBiggestIncome === 0
      ? 0
      : ((currentMonthBiggestIncome - previousMonthBiggestIncome) /
          previousMonthBiggestIncome) *
        100;

  // Largest Expense
  const currentMonthLargestExpense = calculateLargest({
    expenses,
    isSpent: true,
    month: currentMonth,
  });
  const previousMonthLargestExpense = calculateLargest({
    expenses,
    isSpent: true,
    month: previousMonth,
  });
  const expenseDifferencePercentage =
    previousMonthLargestExpense === 0
      ? 0
      : ((currentMonthLargestExpense - previousMonthLargestExpense) /
          previousMonthLargestExpense) *
        100;

  // Comparison expenses
  const expensesComparisonCurrentMonth = filterExpensesBasedOnMonth({
    expenses,
    isSpent: true,
    month: currentMonth,
  });
  const expensesComparisonPreviousMonth = filterExpensesBasedOnMonth({
    expenses,
    isSpent: true,
    month: previousMonth,
  });
  const expensesComparisonDifference =
    expensesComparisonPreviousMonth === 0
      ? 0
      : ((expensesComparisonCurrentMonth - expensesComparisonPreviousMonth) /
          expensesComparisonPreviousMonth) *
        100;

  // Comparison incomes
  const incomesComparisonCurrentMonth = filterExpensesBasedOnMonth({
    expenses,
    isSpent: false,
    month: currentMonth,
  });
  const incomesComparisonPreviousMonth = filterExpensesBasedOnMonth({
    expenses,
    isSpent: false,
    month: previousMonth,
  });
  const incomesComparisonDifference =
    incomesComparisonPreviousMonth === 0
      ? 0
      : ((incomesComparisonCurrentMonth - incomesComparisonPreviousMonth) /
          incomesComparisonPreviousMonth) *
        100;

  const renderDifference = (difference: number, isPositive: boolean) => (
    <>
      {isPositive ? (
        <ArrowUp className="text-green-500" />
      ) : (
        <ArrowDown className="text-red-500" />
      )}
      <span
        className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        {`${difference.toFixed(2)}%`}
      </span>
    </>
  );

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className="text-sm opacity-80">Largest expense</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">{`$${currentMonthLargestExpense.toFixed(
            2
          )}`}</p>
          {currentMonthLargestExpense !== previousMonthLargestExpense &&
            renderDifference(
              expenseDifferencePercentage,
              currentMonthLargestExpense >= previousMonthLargestExpense
            )}
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className="text-sm opacity-80">Biggest income</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">{`$${currentMonthBiggestIncome.toFixed(
            2
          )}`}</p>
          {currentMonthBiggestIncome !== previousMonthBiggestIncome &&
            renderDifference(
              incomeDifferencePercentage,
              currentMonthBiggestIncome >= previousMonthBiggestIncome
            )}
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className="text-sm opacity-80">Comparison expenses</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">{`$${expensesComparisonCurrentMonth.toFixed(
            2
          )}`}</p>
          {expensesComparisonCurrentMonth !== expensesComparisonPreviousMonth &&
            renderDifference(
              expensesComparisonDifference,
              expensesComparisonCurrentMonth >= expensesComparisonPreviousMonth
            )}
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className="text-sm opacity-80">Comparison income</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">{`$${incomesComparisonCurrentMonth.toFixed(
            2
          )}`}</p>
          {incomesComparisonCurrentMonth !== incomesComparisonPreviousMonth &&
            renderDifference(
              incomesComparisonDifference,
              incomesComparisonCurrentMonth >= incomesComparisonPreviousMonth
            )}
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseData;
