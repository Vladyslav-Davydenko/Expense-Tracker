import { ID, Query } from "appwrite";

import { IExpenses, INewExpenses, INewUser, IType } from "@/types";
import { account, appwriteConfig, databases } from "./config";

// USER
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

// EXPENSES

export async function fetchExpenses() {
  const currentUser = await getCurrentUser();

  if (!currentUser) throw Error;

  const expenses = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.expenseCollectionId,
    [Query.equal("owner", currentUser.$id), Query.orderDesc("date")]
  );

  if (expenses.documents.length <= 0) {
    return [];
  }

  return expenses.documents as IExpenses[];
}

export async function updateExpenses(newExpense: INewExpenses | IExpenses) {
  const currentUser = await getCurrentUser();

  if (!currentUser) throw Error;

  const expense = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.expenseCollectionId,
    newExpense.$id,
    {
      owner: currentUser.$id,
      type: newExpense.type,
      date: newExpense.date,
      amount: newExpense.amount,
      description: newExpense.description,
      isSpent: newExpense.isSpent,
    }
  );

  if (!expense) throw Error;

  return expense as IExpenses;
}

export async function deleteExpenses(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) throw Error;

  const result = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.expenseCollectionId,
    id
  );

  if (!result) throw Error;

  return id;
}

// TYPES

export async function fetchTypes() {
  const currentUser = await getCurrentUser();

  if (!currentUser) throw Error;

  const expenses = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.typeCollectionId,
    [Query.equal("owner", currentUser.$id)]
  );

  if (expenses.documents.length <= 0) {
    return [];
  }

  return expenses.documents as IType[];
}
