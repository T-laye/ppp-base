/*
  Warnings:

  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherAllocation` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" TEXT NOT NULL,
ADD COLUMN     "voucherAllocation" INTEGER NOT NULL;
