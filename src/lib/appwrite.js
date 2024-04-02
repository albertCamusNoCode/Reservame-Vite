import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65b5f90a82a9ac01a79f");

export const account = new Account(client);
export { ID } from "appwrite";
export const databases = new Databases(client);
