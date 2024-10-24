import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "required").max(256, "Maximum 256 character"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "required").max(32),
  email: z.string().email().max(256),
  password: z.string().min(8).max(256, "Maximum 256 character"),
});
