"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import ImageDialog from "./ImageDialog";
import { refreshFolder, reviewPhotoStore, setFolder } from "./store";
import Thumbnail from "./Thumbnail";

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
      <h1>Photo Gallery</h1>
      <span>Folder: {selectedFolder?.name}</span>
      <button onClick={handleSelectFolder}>Select Folder</button>
      <div className="flex flex-row gap-2 flex-wrap">
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
      </div>
    </div>
  );
};

export default ListPage;
