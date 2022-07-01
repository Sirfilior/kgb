/*
  Warnings:

  - Added the required column `kirchgemeindeId` to the `Gottesdienst` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gottesdienst" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "assignees" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "music" TEXT NOT NULL,
    "special" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "kirchgemeindeId" TEXT NOT NULL,
    CONSTRAINT "Gottesdienst_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Gottesdienst_kirchgemeindeId_fkey" FOREIGN KEY ("kirchgemeindeId") REFERENCES "Kirchgemeinde" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Gottesdienst" ("assignees", "book", "createdAt", "date", "id", "music", "special", "time", "type", "updatedAt", "userId") SELECT "assignees", "book", "createdAt", "date", "id", "music", "special", "time", "type", "updatedAt", "userId" FROM "Gottesdienst";
DROP TABLE "Gottesdienst";
ALTER TABLE "new_Gottesdienst" RENAME TO "Gottesdienst";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
