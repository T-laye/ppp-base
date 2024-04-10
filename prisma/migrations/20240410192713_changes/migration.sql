/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Management` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `managementId` on the `Management` table. All the data in the column will be lost.
  - You are about to drop the column `managementManagementId` on the `Performance` table. All the data in the column will be lost.
  - The primary key for the `Personnel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personnelId` on the `Personnel` table. All the data in the column will be lost.
  - The required column `id` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Management` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Personnel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_managementManagementId_fkey";

-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_personnelId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_managementId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personnelId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_customerId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" DROP CONSTRAINT "_CustomerToPointOfConsumption_A_fkey";

-- DropIndex
DROP INDEX "Customer_customerId_email_phoneNumber_idx";

-- DropIndex
DROP INDEX "Management_managementId_idx";

-- DropIndex
DROP INDEX "Personnel_personnelId_idx";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "customerId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Management" DROP CONSTRAINT "Management_pkey",
DROP COLUMN "managementId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Management_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "managementManagementId",
ADD COLUMN     "managementId" TEXT;

-- AlterTable
ALTER TABLE "Personnel" DROP CONSTRAINT "Personnel_pkey",
DROP COLUMN "personnelId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Personnel_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Customer_id_email_phoneNumber_idx" ON "Customer"("id", "email", "phoneNumber");

-- CreateIndex
CREATE INDEX "Management_id_idx" ON "Management"("id");

-- CreateIndex
CREATE INDEX "Personnel_id_idx" ON "Personnel"("id");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" ADD CONSTRAINT "_CustomerToPointOfConsumption_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
