-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'OPERATORS', 'CUSTOMER', 'STAFF', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PETROL', 'DISEL');

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "contactAddress" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "thirdPartyPermission" "Permission" NOT NULL,
    "occupation" TEXT NOT NULL,
    "product" "ProductType" NOT NULL,
    "pointOfConsumptionPocId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "PointOfConsumption" (
    "pocId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "conatctPhone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "productType" "ProductType" NOT NULL,
    "topUp" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointOfConsumption_pkey" PRIMARY KEY ("pocId")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staffId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "contactAddress" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId")
);

-- CreateTable
CREATE TABLE "Operators" (
    "operatorId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNUmber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactAddress" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operators_pkey" PRIMARY KEY ("operatorId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNUmber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactAddress" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "voucherId" TEXT NOT NULL,
    "voucherCode" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collected" BOOLEAN NOT NULL,
    "productType" "ProductType" NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("voucherId")
);

-- CreateTable
CREATE TABLE "VoucherDispense" (
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "dispenseDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicle" TEXT NOT NULL,
    "vehicleNUmber" TEXT NOT NULL,
    "dateUsed" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voucherVoucherId" TEXT NOT NULL,
    "customerCustomerId" TEXT NOT NULL,
    "productType" "ProductType" NOT NULL,

    CONSTRAINT "VoucherDispense_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "StaffPerfomance" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cusomtomersHandled" INTEGER NOT NULL,
    "productsDispensed" INTEGER NOT NULL,

    CONSTRAINT "StaffPerfomance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operators_phoneNUmber_key" ON "Operators"("phoneNUmber");

-- CreateIndex
CREATE UNIQUE INDEX "Operators_email_key" ON "Operators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNUmber_key" ON "Admin"("phoneNUmber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_voucherCode_key" ON "Voucher"("voucherCode");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_pointOfConsumptionPocId_fkey" FOREIGN KEY ("pointOfConsumptionPocId") REFERENCES "PointOfConsumption"("pocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_voucherVoucherId_fkey" FOREIGN KEY ("voucherVoucherId") REFERENCES "Voucher"("voucherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Operators"("operatorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDispense" ADD CONSTRAINT "VoucherDispense_customerCustomerId_fkey" FOREIGN KEY ("customerCustomerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffPerfomance" ADD CONSTRAINT "StaffPerfomance_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;
