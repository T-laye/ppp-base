-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_allocationId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "allocationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
