/*
  Warnings:

  - A unique constraint covering the columns `[personnelId]` on the table `PointOfConsumption` will be added. If there are existing duplicate values, this will fail.
  - Made the column `personnelId` on table `PointOfConsumption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personnelId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" ALTER COLUMN "personnelId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PointOfConsumption_personnelId_key" ON "PointOfConsumption"("personnelId");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
