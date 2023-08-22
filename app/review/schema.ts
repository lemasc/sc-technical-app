import {
  enumType,
  nullable,
  object,
  optional,
  string,
  Output,
  pick,
  special,
} from "valibot";
import { ExifMetadata } from "./ExifMetadata";

export type PhotoReview = {
  status: "approved" | "rejected" | "needs-editing";
  reason?: string;
};

const photoReview = object({
  status: enumType(["approved", "rejected", "needs-editing"]),
  reason: optional(string()),
});

export type PhotoEntry = Output<typeof photoEntry>;

export const photoEntry = object({
  file: special<FileSystemFileHandle>((v) => v as any),
  review: nullable(photoReview),
  objectUrl: nullable(string()),
  metadata: optional(ExifMetadata),
});

export type DevelopSettings = Output<typeof developSettings>;

export const developSettings = pick(photoEntry, ["review", "metadata"]);
