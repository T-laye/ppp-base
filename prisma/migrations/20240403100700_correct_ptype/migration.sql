/*
  Warnings:

  - Added the required column `createdById` to the `Personnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personnel" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
