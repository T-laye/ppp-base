/*
  Warnings:

  - You are about to drop the column `product` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `thirdParty` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `product` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdParty` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "product",
DROP COLUMN "thirdParty";

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "product" "ProductType" NOT NULL,
ADD COLUMN     "thirdParty" BOOLEAN NOT NULL;
