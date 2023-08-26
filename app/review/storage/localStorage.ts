import { ReviewPhotoStoreType } from "../store";
import { importSettings } from "./settings";
import { createSettings } from "./utils";

const key = `image-review-settings`;

export const saveToLocalStorage = (state: ReviewPhotoStoreType) => {
  if (state.selectedFolder && state.photoEntries) {
    const existingChanges = JSON.parse(localStorage.getItem(key) ?? "{}");
    const entries = Array.from(state.photoEntries.entries());
    const changes = {
      ...existingChanges,
      [state.selectedFolder.name]: {
        ...(existingChanges[state.selectedFolder.name] ?? {}),
        [state.changesDate.toLocaleString()]: createSettings(entries),
      },
    };
    console.log("✏️ Changes", changes);
    localStorage.setItem(key, JSON.stringify(changes));
  }
};

export const getRevisionFromLocalStorage = (state: ReviewPhotoStoreType) => {
  const existingChanges = JSON.parse(localStorage.getItem(key) ?? "{}");
  const folderName = state.selectedFolder?.name;
  const date = state.changesDate;
  const entry =
    folderName && existingChanges?.[folderName]?.[date.toLocaleString()];
  if (entry) {
    return entry;
  }
};
