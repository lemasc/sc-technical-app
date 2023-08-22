import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { createMetadata, reviewPhotoStore, setPhotoEntry } from "./store";
import {
  ArchiveBoxXMarkIcon,
  CheckBadgeIcon,
  PencilIcon,
  PencilSquareIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getIcon, getIconColor } from "./icons";

const Thumbnail = ({ file }: { file: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const fileHandle = reviewPhotoStore((state) => state.photoEntries.get(file));

  useEffect(() => {
    if (!fileHandle) return;
    if (fileHandle.objectUrl) {
      setUrl(fileHandle.objectUrl);
    } else {
      (async () => {
        const entry = fileHandle;
        const blob = await fileHandle.file.getFile();
        entry.objectUrl = URL.createObjectURL(blob);
        setUrl(entry.objectUrl);
        setPhotoEntry(entry);
      })();
    }
  }, [fileHandle]);

  const reviewStatus = fileHandle?.review?.status;

  const Icon = useMemo(() => {
    return getIcon(reviewStatus) ?? (() => null);
  }, [reviewStatus]);

  return (
    <div className="relative rounded-lg flex flex-col justify-center bg-white">
      {reviewStatus && (
        <div className="z-[1] absolute top-0 left-0 p-2">
          <Icon
            className={`h-8 w-8 drop-shadow-lg ${getIconColor(reviewStatus)}`}
          />
        </div>
      )}
      {url && (
        <div>
          <Image
            className={`transform aspect-[3/2] object-scale-down rounded-lg brightness-100 transition will-change-auto`}
            src={url}
            alt="Thumbnail"
            width={720}
            height={480}
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
