// src/lib/server/appwrite.js
"use server";
import { Client, Account, Storage, Users, Databases, ID } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export type AppwriteErrorType = {
  name: string;
  code: number;
  type: string;
  response: {
    message: string;
    code: number;
    type: string;
    version: string;
  };
};
