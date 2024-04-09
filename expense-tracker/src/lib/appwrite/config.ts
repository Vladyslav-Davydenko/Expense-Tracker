import { Client, Account, Databases, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: process.env.VITE_APPWRITE_PROJECT_ID || "",
  url: process.env.VITE_APPWRITE_URL || "",
  databaseId: process.env.VITE_APPWRITE_DATABASE_ID || "",
  userCollectionId: process.env.VITE_APPWRITE_USERS_ID || "",
  expenseCollectionId: process.env.VITE_APPWRITE_EXPENSES_ID || "",
  typeCollectionId: process.env.VITE_APPWRITE_TYPES_ID || "",
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
