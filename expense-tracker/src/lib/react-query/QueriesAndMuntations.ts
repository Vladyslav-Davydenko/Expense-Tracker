import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  fetchExpenses,
  fetchLatestExpenses,
} from "../appwrite/api";
import { INewUser } from "@/types";

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
