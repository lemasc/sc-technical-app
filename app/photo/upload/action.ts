"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { UploadFormSchema } from "./schema";

export const createUploadSession = async (data: UploadFormSchema) => {
  const result = await prisma.photoSet.create({
    data: {
      category: data.event,
      name: data.photographer,
      takenAt: data.date,
    },
  });
  revalidatePath("/photo");
  return result;
};
