import useKeypress from "@/utils/useKeyPress";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImageMetadata } from "./components/ImageMetadata";
import { ImageReview } from "./components/ImageReview";
import SharedModal from "./SharedModal";
import { createMetadata, reviewPhotoStore, setPhotoEntry } from "./store";

export default function ImageDialog({ images }: { images: string[] }) {
  const selectedFile = reviewPhotoStore((state) => state.selectedFile);
  let overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const params = useSearchParams();
  const index = useMemo(
    () => images.findIndex((image) => image === selectedFile),
    [images, selectedFile]
  );

  function handleClose() {
    reviewPhotoStore.setState({ selectedFile: null });
  }

  function changePhotoId(newVal: number) {
    reviewPhotoStore.setState({ selectedFile: images[newVal] });
  }

  useKeypress("ArrowRight", () => {
    if (images && index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (images && index > 0) {
      changePhotoId(index - 1);
    }
  });
  const currentPhoto = reviewPhotoStore((state) =>
    selectedFile ? state.photoEntries.get(selectedFile) : undefined
  );

  useEffect(() => {
    if (currentPhoto && !currentPhoto.metadata) {
      createMetadata(currentPhoto).then((metadata) => {
        setPhotoEntry({ ...currentPhoto, metadata });
      });
    }
  }, [currentPhoto]);

  if (!selectedFile) return null;

  return (
    <Dialog
      static
      open={true}
      onClose={() => {}}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <div className="relative z-50 w-full flex items-center flex-row">
        <div className="flex-grow flex-shrink basis-3/4 p-10">
          <SharedModal
            index={index}
            images={images}
            changePhotoId={changePhotoId}
            closeModal={handleClose}
            currentPhoto={currentPhoto}
          />
        </div>
        {currentPhoto && (
          <div className="flex-shrink-0 flex flex-col w-full max-w-sm p-8 gap-2 h-screen bg-white bg-opacity-10 rounded-l-xl">
            <span className="text-gray-400">
              Image {index + 1} of {images.length}
            </span>
            <h2 className="font-bold text-3xl">{currentPhoto.file.name}</h2>
            <ImageReview image={currentPhoto} />
            {currentPhoto.metadata && (
              <ImageMetadata metadata={currentPhoto.metadata} />
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}
