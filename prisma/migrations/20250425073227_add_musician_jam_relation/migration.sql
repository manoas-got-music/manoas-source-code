/*
  Warnings:

  - You are about to drop the `JamSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JamSession";

-- CreateTable
CREATE TABLE "Musician" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instrument" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JamSessions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "musicianId" INTEGER NOT NULL,

    CONSTRAINT "JamSessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JamSessions" ADD CONSTRAINT "JamSessions_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
