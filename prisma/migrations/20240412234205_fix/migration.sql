/*
  Warnings:

  - You are about to drop the column `productId` on the `PointOfConsumption` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Management" DROP CONSTRAINT "Management_userId_fkey";

-- DropForeignKey
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_userId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Management" ADD CONSTRAINT "Management_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
