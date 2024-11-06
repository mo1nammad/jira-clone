import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/",
  zValidator("json", createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const { name } = c.req.valid("json");

    const databases = c.var.databases;

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
      }
    );

    return c.json({
      workspace,
    });
  }
);

export default app;