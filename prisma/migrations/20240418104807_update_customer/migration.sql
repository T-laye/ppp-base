-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "acceptTerms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "UserType" NOT NULL DEFAULT 'CUSTOMER';
