import { PhotoEntry } from "../schema";

export const createSettings = (entries: [string, PhotoEntry][]) => {
  const settings = entries
    .filter(([k, { review }]) => review != null)
    .map(([k, { review, metadata }]) => [k, { review, metadata }]);
  return settings;
};
