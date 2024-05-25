import { IExpenses, IType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { months } from "@/constants";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

type ITypesSubData = Record<string, number>;

type IPreparedData = Record<string, ITypesSubData>;

interface IFilterExpense {
  expenses: IExpenses[];
  year: number;
  isSpent?: boolean;
}

// Filter Expenses based on month
export const filterExpenses = ({
  expenses,
  year,
  isSpent = true,
}: IFilterExpense) => {
  const preparedData: IPreparedData = months.reduce((total, month) => {
    if (months.indexOf(month) <= currentMonth) total[month] = {};
    return total;
  }, {} as IPreparedData);

  expenses.map((expense) => {
    const expenseDate = new Date(expense.date);

    // Data will shown of this year only
    if (
      expenseDate.getFullYear() !== year ||
      expense.isSpent !== isSpent ||
      !expense?.type?.name
    )
      return;

    const expenseMonth = expenseDate.getMonth();
    if (!preparedData[months[expenseMonth]][expense.type.name])
      preparedData[months[expenseMonth]] = {
        ...preparedData[months[expenseMonth]],
        [expense.type.name]: 0,
      };
    preparedData[months[expenseMonth]][expense.type.name] += expense.amount;
  });

  return preparedData;
};

interface IFilterExpensesOtherFormat {
  expenses: IExpenses[];
  types: IType[];
  year: number;
  isSpent?: boolean;
}

export const filterExpensesOtherFormat = ({
  expenses,
  types,
  year,
  isSpent = true,
}: IFilterExpensesOtherFormat) => {
  const preparedData: IPreparedData = types.reduce((total, type) => {
    total[type.name] = months.reduce((total, month) => {
      if (months.indexOf(month) <= currentMonth) total[month] = 0;
      return total;
    }, {} as ITypesSubData);
    return total;
  }, {} as IPreparedData);

  expenses.map((expense) => {
    const expenseDate = new Date(expense.date);

    // Data will shown of this year only
    if (
      expenseDate.getFullYear() !== year ||
      expense.isSpent !== isSpent ||
      !expense?.type?.name
    )
      return;
    const expenseType = expense.type.name;
    const expenseMonth = expenseDate.getMonth();
    if (!preparedData[expenseType][months[expenseMonth]])
      preparedData[expenseType] = {
        ...preparedData[expenseType],
        [months[expenseMonth]]: 0,
      };
    preparedData[expenseType][months[expenseMonth]] += expense.amount;
  });

  return preparedData;
};

interface filterTypesProps {
  expenses: IExpenses[];
  type: IType;
  year: number;
  isSpent?: boolean;
}

export const filterTypes = ({
  expenses,
  type,
  year,
  isSpent = true,
}: filterTypesProps) => {
  const currentMonth = new Date().getMonth();
  const preparedData: ITypesSubData = months.reduce((total, month) => {
    if (months.indexOf(month) <= currentMonth) total[month] = 0;
    return total;
  }, {} as ITypesSubData);

  expenses.map((expense) => {
    const expenseDate = new Date(expense.date);

    if (!expense?.type) return;

    // Data will shown of this year only and certain type
    if (
      expenseDate.getFullYear() !== year ||
      expense.isSpent !== isSpent ||
      type.$id !== expense.type.$id
    )
      return;

    const expenseMonth = expenseDate.getMonth();
    if (!preparedData[months[expenseMonth]])
      preparedData[months[expenseMonth]] = 0;
    preparedData[months[expenseMonth]] += expense.amount;
  });
  return preparedData;
};

interface ICalculateLargest {
  expenses: IExpenses[];
  isSpent?: boolean;
  month: number;
}

export const calculateLargest = ({
  expenses,
  isSpent = true,
  month,
}: ICalculateLargest) => {
  const maxValue = -Infinity;

  const amountInCoins = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (expense.isSpent !== isSpent) return;
      if (expenseDate.getFullYear() !== currentYear) return;
      if (expenseDate.getMonth() !== month) return;

      return expense;
    })
    .reduce((total, expense) => {
      if (expense.amount > maxValue) return total + expense.amount;
      return total;
    }, 0);

  return amountInCoins / 100;
};
