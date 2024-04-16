-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_pocId_fkey";

-- CreateTable
CREATE TABLE "_POCProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_POCProducts_AB_unique" ON "_POCProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_POCProducts_B_index" ON "_POCProducts"("B");

-- AddForeignKey
ALTER TABLE "_POCProducts" ADD CONSTRAINT "_POCProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "PointOfConsumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_POCProducts" ADD CONSTRAINT "_POCProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
