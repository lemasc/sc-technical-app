import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { createObjectUrl, reviewPhotoStore, revokeObjectUrl } from "./store";

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
      createObjectUrl(fileHandle).then((url) => setUrl(url));
    }
  }, [fileHandle]);

  return (
    <div className="w-[360px] h-[240px] rounded-lg flex flex-col justify-center bg-white">
      {url && (
        <div>
          <Image
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-100 group-hover:contrast-120"
            src={url}
            alt="Thumbnail"
            width={360}
            height={240}
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
