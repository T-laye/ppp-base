/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_verificationToken_key" ON "Customer"("verificationToken");
