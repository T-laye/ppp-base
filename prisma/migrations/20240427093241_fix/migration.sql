-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "image" BYTEA,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
