/*
  Warnings:

  - You are about to drop the column `allocationId` on the `PointOfConsumption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_allocationId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_productId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "allocationId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allocationId" TEXT;

-- CreateTable
CREATE TABLE "_PointOfConsumptionToProductAllocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PointOfConsumptionToProductAllocation_AB_unique" ON "_PointOfConsumptionToProductAllocation"("A", "B");

-- CreateIndex
CREATE INDEX "_PointOfConsumptionToProductAllocation_B_index" ON "_PointOfConsumptionToProductAllocation"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointOfConsumptionToProductAllocation" ADD CONSTRAINT "_PointOfConsumptionToProductAllocation_A_fkey" FOREIGN KEY ("A") REFERENCES "PointOfConsumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointOfConsumptionToProductAllocation" ADD CONSTRAINT "_PointOfConsumptionToProductAllocation_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductAllocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
