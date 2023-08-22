import EXIF from "exif-js";
import { parse, ValiError } from "valibot";
import { create } from "zustand";
import { ExifMetadata } from "./ExifMetadata";
import { PhotoEntry } from "./schema";

export type ReviewPhotoStoreType = {
  selectedFolder: FileSystemDirectoryHandle | null;
  photoEntries: Map<string, PhotoEntry>;
  selectedFile: string | null;
  changesDate: Date;
};

export const reviewPhotoStore = create<ReviewPhotoStoreType>((set, get) => ({
  selectedFolder: null,
  photoEntries: new Map(),
  selectedFile: null,
  changesDate: new Date(),
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
    const name = entry.name.toLowerCase();
    if (
      entry.kind === "file" &&
      name.endsWith(".jpg") &&
      !name.startsWith("._")
    ) {
      const previousEntry = previousEntries.get(entry.name);
      if (previousEntry) {
        if (await previousEntry.file.isSameEntry(entry)) {
          newEntries.set(entry.name, previousEntry);
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
  for await (const previousEntry of previousEntries.values()) {
    if (!newEntries.has(previousEntry.file.name)) {
      // New entries doesn't have the previously selected file
      // Revoke objectURL
      if (previousEntry.objectUrl) {
        URL.revokeObjectURL(previousEntry.objectUrl);
      }
    }
  }
  reviewPhotoStore.setState({ photoEntries: newEntries });
};

export const createMetadata = async (entry: PhotoEntry) => {
  try {
    const blob = await entry.file.getFile();
    const rawMetadata = EXIF.readFromBinaryFile(await blob.arrayBuffer());
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
