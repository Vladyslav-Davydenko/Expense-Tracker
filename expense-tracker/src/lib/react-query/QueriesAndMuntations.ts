import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  fetchExpenses,
  fetchLatestExpenses,
  updateExpenses,
} from "../appwrite/api";
import { IExpenses, INewUser } from "@/types";

// EXPENSES

export const useGetLatestExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchLatestExpenses,
  });
};

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
};

export const useUpdateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExpense: IExpenses) => updateExpenses(newExpense),
    onMutate: async (_newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // Return a context object with the snapshotted value
      return { previousExpenses };
    },

    onError: (_err, _newTodo, context) => {
      console.log(context?.previousExpenses);
      queryClient.setQueryData(["expenses"], context?.previousExpenses);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

// AUTH

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
