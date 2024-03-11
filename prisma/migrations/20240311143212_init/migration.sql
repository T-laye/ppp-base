-- DropIndex
DROP INDEX "User_email_id_idx";

-- CreateIndex
CREATE INDEX "User_email_id_phoneNumber_idx" ON "User"("email", "id", "phoneNumber");
