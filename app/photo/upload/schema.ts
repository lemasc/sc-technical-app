import * as z from "zod";

export const uploadformSchema = z.object({
  photographer: z.string(),
  date: z.date(),
});

export type UploadFormSchema = z.infer<typeof uploadformSchema>;
