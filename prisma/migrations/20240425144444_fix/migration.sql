/*
  Warnings:

  - The primary key for the `Voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `voucherId` on the `Voucher` table. All the data in the column will be lost.
  - The required column `id` was added to the `Voucher` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "VoucherDispense" DROP CONSTRAINT "VoucherDispense_voucherId_fkey";

-- DropIndex
DROP INDEX "Voucher_voucherId_idx";

-- AlterTable
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_pkey",
DROP COLUMN "voucherId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Voucher_id_idx" ON "Voucher"("id");

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
