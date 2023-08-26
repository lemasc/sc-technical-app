import { array, parse, string, tuple, ValiError } from "valibot";
import { developSettings } from "../schema";
import { reviewPhotoStore, setPhotoEntry } from "../store";
import { importSettings } from "./settings";
import { createSettings } from "./utils";

export const importSettingsFromFile = async () => {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      // @ts-ignore
      id: "importedSettings",
      types: [
        {
          description: "JSON Settings",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    });
    const data = await fileHandle.getFile();
    // A json is an entries of [string, PhotoEntry]
    const json = JSON.parse(await data.text());
    await importSettings(json);
  } catch (err) {
    console.error(err);
  }
};

export const importAnswersFromFile = async () => {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      // @ts-ignore
      id: "importedSettings",
      types: [
        {
          description: "JSON Settings",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    });
    const data = await fileHandle.getFile();
    // A json is an entries of [string, PhotoEntry]
    const json = JSON.parse(await data.text());
    const entries = parse(array(tuple([string(), developSettings])), json);
    reviewPhotoStore.setState({
      answerEntries: Object.fromEntries(entries as any),
    });
  } catch (err) {
    console.error(err);
    if (err instanceof ValiError) {
      console.error(err.issues);
    }
  }
};

export const exportSettingsToFile = async () => {
  const { photoEntries, selectedFolder, changesDate } =
    reviewPhotoStore.getState();
  const entries = Array.from(photoEntries.entries());
  const settings = createSettings(entries);
  console.log(settings);
  const link = document.createElement("a");
  const file = new Blob([JSON.stringify(settings)], {
    type: "application/json",
  });
  link.href = URL.createObjectURL(file);
  link.download = `DevelopSettings_${
    selectedFolder?.name
  }_${changesDate.toISOString()}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
};
