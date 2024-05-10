/*
  Warnings:

  - Made the column `productId` on table `ProductAllocation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_productId_fkey";

-- AlterTable
ALTER TABLE "ProductAllocation" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
