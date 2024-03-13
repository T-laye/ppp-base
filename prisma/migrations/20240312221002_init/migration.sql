/*
  Warnings:

  - You are about to drop the `Personel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_personelId_fkey";

-- DropForeignKey
ALTER TABLE "Personel" DROP CONSTRAINT "Personel_userId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personelId_fkey";

-- DropTable
DROP TABLE "Personel";

-- CreateTable
CREATE TABLE "Personnel" (
    "personelId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Personnel_pkey" PRIMARY KEY ("personelId")
);

-- CreateIndex
CREATE INDEX "Personnel_personelId_idx" ON "Personnel"("personelId");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personelId_fkey" FOREIGN KEY ("personelId") REFERENCES "Personnel"("personelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_personelId_fkey" FOREIGN KEY ("personelId") REFERENCES "Personnel"("personelId") ON DELETE RESTRICT ON UPDATE CASCADE;
