/*
  Warnings:

  - You are about to drop the column `contactAddress` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNUmber` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `thirdParty` on the `Voucher` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Admin_phoneNUmber_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "contactAddress",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "password",
DROP COLUMN "phoneNUmber";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserType" NOT NULL DEFAULT 'PERSONEL';

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
DROP COLUMN "thirdParty",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product" "ProductType" NOT NULL,
    "pocId" TEXT NOT NULL,
    "thirdParty" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("pocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
