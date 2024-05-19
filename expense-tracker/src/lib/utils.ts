import { IExpenses, IType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { months } from "@/constants";

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

type TypeValues = Record<string, number>;

type MonthValues = Record<string, number>;

// Filter Expenses based on month
export const filterExpenses = (
  expenses: IExpenses[],
  year: number,
  isSpent = true
) => {
  const preparedData: MonthValues = months.reduce((total, month) => {
    total[month] = 0;
    return total;
  }, {} as MonthValues);

  expenses.map((expense) => {
    const expenseDate = new Date(expense.date);

    // Data will shown of this year only
    if (expenseDate.getFullYear() !== year || expense.isSpent !== isSpent)
      return;

    const expenseMonth = expenseDate.getMonth();
    preparedData[months[expenseMonth]] += expense.amount;
  });

  const filteredMonthValues = removeTrailingZeros(preparedData, months);

  return filteredMonthValues;
};

// Function to remove trailing zeros
function removeTrailingZeros(
  values: MonthValues,
  months: string[]
): MonthValues {
  // Find the index of the last non-zero value
  let lastNonZeroIndex = -1;
  for (let i = months.length - 1; i >= 0; i--) {
    if (values[months[i]] !== 0) {
      lastNonZeroIndex = i;
      break;
    }
  }

  // Create a new object excluding months with zeros after the last non-zero value
  const result: MonthValues = {};
  for (let i = 0; i <= lastNonZeroIndex; i++) {
    result[months[i]] = values[months[i]];
  }

  return result;
}

// interface filterTypesProps {
//   expenses: IExpenses[];
//   type: IType;
//   year: number;
//   isSpent?: boolean;
// }

export const filterTypes = (
  expenses: IExpenses[],
  type: IType,
  year: number,
  isSpent = true
) => {
  const preparedData: Record<string, number> = {};

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
