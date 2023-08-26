import { ValiError, map, parse, string, tuple, Output } from "valibot";
import { PhotoEntry, developSettings } from "../schema";
import { reviewPhotoStore, setPhotoEntries } from "../store";

export const importSettings = async (settings: any) => {
  try {
    const entiresMap = parse(map(string(), developSettings), new Map(settings));
    // Imported settings will based on the current revision
    const { photoEntries } = reviewPhotoStore.getState();
    let photosUpdated = 0;
    const changes: PhotoEntry[] = [];
    for await (const [name, existing] of photoEntries) {
      const settings = entiresMap.get(name);
      if (settings && settings.review) {
        // Merge the review settings
        photosUpdated++;
        changes.push({
          ...existing,
          review: settings.review,
        });
      }
    }
    setPhotoEntries(changes);
    alert(`Imported ${photosUpdated} of ${photoEntries.size} photos.`);
  } catch (err) {
    console.error(err);
    if (err instanceof ValiError) {
      console.error(err.issues);
    }
  }
};
