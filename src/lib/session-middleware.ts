"use server";

import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import {
  Account,
  Models,
  Databases,
  Client,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
} from "node-appwrite";

import { AUTH_SESSION_KEY } from "@/app/features/auth/constants";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_SESSION_KEY);

    if (!session)
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );

    client.setSession(session);

    const account = new Account(client);
    const storage = new Storage(client);
    const databases = new Databases(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);
