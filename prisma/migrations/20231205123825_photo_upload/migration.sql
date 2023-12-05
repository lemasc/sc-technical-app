-- CreateTable
CREATE TABLE "PhotoSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "photoSetId" TEXT NOT NULL,
    "dateTaken" DATETIME NOT NULL,
    "model" TEXT,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Photo_photoSetId_fkey" FOREIGN KEY ("photoSetId") REFERENCES "PhotoSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
