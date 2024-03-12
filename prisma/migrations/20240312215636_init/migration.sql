/*
  Warnings:

  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Admin_adminId_idx" ON "Admin"("adminId");

-- CreateIndex
CREATE INDEX "Customer_customerId_email_phoneNumber_idx" ON "Customer"("customerId", "email", "phoneNumber");

-- CreateIndex
CREATE INDEX "Voucher_voucherId_idx" ON "Voucher"("voucherId");

-- CreateIndex
CREATE INDEX "VoucherDispense_Id_idx" ON "VoucherDispense"("Id");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
