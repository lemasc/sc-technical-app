import { ValiError, map, parse, string } from "valibot";
import { PhotoEntry, developSettings } from "../schema";
import { reviewPhotoStore, setPhotoEntry } from "../store";

export const importSettings = async (settings: any) => {
  try {
    const entiresMap = parse(map(string(), developSettings), new Map(settings));
    // Imported settings will based on the current revision
    const { photoEntries } = reviewPhotoStore.getState();
    let photosUpdated = 0;
    for await (const [name, existing] of photoEntries) {
      const settings = entiresMap.get(name);
      if (settings && settings.review) {
        // Merge the review settings
        photosUpdated++;
        setPhotoEntry({
          ...existing,
          review: settings.review,
        });
      }
    }
    alert(`Imported ${photosUpdated} of ${photoEntries.size} photos.`);
  } catch (err) {
    console.error(err);
    if (err instanceof ValiError) {
      console.error(err.issues);
    }
  }
};
