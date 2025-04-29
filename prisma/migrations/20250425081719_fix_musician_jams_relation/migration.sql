/*
  Warnings:

  - You are about to drop the `JamSessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JamSessions" DROP CONSTRAINT "JamSessions_musicianId_fkey";

-- DropTable
DROP TABLE "JamSessions";

-- CreateTable
CREATE TABLE "JamSession" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,

    CONSTRAINT "JamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MusicianJams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianJams_AB_unique" ON "_MusicianJams"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianJams_B_index" ON "_MusicianJams"("B");

-- AddForeignKey
ALTER TABLE "_MusicianJams" ADD CONSTRAINT "_MusicianJams_A_fkey" FOREIGN KEY ("A") REFERENCES "JamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianJams" ADD CONSTRAINT "_MusicianJams_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
