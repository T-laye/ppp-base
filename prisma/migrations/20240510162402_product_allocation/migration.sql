/*
  Warnings:

  - A unique constraint covering the columns `[allocationId]` on the table `PointOfConsumption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[allocationId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pocId]` on the table `ProductAllocation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_pocId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_productId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" ADD COLUMN     "allocationId" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allocationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PointOfConsumption_allocationId_key" ON "PointOfConsumption"("allocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_allocationId_key" ON "Product"("allocationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAllocation_pocId_key" ON "ProductAllocation"("pocId");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
