-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_customerId_key" ON "Image"("customerId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
