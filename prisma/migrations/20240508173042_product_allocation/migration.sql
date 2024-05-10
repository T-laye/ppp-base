/*
  Warnings:

  - You are about to drop the column `capacity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stockAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stockLimit` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "capacity",
DROP COLUMN "stockAvailable",
DROP COLUMN "stockLimit";

-- CreateTable
CREATE TABLE "ProductAllocation" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pocId" TEXT NOT NULL,
    "stockAvailable" INTEGER,
    "stockLimit" INTEGER,
    "capacity" INTEGER,

    CONSTRAINT "ProductAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductAllocation_productId_pocId_idx" ON "ProductAllocation"("productId", "pocId");

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
