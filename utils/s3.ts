import { env } from "@/env.mjs";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: env.AWS_S3_REGION,
  endpoint: env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
