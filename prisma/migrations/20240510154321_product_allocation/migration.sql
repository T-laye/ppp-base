/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `ProductAllocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pocId]` on the table `ProductAllocation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductAllocation_productId_pocId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "ProductAllocation_productId_key" ON "ProductAllocation"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAllocation_pocId_key" ON "ProductAllocation"("pocId");

-- CreateIndex
CREATE INDEX "ProductAllocation_productId_id_idx" ON "ProductAllocation"("productId", "id");
