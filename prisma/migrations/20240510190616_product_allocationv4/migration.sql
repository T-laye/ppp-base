/*
  Warnings:

  - You are about to drop the column `allocationId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_allocationId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "allocationId";

-- CreateTable
CREATE TABLE "_ProductToProductAllocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductAllocation_AB_unique" ON "_ProductToProductAllocation"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductAllocation_B_index" ON "_ProductToProductAllocation"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProductAllocation" ADD CONSTRAINT "_ProductToProductAllocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductAllocation" ADD CONSTRAINT "_ProductToProductAllocation_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductAllocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
