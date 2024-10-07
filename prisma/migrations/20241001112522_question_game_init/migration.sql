-- CreateTable
CREATE TABLE "QuestionGame" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QuestionGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionGame" ADD CONSTRAINT "QuestionGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
