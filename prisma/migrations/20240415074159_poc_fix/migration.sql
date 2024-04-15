/*
  Warnings:

  - You are about to drop the column `adminId` on the `PointOfConsumption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_adminId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "adminId";
