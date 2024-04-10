import { Models } from "appwrite";
import React from "react";

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};
export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export type IType = {
  name: string;
  color: string;
};

export interface INewExpenses {
  type: IType;
  amount: number;
  description: string;
  isSpent: boolean;
}

export interface IExpenses extends Models.Document {
  owner: IUser;
  type: IType;
  date: string;
  amount: number;
  description: string;
  isSpent: boolean;
}

export interface IContexType {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}
