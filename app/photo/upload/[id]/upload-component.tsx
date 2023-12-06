"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useUploadQueue } from "./upload-queue";
import { useProcessUpload } from "./use-process-upload";

function UploadComponent({ fileId }: { fileId: string; id: string }) {
  const file = useUploadQueue((state) => state.get(fileId));
  if (!file) return null;
  return (
    <div
      className={`relative border gap-2 text-sm flex flex-col ${
        file.status === "error" ? "border-red-100 text-red-900" : ""
      }`}
    >
      <div
        className={`${
          file.status === "error" ? "bg-red-50" : "bg-slate-100"
        } w-full h-64 flex flex-col gap-3 items-center justify-center`}
      >
        {file.status === "uploading" && (
          <>
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-xs">
              Uploading...{" "}
              {file.progress !== -1 && `(${Math.floor(file.progress * 100)}%)`}
            </span>
          </>
        )}
        {file.status === "error" && (
          <>
            <AlertTriangle className="h-8 w-8" />
            <span className="text-xs">Error Uploading</span>
          </>
        )}
      </div>
      <span className="p-4 opacity-90 absolute top-0 text-muted-foreground">
        {file.id}
      </span>
    </div>
  );
}

export default function UploadList({ id }: { id: string }) {
  const files = useUploadQueue((state) => state.queue.map((file) => file.id));
  useProcessUpload(id);
  return (
    <>
      {files.map((fileId) => (
        <UploadComponent key={fileId} fileId={fileId} id={id} />
      ))}
    </>
  );
}
