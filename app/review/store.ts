import { create } from "zustand";
type PhotoReview = {
  status: "approved" | "rejected" | "needs-editing";
  comment: string;
};
export type PhotoEntry = {
  file: FileSystemFileHandle;
  review: PhotoReview | null;
  objectUrl: string | null;
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

export const createObjectUrl = async (entry: PhotoEntry) => {
  const objectUrl = URL.createObjectURL(await entry.file.getFile());
  reviewPhotoStore.setState({
    photoEntries: new Map(reviewPhotoStore.getState().photoEntries).set(
      entry.file.name,
      { ...entry, objectUrl }
    ),
  });
  return objectUrl;
};

export const revokeObjectUrl = async (entry: PhotoEntry) => {
  if (!entry.objectUrl) return;
  URL.revokeObjectURL(entry.objectUrl);
  reviewPhotoStore.setState({
    photoEntries: new Map(reviewPhotoStore.getState().photoEntries).set(
      entry.file.name,
      { ...entry, objectUrl: null }
    ),
  });
};
