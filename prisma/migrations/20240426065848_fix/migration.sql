/*
  Warnings:

  - Added the required column `adminId` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
