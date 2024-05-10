/*
  Warnings:

  - You are about to drop the column `allocationId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_allocationId_fkey";

-- DropIndex
DROP INDEX "Product_allocationId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "allocationId";

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
