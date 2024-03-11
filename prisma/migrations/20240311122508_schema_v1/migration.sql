/*
  Warnings:

  - The values [OPERATORS,STAFF] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `conatctPhone` on the `PointOfConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `PointOfConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `topUp` on the `PointOfConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `customerCustomerId` on the `VoucherDispense` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `VoucherDispense` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `VoucherDispense` table. All the data in the column will be lost.
  - You are about to drop the column `voucherVoucherId` on the `VoucherDispense` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Operators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffPerfomance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `managementId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personelId` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockAvailable` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockLimit` to the `PointOfConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdParty` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `VoucherDispense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherId` to the `VoucherDispense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('ADMIN', 'MANAGEMENT', 'CUSTOMER', 'PERSONEL', 'SUPER_ADMIN');
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pointOfConsumptionPocId_fkey";

-- DropForeignKey
ALTER TABLE "StaffPerfomance" DROP CONSTRAINT "StaffPerfomance_staffId_fkey";

-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_customerId_fkey";

-- DropForeignKey
ALTER TABLE "VoucherDispense" DROP CONSTRAINT "VoucherDispense_customerCustomerId_fkey";

-- DropForeignKey
ALTER TABLE "VoucherDispense" DROP CONSTRAINT "VoucherDispense_userId_fkey";

-- DropForeignKey
ALTER TABLE "VoucherDispense" DROP CONSTRAINT "VoucherDispense_voucherVoucherId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP COLUMN "conatctPhone",
DROP COLUMN "contactName",
DROP COLUMN "topUp",
ADD COLUMN     "managementId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "personelId" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "stockAvailable" INTEGER NOT NULL,
ADD COLUMN     "stockLimit" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "customerId",
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL,
ADD COLUMN     "thirdParty" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "VoucherDispense" DROP COLUMN "customerCustomerId",
DROP COLUMN "productType",
DROP COLUMN "userId",
DROP COLUMN "voucherVoucherId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "voucherId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Operators";

-- DropTable
DROP TABLE "Staff";

-- DropTable
DROP TABLE "StaffPerfomance";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personel" (
    "personelId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Personel_pkey" PRIMARY KEY ("personelId")
);

-- CreateTable
CREATE TABLE "Management" (
    "managementId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Management_pkey" PRIMARY KEY ("managementId")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "personelId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cusomtomersHandled" INTEGER NOT NULL,
    "productsDispensed" INTEGER NOT NULL,
    "managementManagementId" TEXT,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_id_idx" ON "User"("email", "id");

-- CreateIndex
CREATE INDEX "Personel_personelId_idx" ON "Personel"("personelId");

-- CreateIndex
CREATE INDEX "Management_managementId_idx" ON "Management"("managementId");

-- CreateIndex
CREATE INDEX "PointOfConsumption_pocId_name_idx" ON "PointOfConsumption"("pocId", "name");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personelId_fkey" FOREIGN KEY ("personelId") REFERENCES "Personel"("personelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("managementId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personel" ADD CONSTRAINT "Personel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Management" ADD CONSTRAINT "Management_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("voucherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("adminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_personelId_fkey" FOREIGN KEY ("personelId") REFERENCES "Personel"("personelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_managementManagementId_fkey" FOREIGN KEY ("managementManagementId") REFERENCES "Management"("managementId") ON DELETE SET NULL ON UPDATE CASCADE;
