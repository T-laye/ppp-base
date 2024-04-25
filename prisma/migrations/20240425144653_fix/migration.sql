/*
  Warnings:

  - A unique constraint covering the columns `[voucherId]` on the table `VoucherDispense` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VoucherDispense_voucherId_key" ON "VoucherDispense"("voucherId");
