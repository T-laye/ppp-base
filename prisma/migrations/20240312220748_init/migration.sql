/*
  Warnings:

  - You are about to drop the column `designation` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "designation";

-- AlterTable
ALTER TABLE "PointOfConsumption" ADD COLUMN     "adminAdminId" TEXT;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_adminAdminId_fkey" FOREIGN KEY ("adminAdminId") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;
