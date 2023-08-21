"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import ImageDialog from "./ImageDialog";
import { refreshFolder, reviewPhotoStore, setFolder } from "./store";
import Thumbnail from "./Thumbnail";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

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

  useEffect(() =>
    reviewPhotoStore.subscribe((state) => {
      if (state.selectedFolder && state.photoEntries) {
        const key = `edit-${state.selectedFolder.name}`;
        const existingChanges = JSON.parse(localStorage.getItem(key) ?? "{}");
        const entries = Array.from(state.photoEntries.entries());
        const changes = {
          ...existingChanges,
          [state.changesDate.toLocaleString()]: Object.fromEntries(
            entries.map(([k, { review, metadata }]) => [
              k,
              { review, metadata },
            ])
          ),
        };
        console.log("✏️ Changes", changes);
        localStorage.setItem(key, JSON.stringify(changes));
      }
    })
  );

  return (
    <div>
      <ImageDialog images={photoEntryKeys} />
      <nav className="p-4 border-b border-gray-600 flex flex-row gap-4 items-center">
        <Image priority src="/logo_sc.png" width={56} height={56} alt="Logo" />
        <h1 className="font-bold text-lg">Photo Review</h1>
        <div className="flex flex-row justify-center flex-grow gap-2"></div>
        <div className="flex flex-row justify-end items-center gap-4">
          {selectedFolder && (
            <span className="font-thai flex flex-col text-right">
              <span>
                <b>Folder:</b> {selectedFolder?.name}
              </span>
              <span className="text-sm py-0.5 text-gray-300">
                {photoEntryKeys.length} images
              </span>
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
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-wrap p-4">
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
