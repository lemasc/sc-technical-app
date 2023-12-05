"use client";

import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useUploadQueue } from "./upload-queue";

const acceptType: Record<string, string[]> = {
  "image/jpg": [".jpg", ".jpeg"],
  "image/x-canon-crw": [".crw"],
  "image/x-canon-cr2": [".cr2"],
  "image/x-canon-cr3": [".cr3"],
  "image/x-nikon-nef": [".nef"],
  "image/x-sony-arw": [".arw"],
  "image/x-fuji-raf": [".raf"],
  "image/webp": [".webp"],
};

export const UploadButton = ({ id }: { id: string }) => {
  const selectFilesAndUpload = async () => {
    try {
      const files = await window
        .showOpenFilePicker({
          multiple: true,
          types: [{ description: "Images", accept: acceptType }],
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
