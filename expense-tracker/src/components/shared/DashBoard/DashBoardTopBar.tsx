import { IExpenses } from "@/types";
import { CreditCard, HandCoins, Wallet } from "lucide-react";

interface DashBoardTopBarProps {
  expenses: IExpenses[];
}

const DashBoardTopBar = ({ expenses }: DashBoardTopBarProps) => {
  let incomeCount = 0;
  let availableCount = 0;
  let expenseCount = 0;

  if (expenses && expenses.length) {
    expenseCount = expenses.reduce((total, expense) => {
      if (expense.isSpent) return total + expense.amount;
      return total;
    }, 0);
    incomeCount = expenses.reduce((total, expense) => {
      if (!expense.isSpent) return total + expense.amount;
      return total;
    }, 0);
    availableCount = incomeCount - expenseCount;
  }

  return (
    <div className="flex justify-between items-center">
      <div className=" bg-primary min-w-[200px] h-[75px] rounded-md flex justify-start items-center gap-2 p-2 shadow-md">
        <div className="p-3 border border-white rounded-md inline-flex">
          <Wallet />
        </div>
        <div className="flex flex-col">
          <p className="text-sm opacity-70">Available Balance</p>
          <p>{`$${availableCount / 100}`}</p>
        </div>
      </div>
      <div className=" bg-primary min-w-[200px] h-[75px] rounded-md flex justify-start items-center gap-2 p-2 shadow-md">
        <div className="p-3 border border-white rounded-md inline-flex">
          <HandCoins />
        </div>
        <div className="flex flex-col">
          <p className="text-sm opacity-70">Income</p>
          <p>{`$${incomeCount / 100}`}</p>
        </div>
      </div>
      <div className=" bg-primary min-w-[200px] h-[75px] rounded-md flex justify-start items-center gap-2 p-2 shadow-md">
        <div className="p-3 border border-white rounded-md inline-flex">
          <CreditCard />
        </div>
        <div className="flex flex-col">
          <p className="text-sm opacity-70">Expence</p>
          <p>{`$${expenseCount / 100}`}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardTopBar;
