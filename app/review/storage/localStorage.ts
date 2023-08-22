import { ReviewPhotoStoreType } from "../store";
import { createSettings } from "./utils";

export const saveToLocalStorage = (state: ReviewPhotoStoreType) => {
  if (state.selectedFolder && state.photoEntries) {
    const key = `image-review-settings`;
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
