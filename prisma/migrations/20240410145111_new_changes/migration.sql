/*
  Warnings:

  - A unique constraint covering the columns `[productName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
