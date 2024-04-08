/*
  Warnings:

  - Added the required column `createdBy` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointOfConsumption" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
