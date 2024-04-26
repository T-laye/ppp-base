-- DropIndex
DROP INDEX "Voucher_id_voucherCode_idx";

-- CreateIndex
CREATE INDEX "Voucher_id_voucherCode_is3FirstTime_is4FirstTime_idx" ON "Voucher"("id", "voucherCode", "is3FirstTime", "is4FirstTime");
