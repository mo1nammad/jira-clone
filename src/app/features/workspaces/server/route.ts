import { Hono } from "hono";
import { validator } from "hono/validator";
import { ID } from "node-appwrite";

import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";

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
    const { databases } = c.var;

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
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
      }
    );

    return c.json({
      workspace,
    });
  });

export default app;
