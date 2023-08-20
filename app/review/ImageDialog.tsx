import useKeypress from "@/utils/useKeyPress";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import SharedModal from "./SharedModal";
import { reviewPhotoStore } from "./store";

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
      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        currentPhoto={currentPhoto}
      />
    </Dialog>
  );
}
