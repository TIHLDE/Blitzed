/*
  Warnings:

  - Added the required column `imageUrl` to the `QuestionGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionGame" ADD COLUMN     "imageUrl" TEXT NOT NULL;
