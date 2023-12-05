"use server";

import { prisma } from "@/utils/prisma";
import { UploadFormSchema } from "./schema";

export const createUploadSession = async (data: UploadFormSchema) => {
  console.log(data);
  return await prisma.photoSet.create({
    data: {
      name: data.photographer,
    },
  });
};
