import { Photo } from "@prisma/client";
import { create } from "zustand";

export const MAX_UPLOAD_QUEUE = 5;

export type UploadQueueItem = {
  id: string;
  file: FileSystemFileHandle;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
  data?: Photo;
};

type UploadQueueStore = {
  setId: string;
  queue: UploadQueueItem[];
  add: (files: FileSystemFileHandle[]) => void;
  remove: (id: string) => void;
  update: (id: string, item: Partial<UploadQueueItem>) => void;
  get: (id: string) => UploadQueueItem | undefined;
};

export const useUploadQueue = create<UploadQueueStore>((set, get) => ({
  setId: "",
  queue: [],
  add: (files) => {
    set((state) => {
      const newItems = files.map((file) => ({
        id: file.name,
        file,
        status: "pending" as const,
        progress: -1,
      }));
      return {
        ...state,
        queue: [...state.queue, ...newItems],
      };
    });
  },
  remove: (id) => {
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    }));
  },
  update: (id, item) => {
    set((state) => ({
      queue: state.queue.map((queueItem) =>
        queueItem.id === id ? { ...queueItem, ...item } : queueItem
      ),
    }));
  },
  get: (id) => {
    return get().queue.find((item) => item.id === id);
  },
}));
