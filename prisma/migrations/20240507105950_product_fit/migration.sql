/*
  Warnings:

  - You are about to drop the column `initalProductValue` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "initalProductValue",
ADD COLUMN     "initialProductValue" INTEGER;
