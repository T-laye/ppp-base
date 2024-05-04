/*
  Warnings:

  - You are about to drop the column `stockAvailable` on the `PointOfConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `stockLimit` on the `PointOfConsumption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "stockAvailable",
DROP COLUMN "stockLimit";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stockAvailable" INTEGER,
ADD COLUMN     "stockLimit" INTEGER;
