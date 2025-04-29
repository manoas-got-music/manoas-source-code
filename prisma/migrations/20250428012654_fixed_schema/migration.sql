/*
  Warnings:

  - You are about to drop the `_MusicianJams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MusicianJams" DROP CONSTRAINT "_MusicianJams_A_fkey";

-- DropForeignKey
ALTER TABLE "_MusicianJams" DROP CONSTRAINT "_MusicianJams_B_fkey";

-- DropTable
DROP TABLE "_MusicianJams";

-- CreateTable
CREATE TABLE "_JamSessionToMusician" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JamSessionToMusician_AB_unique" ON "_JamSessionToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_JamSessionToMusician_B_index" ON "_JamSessionToMusician"("B");

-- AddForeignKey
ALTER TABLE "_JamSessionToMusician" ADD CONSTRAINT "_JamSessionToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "JamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JamSessionToMusician" ADD CONSTRAINT "_JamSessionToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;
