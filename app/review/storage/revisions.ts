import { reviewPhotoStore } from "../store";
import { getRevisionFromLocalStorage } from "./localStorage";
import { importSettings } from "./settings";

export const setRevision = () => {
  const revision = prompt("Enter revision to select.");
  if (!revision) return;
  // Check if the revision is a valid ISO date
  const revisionAsDate = new Date(revision);
  if (isNaN(revisionAsDate.valueOf())) return;
  const state = reviewPhotoStore.getState();
  const entries = getRevisionFromLocalStorage({
    ...state,
    changesDate: revisionAsDate,
  });
  console.log(entries);
  return importSettings(entries);
};
