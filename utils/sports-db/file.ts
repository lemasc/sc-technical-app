import { env } from "@/env.mjs";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../s3";

type PhotoObjectKey = {
  photoSetId: string;
  fileName: string;
};
export const createS3Key = ({ photoSetId, fileName }: PhotoObjectKey) => {
  return `/arun-games/${photoSetId}/${fileName}`;
};

export const createUrl = (key: string) => {
  return `${env.AWS_S3_ENDPOINT}/${key}`;
};

export const uploadImage = async (
  Key: string | PhotoObjectKey,
  Body: Uint8Array
) => {
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: typeof Key === "string" ? Key : createS3Key(Key),
    Body,
  });
  await s3.send(command);
};

export const getPresignedImageUrl = async (Key: string | PhotoObjectKey) => {
  const _Key = typeof Key === "string" ? Key : createS3Key(Key);
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: _Key,
    ResponseContentDisposition: "inline",
    ResponseContentType: _Key.endsWith(".webp") ? "image/webp" : "image/jpeg",
  });
  return await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 * 7 });
};
