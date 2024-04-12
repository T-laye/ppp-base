/*
  Warnings:

  - Added the required column `productId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointOfConsumption" ADD COLUMN     "productId" TEXT NOT NULL;
