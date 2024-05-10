/*
  Warnings:

  - You are about to drop the column `allocationId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pocId` on the `ProductAllocation` table. All the data in the column will be lost.
  - Made the column `allocationId` on table `PointOfConsumption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_allocationId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_allocationId_fkey";

-- DropIndex
DROP INDEX "PointOfConsumption_allocationId_key";

-- DropIndex
DROP INDEX "Product_allocationId_key";

-- DropIndex
DROP INDEX "ProductAllocation_pocId_key";

-- DropIndex
DROP INDEX "ProductAllocation_productId_id_idx";

-- AlterTable
ALTER TABLE "PointOfConsumption" ALTER COLUMN "allocationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "allocationId";

-- AlterTable
ALTER TABLE "ProductAllocation" DROP COLUMN "pocId";

-- CreateIndex
CREATE INDEX "ProductAllocation_id_idx" ON "ProductAllocation"("id");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
