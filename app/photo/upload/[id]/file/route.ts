import { prisma } from "@/utils/prisma";
import { createS3Key, uploadImage } from "@/utils/sports-db/file";
import exifr from "exifr";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";
import { ExifData } from "../exif";

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    if (file.type !== "image/jpeg") throw new Error("Invalid file type");
    const fileData = new Uint8Array(await file.arrayBuffer());
    const pick: Array<keyof ExifData> = ["DateTimeOriginal", "Model"];
    const exifData: ExifData = await exifr.parse(fileData, {
      exif: true,
    });
    const fileNameWithoutExt = path.basename(
      new Date().valueOf() + "_" + file.name,
      path.extname(file.name)
    );
    const key = createS3Key({ fileName: fileNameWithoutExt, photoSetId: id });
    const resizedImage = await sharp(fileData)
      .resize(1920, 1280, {
        fit: "inside",
      })
      .rotate()
      .webp({ preset: "photo" })
      .withMetadata()
      .toBuffer();
    await Promise.all([
      uploadImage(key + ".jpg", fileData),
      uploadImage(key + ".webp", resizedImage),
    ]);
    const data = await prisma.photo.create({
      data: {
        dateTaken: exifData.DateTimeOriginal ?? new Date(0),
        model: exifData.Model,
        name: fileNameWithoutExt,
        url: key,
        photoSet: {
          connect: {
            id: id,
          },
        },
      },
    });
    // const url = await getPresignedImageUrl(key);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: true }, { status: 500 });
  }
};
