"use client";
import { Button } from "@/components/ui/button";
import { useUploadQueue } from "./upload-queue";

export const RightHeader = () => {
  const donePhotos = useUploadQueue(
    (state) => state.queue.filter((item) => item.status === "done").length
  );
  const errorPhotos = useUploadQueue(
    (state) => state.queue.filter((item) => item.status === "error").length
  );
  const pendingOrUploadingPhotos = useUploadQueue(
    (state) =>
      state.queue.filter(
        (item) => item.status === "pending" || item.status === "uploading"
      ).length
  );
  const allPhotos = useUploadQueue((state) => state.queue.length);
  return (
    <div className="gap-4 flex flex-col items-end">
      <div className="flex flex-row text-sm divide-x divide-slate-500">
        <span className="px-4">{donePhotos} done</span>
        <span className="px-4">{errorPhotos} error</span>
        <span className="pl-4">{pendingOrUploadingPhotos} pending</span>
      </div>
      <Button disabled={allPhotos === 0} className="font-semibold">
        Submit {allPhotos} photo{allPhotos > 1 ? "s" : ""}
      </Button>
    </div>
  );
};
