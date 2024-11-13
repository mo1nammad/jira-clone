import { z } from "zod";
export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z
    .instanceof(File)
    .or(z.string().transform((value) => (value === "" ? undefined : value)))
    .optional(),
});
