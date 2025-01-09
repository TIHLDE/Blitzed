/*
  Warnings:

  - The `team1Id` column on the `BeerPongMatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `team2Id` column on the `BeerPongMatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `winnerTeamId` column on the `BeerPongMatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BeerPongTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BeerPongTeam` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserBeerPongTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `tournamentId` to the `UserBeerPongTeam` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `beerPongTeamId` on the `UserBeerPongTeam` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_team2Id_fkey";

-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_winnerTeamId_fkey";

-- DropForeignKey
ALTER TABLE "UserBeerPongTeam" DROP CONSTRAINT "UserBeerPongTeam_beerPongTeamId_fkey";

-- AlterTable
ALTER TABLE "BeerPongMatch" DROP COLUMN "team1Id",
ADD COLUMN     "team1Id" INTEGER,
DROP COLUMN "team2Id",
ADD COLUMN     "team2Id" INTEGER,
DROP COLUMN "winnerTeamId",
ADD COLUMN     "winnerTeamId" INTEGER;

-- AlterTable
ALTER TABLE "BeerPongTeam" DROP CONSTRAINT "BeerPongTeam_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BeerPongTeam_pkey" PRIMARY KEY ("id", "tournamentId");

-- AlterTable
ALTER TABLE "UserBeerPongTeam" DROP CONSTRAINT "UserBeerPongTeam_pkey",
ADD COLUMN     "tournamentId" TEXT NOT NULL,
DROP COLUMN "beerPongTeamId",
ADD COLUMN     "beerPongTeamId" INTEGER NOT NULL,
ADD CONSTRAINT "UserBeerPongTeam_pkey" PRIMARY KEY ("userId", "beerPongTeamId");

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team1Id_tournamentId_fkey" FOREIGN KEY ("team1Id", "tournamentId") REFERENCES "BeerPongTeam"("id", "tournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team2Id_tournamentId_fkey" FOREIGN KEY ("team2Id", "tournamentId") REFERENCES "BeerPongTeam"("id", "tournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_winnerTeamId_tournamentId_fkey" FOREIGN KEY ("winnerTeamId", "tournamentId") REFERENCES "BeerPongTeam"("id", "tournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBeerPongTeam" ADD CONSTRAINT "UserBeerPongTeam_beerPongTeamId_tournamentId_fkey" FOREIGN KEY ("beerPongTeamId", "tournamentId") REFERENCES "BeerPongTeam"("id", "tournamentId") ON DELETE CASCADE ON UPDATE CASCADE;
