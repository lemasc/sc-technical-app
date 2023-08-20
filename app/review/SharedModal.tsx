import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
  closeModal,
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
      className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
      {...handlers}
    >
      {/* Main image */}
      <div className="w-full overflow-hidden">
        <div className="relative flex aspect-[3/2] items-center justify-center">
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
          <div className={`relative aspect-[3/2] max-h-full w-full`}>
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

            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
              <button
                onClick={() => closeModal()}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
