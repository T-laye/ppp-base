/*
  Warnings:

  - You are about to drop the `_POCProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PointOfConsumptionToProductAllocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductAllocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pocId,productId]` on the table `ProductAllocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pocId` to the `ProductAllocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_POCProducts" DROP CONSTRAINT "_POCProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_POCProducts" DROP CONSTRAINT "_POCProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "_PointOfConsumptionToProductAllocation" DROP CONSTRAINT "_PointOfConsumptionToProductAllocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_PointOfConsumptionToProductAllocation" DROP CONSTRAINT "_PointOfConsumptionToProductAllocation_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductAllocation" DROP CONSTRAINT "_ProductToProductAllocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductAllocation" DROP CONSTRAINT "_ProductToProductAllocation_B_fkey";

-- AlterTable
ALTER TABLE "ProductAllocation" ADD COLUMN     "pocId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_POCProducts";

-- DropTable
DROP TABLE "_PointOfConsumptionToProductAllocation";

-- DropTable
DROP TABLE "_ProductToProductAllocation";

-- CreateIndex
CREATE UNIQUE INDEX "ProductAllocation_pocId_productId_key" ON "ProductAllocation"("pocId", "productId");

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAllocation" ADD CONSTRAINT "ProductAllocation_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
