import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  fetchExpenses,
  createExpenses,
  updateExpenses,
  fetchTypes,
  createTypes,
  updateType,
  deleteExpenses,
  deleteType,
} from "../appwrite/api";
import { IExpenses, INewExpenses, INewType, INewUser, IType } from "@/types";

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
    mutationFn: (update: {
      id: string;
      data: Partial<INewExpenses> | Partial<IExpenses>;
    }) => updateExpenses(update),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      // Snapshot the previous value
      const previousExpenses = queryClient.getQueryData(["expenses"]);

      // Return a context object with the snapshotted value
      return { previousExpenses };
    },

    onError: (_err, _newExpenses, context) => {
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
  });
};

export const useCreateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExpense: INewExpenses) => createExpenses(newExpense),
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

// TYPES

export const useGetTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });
};

export const useCreateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newType: INewType) => createTypes(newType),
    onMutate: async (newType) => {
      await queryClient.cancelQueries({ queryKey: ["types"] });

      // Snapshot the previous value
      const previuosTypes = queryClient.getQueryData(["types"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["types"], (old: IType[]) => [...old, newType]);

      // Return a context object with the snapshotted value
      return { previuosTypes };
    },

    onError: (_err, _newExpenses, context) => {
      queryClient.setQueryData(["types"], context?.previuosTypes || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};

export const useUpdateType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (update: { id: string; data: Partial<IType> }) =>
      updateType(update),
    onMutate: async (updatedType) => {
      await queryClient.cancelQueries({ queryKey: ["types"] });
      const previousTypes = queryClient.getQueryData(["types"]) as IType[];
      queryClient.setQueryData(["types"], (old: IType[]) => {
        const withoutUpdated = old.filter(
          (type) => type.$id !== updatedType.id
        );
        return [...withoutUpdated, updatedType.data];
      });

      return { previousTypes };
    },
    onError: (_err, _updatedType, context) => {
      queryClient.setQueryData(["types"], context?.previousTypes || []);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteType(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["types"] });
      // Snapshot the previous value
      const previousTypes = queryClient.getQueryData(["types"]);
      // Optimistically update to the new value
      queryClient.setQueryData(["types"], (old: IExpenses[]) => [
        ...old.filter((e) => e.$id !== id),
      ]);
      return { previousTypes };
    },
    onError: (_err, _newExpenses, context) => {
      queryClient.setQueryData(["types"], context?.previousTypes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["types"] });
    },
  });
};
