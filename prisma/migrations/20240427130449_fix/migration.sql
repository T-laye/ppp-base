/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Customer_id_email_phoneNumber_idx";

-- DropTable
DROP TABLE "Image";

-- CreateIndex
CREATE INDEX "Customer_id_email_phoneNumber_verificationToken_idx" ON "Customer"("id", "email", "phoneNumber", "verificationToken");
