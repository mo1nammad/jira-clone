import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";

import { createAdminClient, AppwriteErrorType } from "@/lib/appwrite";

import { loginSchema, signupSchema } from "../schema";
import { AUTH_SESSION_KEY } from "../constants";

export const loginAuth = new Hono().post(
  "/login",
  zValidator("json", loginSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    try {
      const session = await account.createEmailPasswordSession(email, password);
      setCookie(c, AUTH_SESSION_KEY, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        secure: true, // true or false as string,
      });

      return c.json({ message: "email verified", code: 200 });
    } catch (err) {
      const appwriteError = <AppwriteErrorType>err;
      console.log(appwriteError);

      return c.json(
        {
          message: appwriteError.response.message,
          code: appwriteError.code,
        },
        {
          status: 404,
        }
      );
    }
  }
);

export const signupAuth = new Hono().post(
  "/register",
  zValidator("json", signupSchema),
  async (c) => {
    const { email, password, name } = c.req.valid("json");

    const { account } = await createAdminClient();

    // sign up logic
    try {
      await account.create(ID.unique(), email, password, name);
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_SESSION_KEY, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        secure: true, // true or false as string,
      });

      return c.json({
        message: `user ${name} has been created`,
        code: 200,
      });
    } catch (err) {
      const appwriteError = <AppwriteErrorType>err;
      console.log(appwriteError);

      return c.json(
        {
          message: appwriteError.response.message,
          code: appwriteError.code,
        },
        {
          status: 404,
        }
      );
    }
  }
);
