import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { PhotoEntry } from "./store";

export interface SharedModalProps {
  index: number;
  images?: string[];
  currentPhoto?: PhotoEntry;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
}

export default function SharedModal({
  index,
  images,
  changePhotoId,
  currentPhoto,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (images && index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (images && index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <div
      className="relative flex w-full items-center wide:h-full xl:taller-than-854:h-auto"
      {...handlers}
    >
      {/* Main image */}
      <div className="w-full overflow-hidden">
        <div className="relative flex items-center justify-center h-screen">
          <div className={`absolute`}>
            {currentPhoto?.objectUrl && (
              <Image
                src={currentPhoto.objectUrl}
                width={1280}
                height={853}
                priority
                alt="Photo"
                onLoadingComplete={() => setLoaded(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Buttons + bottom nav bar */}
      <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
        {/* Buttons */}
        {loaded && (
          <div className={`relative max-h-full w-full`}>
            {index > 0 && (
              <button
                className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={() => changePhotoId(index - 1)}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
            {images && index + 1 < images.length && (
              <button
                className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={() => changePhotoId(index + 1)}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
