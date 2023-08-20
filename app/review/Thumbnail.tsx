import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { createMetadata, reviewPhotoStore, setPhotoEntry } from "./store";

const Thumbnail = ({ file }: { file: string }) => {
  const [url, setUrl] = useState<string | null>(null);
  const fileHandle = useMemo(
    () => reviewPhotoStore.getState().photoEntries.get(file),
    [file]
  );

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

  return (
    <div className="rounded-lg flex flex-col justify-center bg-white">
      {url && (
        <div>
          <Image
            className="transform aspect-[3/2] object-scale-down rounded-lg brightness-90 transition will-change-auto group-hover:brightness-100 group-hover:contrast-120"
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
