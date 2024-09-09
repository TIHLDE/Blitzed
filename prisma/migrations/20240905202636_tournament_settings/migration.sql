/*
  Warnings:

  - You are about to drop the column `hasBronzeFinal` on the `BeerPongTournament` table. All the data in the column will be lost.
  - You are about to drop the column `maxParticipants` on the `BeerPongTournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BeerPongTournament" DROP COLUMN "hasBronzeFinal",
DROP COLUMN "maxParticipants",
ADD COLUMN     "maxTeamCount" INTEGER,
ADD COLUMN     "maxTeamSize" INTEGER;
