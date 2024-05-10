/*
  Warnings:

  - A unique constraint covering the columns `[allocationId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `allocationId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_allocationId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "allocationId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_allocationId_key" ON "Product"("allocationId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "ProductAllocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
