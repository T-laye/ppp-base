/*
  Warnings:

  - You are about to drop the column `productType` on the `PointOfConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `Voucher` table. All the data in the column will be lost.
  - Added the required column `productId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "productType",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "product",
DROP COLUMN "productType",
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductType";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_productName_id_idx" ON "Product"("productName", "id");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
