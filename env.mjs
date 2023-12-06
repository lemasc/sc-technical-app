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
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_S3_REGION: z.string().min(1),
    AWS_S3_ENDPOINT: z.string().min(1),
    AWS_S3_BUCKET: z.string().min(1),
  },
  runtimeEnv: {
    GDRIVE_API_KEY: process.env.GDRIVE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CODA_API_KEY: process.env.CODA_API_KEY,
    CODA_DOC_ID: process.env.CODA_DOC_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  },
});
