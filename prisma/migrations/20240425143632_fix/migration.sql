/*
  Warnings:

  - You are about to drop the column `thirdParty` on the `Voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "thirdParty",
ALTER COLUMN "collected" SET DEFAULT false;
