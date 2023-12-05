import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { prisma } from "@/utils/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UploadButton } from "./upload-button";
import UploadList from "./upload-component";

export const metadata: Metadata = {
  title: "Upload Session",
};

export default async function UploadSessionPage({
  params,
}: {
  params: { id: string };
}) {
  const photo = await prisma.photoSet.findFirst({
    include: {
      photos: true,
    },
  });
  if (!photo) {
    return redirect(env.NEXTAUTH_URL + "/photo");
  }
  return (
    <div className="divide-y space-y-4">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col flex-grow gap-3">
          <h1>{photo.name} : Upload Session</h1>
          <div className="flex flex-col gap-1 text-sm">
            <span>Created at: {photo.createdAt.toISOString()}</span>
            <span>Updated at: {photo.updatedAt.toISOString()}</span>
          </div>
        </div>
        <div className="gap-4 flex flex-col">
          <b className="text-2xl font-semibold">
            {photo.photos.length ?? "0"} images
          </b>
          <Button className="font-semibold">Submit</Button>
        </div>
      </div>
      <div className="py-4 grid grid-cols-4 gap-4">
        <UploadButton id={params.id} />
        <UploadList id={params.id} />
      </div>
    </div>
  );
}
