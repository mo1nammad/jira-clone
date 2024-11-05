"use server";

import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_SESSION_KEY } from "./constants";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_SESSION_KEY);
    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);

    const user = await account.get();
    return user;
  } catch {
    return null;
  }
};
