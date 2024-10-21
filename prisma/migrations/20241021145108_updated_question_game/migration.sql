/*
  Warnings:

  - The primary key for the `QuestionGame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `QuestionGame` table. All the data in the column will be lost.
  - The `id` column on the `QuestionGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "QuestionGame" DROP CONSTRAINT "QuestionGame_userId_fkey";

-- AlterTable
ALTER TABLE "QuestionGame" DROP CONSTRAINT "QuestionGame_pkey",
DROP COLUMN "userId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "QuestionGame_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "questionGameId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionGameId_fkey" FOREIGN KEY ("questionGameId") REFERENCES "QuestionGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
