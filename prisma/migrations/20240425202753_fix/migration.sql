/*
  Warnings:

  - Added the required column `userId` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Voucher_id_idx";

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Voucher_id_voucherCode_idx" ON "Voucher"("id", "voucherCode");

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
