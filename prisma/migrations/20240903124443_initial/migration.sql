-- DropForeignKey
ALTER TABLE "UserBeerPongTeam" DROP CONSTRAINT "UserBeerPongTeam_beerPongTeamId_fkey";

-- AddForeignKey
ALTER TABLE "UserBeerPongTeam" ADD CONSTRAINT "UserBeerPongTeam_beerPongTeamId_fkey" FOREIGN KEY ("beerPongTeamId") REFERENCES "BeerPongTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
