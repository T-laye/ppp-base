-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_pocId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "pocId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
