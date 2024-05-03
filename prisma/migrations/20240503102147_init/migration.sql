/*
  Warnings:

  - Added the required column `personnelId` to the `VoucherDispense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoucherDispense" ADD COLUMN     "personnelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
