/*
  Warnings:

  - The primary key for the `UserBeerPongTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserBeerPongTeam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBeerPongTeam" DROP CONSTRAINT "UserBeerPongTeam_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserBeerPongTeam_pkey" PRIMARY KEY ("userId", "beerPongTeamId");
