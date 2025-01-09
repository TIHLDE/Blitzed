/*
  Warnings:

  - Added the required column `name` to the `BeerPongTournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BeerPongTournament" ADD COLUMN     "name" TEXT NOT NULL;
