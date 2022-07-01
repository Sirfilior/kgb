/*
  Warnings:

  - You are about to drop the column `userId` on the `Gottesdienst` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_GottesdienstToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GottesdienstToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Gottesdienst" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GottesdienstToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gottesdienst" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "entries" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "running" BOOLEAN NOT NULL,
    "assignees" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "special" TEXT NOT NULL,
    "comments" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "kirchgemeindeId" TEXT NOT NULL,
    CONSTRAINT "Gottesdienst_kirchgemeindeId_fkey" FOREIGN KEY ("kirchgemeindeId") REFERENCES "Kirchgemeinde" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Gottesdienst" ("assignees", "book", "comments", "createdAt", "date", "entries", "id", "kirchgemeindeId", "liked", "likes", "music", "place", "running", "special", "time", "title", "type", "updatedAt") SELECT "assignees", "book", "comments", "createdAt", "date", "entries", "id", "kirchgemeindeId", "liked", "likes", "music", "place", "running", "special", "time", "title", "type", "updatedAt" FROM "Gottesdienst";
DROP TABLE "Gottesdienst";
ALTER TABLE "new_Gottesdienst" RENAME TO "Gottesdienst";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_GottesdienstToUser_AB_unique" ON "_GottesdienstToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GottesdienstToUser_B_index" ON "_GottesdienstToUser"("B");
