/*
  Warnings:

  - You are about to drop the column `personelId` on the `Performance` table. All the data in the column will be lost.
  - The primary key for the `Personnel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personelId` on the `Personnel` table. All the data in the column will be lost.
  - You are about to drop the column `personelId` on the `PointOfConsumption` table. All the data in the column will be lost.
  - Added the required column `personnelId` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - The required column `personnelId` was added to the `Personnel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `personnelId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_personelId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personelId_fkey";

-- DropIndex
DROP INDEX "Personnel_personelId_idx";

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "personelId",
ADD COLUMN     "personnelId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_pkey",
DROP COLUMN "personelId",
ADD COLUMN     "personnelId" TEXT NOT NULL,
ADD CONSTRAINT "Personnel_pkey" PRIMARY KEY ("personnelId");

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "personelId",
ADD COLUMN     "personnelId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Personnel_personnelId_idx" ON "Personnel"("personnelId");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("personnelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("personnelId") ON DELETE RESTRICT ON UPDATE CASCADE;
