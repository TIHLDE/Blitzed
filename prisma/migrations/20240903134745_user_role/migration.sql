/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'ANONYMOUS');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAnonymous",
ADD COLUMN     "role" "UserRole" NOT NULL;
