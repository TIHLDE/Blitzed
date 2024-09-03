-- CreateEnum
CREATE TYPE "BeerPongTournamentAccess" AS ENUM ('PUBLIC', 'PIN');

-- CreateEnum
CREATE TYPE "BeerPongTournamentStatus" AS ENUM ('CREATED', 'ACTIVE', 'FINISHED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "beerPongTeamId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerPongTournament" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "BeerPongTournamentStatus" NOT NULL DEFAULT 'CREATED',
    "access" "BeerPongTournamentAccess" NOT NULL,
    "pinCode" TEXT,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "BeerPongTournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerPongMatch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    "winnerTeamId" TEXT,
    "nextMatchId" TEXT,
    "beerPongMatchId" TEXT,

    CONSTRAINT "BeerPongMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerPongTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "BeerPongTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BeerPongTournament_pinCode_key" ON "BeerPongTournament"("pinCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_beerPongTeamId_fkey" FOREIGN KEY ("beerPongTeamId") REFERENCES "BeerPongTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongTournament" ADD CONSTRAINT "BeerPongTournament_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "BeerPongTournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "BeerPongTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "BeerPongTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "BeerPongTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongMatch" ADD CONSTRAINT "BeerPongMatch_beerPongMatchId_fkey" FOREIGN KEY ("beerPongMatchId") REFERENCES "BeerPongMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerPongTeam" ADD CONSTRAINT "BeerPongTeam_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "BeerPongTournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
