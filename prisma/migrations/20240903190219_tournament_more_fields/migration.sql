/*
  Warnings:

  - Added the required column `hasBronzeFinal` to the `BeerPongTournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTihldeExclusive` to the `BeerPongTournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxParticipants` to the `BeerPongTournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `randomizeTeams` to the `BeerPongTournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BeerPongTournament" ADD COLUMN     "hasBronzeFinal" BOOLEAN NOT NULL,
ADD COLUMN     "isTihldeExclusive" BOOLEAN NOT NULL,
ADD COLUMN     "maxParticipants" INTEGER NOT NULL,
ADD COLUMN     "randomizeTeams" BOOLEAN NOT NULL;
