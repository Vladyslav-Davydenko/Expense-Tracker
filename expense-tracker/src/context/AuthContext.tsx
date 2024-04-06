import { getCurrentUser } from "@/lib/appwrite/api";
import { IContexType, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticate: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContexType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticate] = useState<boolean>(false);

  // TODO: finish useEffect check Local Storage for session + call CheckAuthUser
  // const useEffect(() => {
  //   if(localStorage.)
  // }, [])

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
        });

        setIsAuthenticate(true);

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticate,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
