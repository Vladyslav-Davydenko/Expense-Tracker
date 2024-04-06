import React from "react";

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

export interface IContexType {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}
