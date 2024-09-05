/*
  Warnings:

  - The primary key for the `BeerPongMatch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `beerPongMatchId` on the `BeerPongMatch` table. All the data in the column will be lost.
  - The `nextMatchId` column on the `BeerPongMatch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `BeerPongMatch` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_beerPongMatchId_fkey";

-- AlterTable
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_pkey",
DROP COLUMN "beerPongMatchId",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
DROP COLUMN "nextMatchId",
ADD COLUMN     "nextMatchId" INTEGER,
ADD CONSTRAINT "BeerPongMatch_pkey" PRIMARY KEY ("id", "tournamentId");

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_id_tournamentId_fkey" FOREIGN KEY ("id", "tournamentId") REFERENCES "BeerPongMatch"("id", "tournamentId") ON DELETE RESTRICT ON UPDATE CASCADE;
