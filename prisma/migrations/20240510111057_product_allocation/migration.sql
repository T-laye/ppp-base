/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductAllocation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductAllocation" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE UNIQUE INDEX "ProductAllocation_productId_key" ON "ProductAllocation"("productId");
