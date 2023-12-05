import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GDRIVE_API_KEY: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    CODA_API_KEY: z.string().min(1),
    CODA_DOC_ID: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
  },
  runtimeEnv: {
    GDRIVE_API_KEY: process.env.GDRIVE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CODA_API_KEY: process.env.CODA_API_KEY,
    CODA_DOC_ID: process.env.CODA_DOC_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
