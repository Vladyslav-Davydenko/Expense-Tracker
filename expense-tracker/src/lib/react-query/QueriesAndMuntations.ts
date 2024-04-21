import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  fetchExpenses,
  updateExpenses,
  fetchTypes,
  deleteExpenses,
} from "../appwrite/api";
import { IExpenses, INewExpenses, INewUser } from "@/types";

// EXPENSES

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
};

export const useUpdateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExpense: INewExpenses | IExpenses) =>
      updateExpenses(newExpense),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // Return a context object with the snapshotted value
      return { previousExpenses };
    },

    onError: (_err, _newExpenses, context) => {
      console.log(context?.previousExpenses);
      queryClient.setQueryData(["expenses"], context?.previousExpenses);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExpenses(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });
      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(["expenses"]);
      // Optimistically update to the new value
      queryClient.setQueryData(["expenses"], (old: IExpenses[]) => [
        ...old.filter((e) => e.$id !== id),
      ]);
      // Return a context object with the snapshotted value
      return { previousExpenses };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newExpenses, context) => {
      queryClient.setQueryData(["expenses"], context?.previousExpenses);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["expenses"] });
    // },
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

// TYPES

export const useGetTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });
};
