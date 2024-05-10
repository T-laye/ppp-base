/*
  Warnings:

  - A unique constraint covering the columns `[allocationId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_productId_fkey";

-- DropIndex
DROP INDEX "ProductAllocation_productId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allocationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_allocationId_key" ON "Product"("allocationId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
