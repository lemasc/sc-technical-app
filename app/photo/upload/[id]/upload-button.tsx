"use client";

import { Plus } from "lucide-react";
import { useEffect } from "react";
import { acceptType } from "./accept-type";
import { useUploadQueue } from "./upload-queue";

export const UploadButton = () => {
  const selectFilesAndUpload = async () => {
    try {
      const files = await window
        .showOpenFilePicker({
          multiple: true,
          types: [{ description: "Images", accept: acceptType as any }],
        })
        .catch(() => [] as FileSystemFileHandle[]);
      useUploadQueue.getState().add(files);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    return () => {
      useUploadQueue.setState({ queue: [] });
    };
  }, []);
  return (
    <button
      onClick={selectFilesAndUpload}
      className="border-2 gap-2 text-sm bg-slate-50 hover:bg-slate-100 border-dashed p-4 flex items-center justify-center flex-col"
    >
      <Plus className="w-8 h-8" />
      <span>Upload</span>
    </button>
  );
};
