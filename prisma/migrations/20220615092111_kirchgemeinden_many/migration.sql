/*
  Warnings:

  - You are about to drop the column `userId` on the `Kirchgemeinde` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_KirchgemeindeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_KirchgemeindeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Kirchgemeinde" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KirchgemeindeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kirchgemeinde" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Kirchgemeinde" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Kirchgemeinde";
DROP TABLE "Kirchgemeinde";
ALTER TABLE "new_Kirchgemeinde" RENAME TO "Kirchgemeinde";
CREATE UNIQUE INDEX "Kirchgemeinde_name_key" ON "Kirchgemeinde"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_KirchgemeindeToUser_AB_unique" ON "_KirchgemeindeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KirchgemeindeToUser_B_index" ON "_KirchgemeindeToUser"("B");
