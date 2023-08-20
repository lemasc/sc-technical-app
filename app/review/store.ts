import EXIF from "exif-js";
import { parse, ValiError } from "valibot";
import { create } from "zustand";
import { ExifMetadata, ExifMetadataType } from "./ExifMetadata";

type PhotoReview = {
  status: "approved" | "rejected" | "needs-editing";
  comment: string;
};

export type PhotoEntry = {
  file: FileSystemFileHandle;
  review: PhotoReview | null;
  objectUrl: string | null;
  metadata?: ExifMetadataType;
};
export type ReviewPhotoStoreType = {
  selectedFolder: FileSystemDirectoryHandle | null;
  photoEntries: Map<string, PhotoEntry>;
  selectedFile: string | null;
};

export const reviewPhotoStore = create<ReviewPhotoStoreType>((set, get) => ({
  selectedFolder: null,
  photoEntries: new Map(),
  selectedFile: null,
}));

export const setFolder = async (folder: FileSystemDirectoryHandle) => {
  reviewPhotoStore.setState({ selectedFolder: folder });
};

export const refreshFolder = async (folder?: FileSystemDirectoryHandle) => {
  if (!folder) {
    folder = reviewPhotoStore.getState().selectedFolder!;
  }
  const previousEntries = reviewPhotoStore.getState().photoEntries;
  const newEntries = new Map();
  for await (const entry of folder.values()) {
    if (entry.kind === "file" && entry.name.toLowerCase().endsWith(".jpg")) {
      const previousEntry = previousEntries.get(entry.name);
      if (previousEntry) {
        if (await previousEntry.file.isSameEntry(entry)) {
          continue;
        }
        if (previousEntry.objectUrl) {
          URL.revokeObjectURL(previousEntry.objectUrl);
        }
      }
      newEntries.set(entry.name, {
        file: entry,
        review: null,
        objectUrl: null,
      });
    }
  }
  reviewPhotoStore.setState({ photoEntries: newEntries });
};

export const createMetadata = async (entry: PhotoEntry) => {
  try {
    const blob = await entry.file.getFile();
    const rawMetadata = EXIF.readFromBinaryFile(await blob.arrayBuffer());
    console.log(rawMetadata);
    const metadata = parse(ExifMetadata, rawMetadata);
    return metadata;
  } catch (e) {
    if (e instanceof ValiError) {
      console.error(e.issues);
    }
    throw e;
  }
};

export const setPhotoEntry = async (entry: PhotoEntry) => {
  reviewPhotoStore.setState({
    photoEntries: new Map(reviewPhotoStore.getState().photoEntries).set(
      entry.file.name,
      entry
    ),
  });
};
