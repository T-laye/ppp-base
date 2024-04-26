-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "is3FirstTime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is4FirstTime" BOOLEAN NOT NULL DEFAULT true;
