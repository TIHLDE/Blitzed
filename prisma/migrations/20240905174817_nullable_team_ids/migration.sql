-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "BeerPongMatch" DROP CONSTRAINT "BeerPongMatch_team2Id_fkey";

-- AlterTable
ALTER TABLE "BeerPongMatch" ALTER COLUMN "team1Id" DROP NOT NULL,
ALTER COLUMN "team2Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "BeerPongTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "BeerPongTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
