/*
  Warnings:

  - Added the required column `category` to the `PhotoSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takenAt` to the `PhotoSet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "photoSetId" TEXT NOT NULL,
    "dateTaken" DATETIME,
    "model" TEXT,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Photo_photoSetId_fkey" FOREIGN KEY ("photoSetId") REFERENCES "PhotoSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("createdAt", "dateTaken", "id", "model", "name", "photoSetId", "rejected", "updatedAt", "url") SELECT "createdAt", "dateTaken", "id", "model", "name", "photoSetId", "rejected", "updatedAt", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE TABLE "new_PhotoSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "takenAt" DATETIME NOT NULL
);
INSERT INTO "new_PhotoSet" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "PhotoSet";
DROP TABLE "PhotoSet";
ALTER TABLE "new_PhotoSet" RENAME TO "PhotoSet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
