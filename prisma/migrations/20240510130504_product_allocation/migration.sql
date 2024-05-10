-- DropForeignKey
ALTER TABLE "ProductAllocation" DROP CONSTRAINT "ProductAllocation_productId_fkey";

-- AlterTable
ALTER TABLE "ProductAllocation" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
