/*
  Warnings:

  - The primary key for the `PointOfConsumption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pocId` on the `PointOfConsumption` table. All the data in the column will be lost.
  - The required column `id` was added to the `PointOfConsumption` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `pocId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_adminId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_managementId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personnelId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_productId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" DROP CONSTRAINT "_CustomerToPointOfConsumption_B_fkey";

-- DropIndex
DROP INDEX "PointOfConsumption_pocId_name_idx";

-- AlterTable
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_pkey",
DROP COLUMN "pocId",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "managementId" DROP NOT NULL,
ALTER COLUMN "adminId" DROP NOT NULL,
ALTER COLUMN "personnelId" DROP NOT NULL,
ADD CONSTRAINT "PointOfConsumption_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "pocId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "PointOfConsumption_id_name_idx" ON "PointOfConsumption"("id", "name");

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("personnelId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("managementId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_pocId_fkey" FOREIGN KEY ("pocId") REFERENCES "PointOfConsumption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToPointOfConsumption" ADD CONSTRAINT "_CustomerToPointOfConsumption_B_fkey" FOREIGN KEY ("B") REFERENCES "PointOfConsumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
