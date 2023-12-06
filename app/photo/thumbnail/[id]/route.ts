import { prisma } from "@/utils/prisma";
import { createS3Key, getPresignedImageUrl } from "@/utils/sports-db/file";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const image = await prisma.photo.findFirst({
    where: {
      id: id,
    },
  });
  if (!image) return NextResponse.json({ success: false }, { status: 404 });
  const key = createS3Key({
    fileName: image.name + ".webp",
    photoSetId: image.photoSetId,
  });
  const url = await getPresignedImageUrl(key);
  return NextResponse.redirect(url);
};
