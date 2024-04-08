-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_adminId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_managementId_fkey";

-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_personnelId_fkey";

-- AlterTable
ALTER TABLE "PointOfConsumption" ALTER COLUMN "managementId" DROP NOT NULL,
ALTER COLUMN "adminId" DROP NOT NULL,
ALTER COLUMN "personnelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("personnelId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_managementId_fkey" FOREIGN KEY ("managementId") REFERENCES "Management"("managementId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfConsumption" ADD CONSTRAINT "PointOfConsumption_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
