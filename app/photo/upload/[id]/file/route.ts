import { prisma } from "@/utils/prisma";
import { createS3Key, uploadImage } from "@/utils/sports-db/file";
import exifr from "exifr";
import { NextRequest, NextResponse } from "next/server";
import { ExifData } from "../exif";

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    console.log(file);
    if (file.type !== "image/jpeg") throw new Error("Invalid file type");
    const fileData = new Uint8Array(await file.arrayBuffer());
    const pick: Array<keyof ExifData> = ["DateTimeOriginal", "Model"];
    const exifData: ExifData = await exifr.parse(fileData, {
      pick,
    });
    console.log(exifData);
    const key = createS3Key({ fileName: file.name, photoSetId: id });
    await uploadImage(key, fileData);
    await prisma.photoSet.update({
      where: {
        id: id,
      },
      data: {
        photos: {
          create: {
            dateTaken: exifData.DateTimeOriginal,
            model: exifData.Model,
            name: file.name,
            url: key,
          },
        },
      },
    });
    // const url = await getPresignedImageUrl(key);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: true }, { status: 500 });
  }
};
