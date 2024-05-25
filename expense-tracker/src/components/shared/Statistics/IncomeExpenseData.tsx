import { IExpenses } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

import { calculateLargest } from "@/lib/utils";

interface IncomeExpenseDataProps {
  expenses: IExpenses[];
}

const IncomeExpenseData = ({ expenses }: IncomeExpenseDataProps) => {
  // CALCULATIONS
  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth > 1 ? currentMonth - 1 : currentMonth;
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
  console.log(currentMonthBiggestIncome, previousMonthBiggestIncome);
  const incomeDifferencePersantage = (
    (currentMonthBiggestIncome / previousMonthBiggestIncome) *
    100
  ).toFixed(2);
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
  const expenseDifferencePersantage = (
    (currentMonthLargestExpense / previousMonthLargestExpense) *
    100
  ).toFixed(2);
  console.log(currentMonthLargestExpense, previousMonthLargestExpense);

  //TODO:
  // Finish calculation
  // Change style based on the data
  // Add Neutral if changes is 0%

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className=" text-sm opacity-80">Largest expense</p>
        <div className="mt-4 flex justify-end items-end">
          <p className="text-lg">{`$${
            currentMonthLargestExpense ? currentMonthLargestExpense : 0
          }`}</p>
          <ArrowDown className=" text-red-500" />
          <span className="text-sm text-red-500 ">
            $
            {`${
              expenseDifferencePersantage ? expenseDifferencePersantage : 0
            }%`}
          </span>
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className=" text-sm opacity-80">Biggest income</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">{`$${
            currentMonthBiggestIncome ? currentMonthBiggestIncome : 0
          }`}</p>
          <ArrowUp className=" text-green-500" />
          <span className="text-sm text-green-500 ">
            ${`${incomeDifferencePersantage ? incomeDifferencePersantage : 0}%`}
          </span>
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className=" text-sm opacity-80">Comparison expenses</p>
        <div className="mt-4 flex justify-end items-end">
          <p className="text-lg">$1234</p>
          <ArrowDown className=" text-red-500" />
          <span className="text-sm text-red-500 ">12%</span>
        </div>
      </div>
      <div className="p-4 rounded-md bg-primary shadow-md">
        <p className=" text-sm opacity-80">Comparison income</p>
        <div className="mt-4 flex justify-end items-start">
          <p className="text-lg">$1234</p>
          <ArrowUp className=" text-green-500" />
          <span className="text-sm text-green-500 ">12%</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseData;
