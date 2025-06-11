/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `referrals` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "referrals_referred_by_key";

-- CreateIndex
CREATE UNIQUE INDEX "referrals_user_id_key" ON "referrals"("user_id");

-- CreateIndex
CREATE INDEX "referrals_referred_by_idx" ON "referrals"("referred_by");
