/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "profilePicture" BYTEA;

-- DropTable
DROP TABLE "Image";
