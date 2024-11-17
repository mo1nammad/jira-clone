import { Hono } from "hono";
import { validator } from "hono/validator";
import { ID, Query } from "node-appwrite";

import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { MemberRoles } from "../../members/types";
import { generateInviteCode } from "@/lib/utils";

const validateCreateWorkspace = validator("form", (value, c) => {
  // this one does not work with zvalidtor /:
  // image is not instance of File but Blob
  if (value.image instanceof Blob) {
    const blob: Blob = value.image;
    const file = new File([blob], value.image.name);

    const values = {
      ...value,
      image: file,
    };
    const parsed = createWorkspaceSchema.safeParse(values);
    if (!parsed.success) {
      return c.text("Invalid!", 401);
    }
    return parsed.data;
  } else if (
    typeof value.image === "string" ||
    typeof value.image === "undefined"
  ) {
    const parsed = createWorkspaceSchema.safeParse(value);
    if (!parsed.success) {
      return c.text("Invalid!", 401);
    }
    return parsed.data;
  }

  return c.text("Invalid!", 401);
});

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const { databases, user } = c.var;

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (!members || members.total === 0)
      return c.json({
        workspaces: {
          total: 0,
          documents: [],
        },
      });

    const workspacesIds: string[] = members.documents.map(
      (member) => member.workspaceId
    );

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspacesIds)]
    );

    return c.json({ workspaces });
  })
  .post("/", validateCreateWorkspace, sessionMiddleware, async (c) => {
    const { name, image } = c.req.valid("form");
    const { $id: userId } = c.var.user;
    const storage = c.var.storage;
    const databases = c.var.databases;

    let uploadedImageUrl: string | undefined;

    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image
      );

      const fileArrayBuffer = await storage.getFilePreview(
        IMAGES_BUCKET_ID,
        file.$id
      );

      uploadedImageUrl = `data:image/png;base64,${Buffer.from(
        fileArrayBuffer
      ).toString("base64")}`;
    }

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
        userId,
        imageUrl: uploadedImageUrl,
        inviteCode: generateInviteCode(25),
      }
    );

    await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
      userId,
      workspaceId: workspace.$id,
      role: MemberRoles.ADMIN,
    });

    return c.json({
      workspace,
    });
  });

export default app;
