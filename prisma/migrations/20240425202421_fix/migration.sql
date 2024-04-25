/*
  Warnings:

  - You are about to drop the column `dispenseDate` on the `VoucherDispense` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle` on the `VoucherDispense` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pocId]` on the table `VoucherDispense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleType` to the `VoucherDispense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoucherDispense" DROP COLUMN "dispenseDate",
DROP COLUMN "vehicle",
ADD COLUMN     "pocId" TEXT,
ADD COLUMN     "thirdParty" BOOLEAN,
ADD COLUMN     "thirdPartyName" TEXT,
ADD COLUMN     "thirdPartyPhone" TEXT,
ADD COLUMN     "vehicleType" TEXT NOT NULL,
ALTER COLUMN "dateUsed" DROP DEFAULT,
ALTER COLUMN "dateUsed" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VoucherDispense_pocId_key" ON "VoucherDispense"("pocId");

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
