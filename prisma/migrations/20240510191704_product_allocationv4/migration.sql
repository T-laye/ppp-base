/*
  Warnings:

  - You are about to drop the `_ProductToProductAllocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProductAllocation" DROP CONSTRAINT "_ProductToProductAllocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductAllocation" DROP CONSTRAINT "_ProductToProductAllocation_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allocationId" TEXT;

-- DropTable
DROP TABLE "_ProductToProductAllocation";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
