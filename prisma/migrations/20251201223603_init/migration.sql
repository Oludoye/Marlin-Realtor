/*
  Warnings:

  - The primary key for the `AgentProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AgentProfile` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `agentProfileId` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgentProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "picture" TEXT,
    "bio" TEXT,
    "phone" TEXT,
    "address" TEXT,
    CONSTRAINT "AgentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AgentProfile" ("address", "bio", "id", "phone", "picture", "userId") SELECT "address", "bio", "id", "phone", "picture", "userId" FROM "AgentProfile";
DROP TABLE "AgentProfile";
ALTER TABLE "new_AgentProfile" RENAME TO "AgentProfile";
CREATE UNIQUE INDEX "AgentProfile_userId_key" ON "AgentProfile"("userId");
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentProfileId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Listing_agentProfileId_fkey" FOREIGN KEY ("agentProfileId") REFERENCES "AgentProfile" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("agentProfileId", "createdAt", "description", "id", "price", "status", "title", "userId") SELECT "agentProfileId", "createdAt", "description", "id", "price", "status", "title", "userId" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEAM_MEMBER'
);
INSERT INTO "new_User" ("email", "id", "name", "password", "role") SELECT "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
