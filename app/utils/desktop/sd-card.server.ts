import { list } from "drivelist";
import type { Dirent } from "fs";
import fs from "fs/promises";

export async function getDrives() {
  return (await list()).filter(
    (v) =>
      v.isRemovable &&
      v.enumerator !== "SCSI" &&
      v.partitionTableType &&
      v.mountpoints?.[0].path
  );
}

export type SDCardFile = {
  name: string;
  path: string;
  lastModifiedAt: Date;
  createdAt: Date;
};
const fileListsCache = new Map<string, Dirent[]>();

export async function getSDCardFiles(drive: string, folder: string) {
  const folderPath = `${drive}:\\DCIM\\${folder}`;
  if (fileListsCache.has(folderPath)) {
    return fileListsCache.get(folderPath);
  }
  const files = await fs
    .readdir(folderPath, {
      withFileTypes: true,
    })
    .then((v) => v.filter((v) => v.isFile()));
  fileListsCache.set(folderPath, files);
  return files;
}

export async function getSDCardFolders(drive: string) {
  const folder = `${drive}:\\DCIM`;
  return await fs
    .readdir(folder, {
      withFileTypes: true,
    })
    .then((v) =>
      v.filter((v) => v.isDirectory() && v.name.match(/([0-9]){3}/))
    );
}
