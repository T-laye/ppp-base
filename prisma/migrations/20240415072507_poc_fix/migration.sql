-- DropForeignKey
ALTER TABLE "PointOfConsumption" DROP CONSTRAINT "PointOfConsumption_managementId_fkey";

-- CreateTable
CREATE TABLE "_ManagementToPointOfConsumption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ManagementToPointOfConsumption_AB_unique" ON "_ManagementToPointOfConsumption"("A", "B");

-- CreateIndex
CREATE INDEX "_ManagementToPointOfConsumption_B_index" ON "_ManagementToPointOfConsumption"("B");

-- AddForeignKey
ALTER TABLE "_ManagementToPointOfConsumption" ADD CONSTRAINT "_ManagementToPointOfConsumption_A_fkey" FOREIGN KEY ("A") REFERENCES "Management"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagementToPointOfConsumption" ADD CONSTRAINT "_ManagementToPointOfConsumption_B_fkey" FOREIGN KEY ("B") REFERENCES "PointOfConsumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
