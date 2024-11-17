"use server";

import { Databases, Client, Query, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_SESSION_KEY } from "@/app/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get(AUTH_SESSION_KEY);
    if (!session) return null;

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);

    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (!members || members.total === 0)
      return {
        workspaces: {
          total: 0,
          documents: [],
        },
      };

    const workspacesIds: string[] = members.documents.map(
      (member) => member.workspaceId
    );

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspacesIds)]
    );

    return { workspaces };
  } catch {
    return null;
  }
};
