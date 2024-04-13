/*
  Warnings:

  - A unique constraint covering the columns `[personnelId]` on the table `PointOfConsumption` will be added. If there are existing duplicate values, this will fail.
  - Made the column `personnelId` on table `PointOfConsumption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Management" DROP CONSTRAINT "Management_userId_fkey";

-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_userId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personnelId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" ALTER COLUMN "personnelId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PointOfConsumption_personnelId_key" ON "PointOfConsumption"("personnelId");

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Management" ADD CONSTRAINT "Management_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
