/*
  Warnings:

  - You are about to drop the column `beerPongTeamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_beerPongTeamId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "beerPongTeamId",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserBeerPongTeam" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "beerPongTeamId" TEXT NOT NULL,

    CONSTRAINT "UserBeerPongTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBeerPongTeam" ADD CONSTRAINT "UserBeerPongTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBeerPongTeam" ADD CONSTRAINT "UserBeerPongTeam_beerPongTeamId_fkey" FOREIGN KEY ("beerPongTeamId") REFERENCES "BeerPongTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
