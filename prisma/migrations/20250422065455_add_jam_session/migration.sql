-- CreateTable
CREATE TABLE "JamSession" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "host" TEXT NOT NULL,

    CONSTRAINT "JamSession_pkey" PRIMARY KEY ("id")
);
