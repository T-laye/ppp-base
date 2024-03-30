/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `pocId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `adminAdminId` on the `PointOfConsumption` table. All the data in the column will be lost.
  - The required column `id` was added to the `Admin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `adminId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pocId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_adminAdminId_fkey";

-- DropForeignKey
ALTER TABLE "VoucherDispense" DROP CONSTRAINT "VoucherDispense_adminId_fkey";

-- DropIndex
DROP INDEX "Admin_adminId_idx";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "adminId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "pocId";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "adminAdminId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CustomerToPointOfConsumption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToPointOfConsumption_AB_unique" ON "_CustomerToPointOfConsumption"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToPointOfConsumption_B_index" ON "_CustomerToPointOfConsumption"("B");

-- CreateIndex
CREATE INDEX "Admin_id_idx" ON "Admin"("id");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" ADD CONSTRAINT "_CustomerToPointOfConsumption_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" ADD CONSTRAINT "_CustomerToPointOfConsumption_B_fkey" FOREIGN KEY ("B") REFERENCES "PointOfConsumption"("pocId") ON DELETE CASCADE ON UPDATE CASCADE;
