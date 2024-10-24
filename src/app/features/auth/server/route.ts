import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { loginSchema } from "../schema";

const app = new Hono().post("/login", zValidator("json", loginSchema), (c) => {
  const { email, password } = c.req.valid("json");
  return c.json({ email, password });
});

export default app;
