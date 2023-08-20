"use client";

import React from "react";
import Image from "next/image";
import ImageDialog from "./ImageDialog";
import { refreshFolder, reviewPhotoStore, setFolder } from "./store";
import Thumbnail from "./Thumbnail";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SC Photo Review",
};

const ListPage = () => {
  const selectedFolder = reviewPhotoStore((state) => state.selectedFolder);
  const photoEntryKeys = reviewPhotoStore((state) =>
    Array.from(state.photoEntries.keys())
  );

  const handleSelectFolder = async () => {
    try {
      const fileHandle = await window.showDirectoryPicker();
      await setFolder(fileHandle);
      await refreshFolder(fileHandle);
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  };

  return (
    <div>
      <ImageDialog images={photoEntryKeys} />
      <nav className="p-4 border-b border-gray-600 flex flex-row gap-4 items-center">
        <Image src="/logo_sc.png" width={56} height={56} alt="Logo" />
        <h1 className="font-bold text-lg">Photo Review</h1>
        <div className="flex-grow flex flex-row justify-end items-center gap-4">
          {selectedFolder && (
            <span>
              <b>Folder:</b> {selectedFolder?.name}
            </span>
          )}
          <button
            className="rounded text-sm bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 font-medium"
            onClick={handleSelectFolder}
          >
            <CloudArrowUpIcon className="h-6 w-6 inline-block mr-1" />
            Select Folder
          </button>
        </div>
      </nav>
      <main className="flex flex-row gap-2 flex-wrap p-4">
        {photoEntryKeys.map((file) => (
          <button
            key={file}
            onClick={() => {
              reviewPhotoStore.setState({ selectedFile: file });
            }}
            className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Thumbnail file={file} />
          </button>
        ))}
      </main>
    </div>
  );
};

export default ListPage;
